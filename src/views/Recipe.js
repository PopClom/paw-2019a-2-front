import React from 'react';
import axios from 'axios';
import {SERVER_ADDR} from "../constants";
import RecipeContent from "../components/Recipe/RecipeContent";
import Spinner from "../components/General/Spinner";
import CommentSection from "../components/Recipe/CommentSection";
import {Trans} from "react-i18next";
import ConfirmationModal from "../components/Modal/ConfirmationModal";
import UserBar from "../components/User/UserBar";
import Error from "../components/General/Error";
import {isLoggedIn} from "../helpers/auth";

class Recipe extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fetching: true,
            error: false,
            showDeleteModal: false,
            recipe: {},
            user: {},
            userIngredients: {},
            missingIngredients: {}
        }
    }

    loadData() {
        const id = this.props.match.params.id;
        const calls = [axios.get(`${SERVER_ADDR}/recipes/${id}`)];
        if(isLoggedIn())
            calls.push(axios.get(`${SERVER_ADDR}/user/ingredients/`));

        axios.all(calls).then(responses => {
            this.setState({recipe: responses[0].data});
            console.log(responses)
            if(responses.length > 1) {
                const userIngredients = {};
                responses[1].data.ingredients.forEach(ingredient => userIngredients[ingredient.id] = ingredient);
                this.setState({
                    userIngredients: userIngredients,
                    missingIngredients: this.getMissingIngredients(this.state.recipe.ingredients, userIngredients),
                });
            }
            const userId = responses[0].data.userId;
            axios.get(`${SERVER_ADDR}/users/${userId}`).then(response =>
                this.setState({user: response.data, fetching: false})
            );
        }).catch((e)=> {
            console.log(e)
            this.setState({error: true, fetching: false})
        })
    }

    componentDidMount() {
        this.loadData();
    }

    handleCommentSubmit = (message) => {
        const {recipe} = this.state;
        return axios.post(`${SERVER_ADDR}/recipes/${recipe.id}/comments`, {message: message})
            .then((response) => {
                this.setState({recipe: {...recipe, comments: [...recipe.comments, response.data]}});
            });
    };

    handleCommentDelete = (commentId) => {
        const {recipe} = this.state;
        axios.delete(`${SERVER_ADDR}/recipes/${recipe.id}/comments/${commentId}`).then(() => {
            const comments = recipe.comments.filter(comment => comment.id !== commentId);
            this.setState({recipe: {...recipe, comments}});
        });
    };

    handleRating = (value) => {
        const {recipe} = this.state;
        axios.put(`${SERVER_ADDR}/recipes/${recipe.id}/rating`, {rating: value})
            .then((response) => {
                this.setState({recipe: {...recipe, yourRating: value, rating: response.data.rating}});
            });
    };

    handleRecipeDelete = () => {
        const {recipe} = this.state;
        axios.delete(`${SERVER_ADDR}/recipes/${recipe.id}/`)
            .then(() => {
                this.props.history.push(`/`);
            });
    };

    toggleDeleteModal = () => {
        this.setState({showDeleteModal: !this.state.showDeleteModal});
    };

    getMissingIngredients(ingredients, userIngredients) {
        const missingIngredients = {};
        ingredients.forEach(recipeIngredient => {
            if (userIngredients[recipeIngredient.id] === undefined)
                missingIngredients[recipeIngredient.id] = recipeIngredient;
            else if (userIngredients[recipeIngredient.id].amount < recipeIngredient.amount) {
                const ingredient = Object.assign({}, recipeIngredient);
                ingredient.amount -= userIngredients[recipeIngredient.id].amount;
                missingIngredients[ingredient.id] = ingredient;
            }
        });
        return missingIngredients;
    }

    render() {
        const {recipe, user, fetching, error} = this.state;
        let {missingIngredients} = this.state;

        return (
            <section className="main_container">
                {fetching ?
                    <section className="browse">
                        <Spinner/>
                    </section> : (error ?
                            <Error error="404"/> :
                            <section>
                                <section className="browse">
                                    <RecipeContent recipe={recipe}
                                                   onRate={this.handleRating}
                                                   toggleDeleteModal={this.toggleDeleteModal}
                                                   missingIngredients={missingIngredients}/>
                                    <CommentSection comments={recipe.comments}
                                                    recipeId={recipe.id}
                                                    onSubmit={this.handleCommentSubmit}
                                                    onDelete={this.handleCommentDelete}/>
                                </section>
                                <UserBar user={user}/>
                            </section>
                    )}
                <ConfirmationModal title={<Trans i18nKey="recipe.deleteWarning"/>}
                                   description={<Trans i18nKey="cantUndone"/>}
                                   variant="danger" showModal={this.state.showDeleteModal}
                                   toggleModal={this.toggleDeleteModal} onConfirmation={this.handleRecipeDelete}/>
            </section>
        )
    }
}

export default Recipe;