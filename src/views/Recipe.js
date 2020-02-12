import React from 'react';
import axios from 'axios';
import {SERVER_ADDR} from "../constants";
import RecipeContent from "../components/RecipeContent";
import Spinner from "../components/Spinner";
import CommentSection from "../components/CommentSection";
import UserBar from "../components/UserBar";

class Recipe extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fetching: true
        }
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        axios.get(`${SERVER_ADDR}/recipes/${id}`).then(response =>
            this.setState({...response.data}, () => {
                const userId = this.state.userId;
                axios.get(`${SERVER_ADDR}/users/${userId}`).then(response =>
                    this.setState({user: response.data, fetching: false}));
            }));
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
            .then(() => {
                this.setState({yourRating: value});
            });
    };

    render() {
        const recipe = this.state;

        return (
            <section className="main_container">
                {recipe.fetching ?
                    <section className="browse">
                        <Spinner/>
                    </section> :
                    <section>
                        <section className="browse">
                            <RecipeContent recipe={recipe}
                                           onRate={this.handleRating}/>
                            <CommentSection comments={recipe.comments}
                                            recipeId={recipe.id}
                                            onSubmit={this.handleCommentSubmit}
                                            onDelete={this.handleCommentDelete}/>
                        </section>
                        {this.state.user == null ? '' :
                        <UserBar user={this.state.user}/>}
                    </section>
                }
            </section>
        )
    }
}

export default Recipe;