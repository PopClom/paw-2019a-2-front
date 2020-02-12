import React from 'react';
import axios from 'axios';
import {SERVER_ADDR} from "../constants";
import RecipeContent from "../components/RecipeContent";
import Spinner from "../components/Spinner";
import CommentSection from "../components/CommentSection";
import {Trans} from "react-i18next";
import ConfirmationModal from "../components/ConfirmationModal";
import UserBar from "../components/UserBar";
import {Link} from "react-router-dom";

class Recipe extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fetching: true,
            error: false,
            showDeleteModal: false,
            user: {}
        }
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        axios.get(`${SERVER_ADDR}/recipes/${id}`).then(response =>
            this.setState({...response.data}, () => {
                const userId = this.state.userId;
                axios.get(`${SERVER_ADDR}/users/${userId}`).then(response =>
                    this.setState({user: response.data, fetching: false}));
            })).catch(() => this.setState({fetching: false, error: true}));
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

    render() {
        const recipe = this.state;

        return (
            <section className="main_container">
                {recipe.fetching ?
                    <section className="browse">
                        <Spinner/>
                    </section> : (recipe.error ?
                            <section>
                                <section className="browse">
                                    <div>
                                        <h4>{<Trans>pageNotExists</Trans>}</h4>
                                    </div>
                                </section>
                            </section> :
                            <section>
                                <section className="browse">
                                    <RecipeContent recipe={recipe}
                                                   onRate={this.handleRating}
                                                   toggleDeleteModal={this.toggleDeleteModal}/>
                                    <CommentSection comments={recipe.comments}
                                                    recipeId={recipe.id}
                                                    onSubmit={this.handleCommentSubmit}
                                                    onDelete={this.handleCommentDelete}/>
                                </section>
                                <UserBar user={this.state.user}/>
                            </section>
                    )}
                <ConfirmationModal title={<Trans i18nKey="recipe.deleteWarning"/>}
                                   description={<Trans>cantUndone</Trans>}
                                   variant="danger" showModal={this.state.showDeleteModal}
                                   toggleModal={this.toggleDeleteModal} onConfirmation={this.handleRecipeDelete}/>
            </section>
        )
    }
}

export default Recipe;