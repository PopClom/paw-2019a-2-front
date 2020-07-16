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
        axios.get(`${SERVER_ADDR}/recipes/${id}`).then(response =>
            this.setState({recipe: response.data}))
            .then(() => {
                const userId = this.state.recipe.userId;
                axios.get(`${SERVER_ADDR}/users/${userId}`).then(response => this.setState({
                    user: response.data
                })).then(() => {
                    axios.get(`${SERVER_ADDR}/user/ingredients/`).then(response => {
                        const userIngredients = {};
                        response.data.ingredients.forEach(ingredient => userIngredients[ingredient.id] = ingredient);
                        this.setState({
                            userIngredients: userIngredients,
                            missingIngredients: this.getMissingIngredients(this.state.recipe.ingredients, userIngredients),
                            fetching: false
                        })
                    })
                })
            }).catch(() => this.setState({fetching: false, error: true}));
    }

    componentDidMount() {
        this.loadData();
    }

    handleCommentSubmit = (message) => {
        return axios.post(`${SERVER_ADDR}/recipes/${this.state.id}/comments`, {message: message})
            .then((response) => {
                this.setState({comments: [...this.state.comments, response.data]});
            });
    };

    handleCommentDelete = (commentId) => {
        axios.delete(`${SERVER_ADDR}/recipes/${this.state.id}/comments/${commentId}`).then(() => {
            const comments = this.state.comments.filter(comment => comment.id !== commentId);
            this.setState({comments: comments});
        });
    };

    handleRating = (value) => {
        axios.post(`${SERVER_ADDR}/recipes/${this.state.id}/rating`, {rating: value})
            .then((response) => {
                this.setState({yourRating: value, rating: response.data.rating});
            });
    };

    handleRecipeDelete = () => {
        axios.delete(`${SERVER_ADDR}/recipes/${this.state.id}/`)
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
        const {recipe, missingIngredients, user, fetching} = this.state;

        return (
            <section className="main_container">
                {fetching ?
                    <section className="browse">
                        <Spinner/>
                    </section> : (recipe.error ?
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