import React from 'react';
import axios from 'axios';
import {SERVER_ADDR} from "../constants";
import RecipeContent from "../components/RecipeContent";
import Spinner from "../components/Spinner";
import CommentSection from "../components/CommentSection";

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
            this.setState({...response.data, fetching: false}));
    }

    handleCommentSubmit = (message) => {
        return axios.post(`${SERVER_ADDR}/recipes/${this.state.id}/comments`,{message: message})
            .then((response) => {
                this.setState({comments: [...this.state.comments, response.data]});
            });
    };

    render() {
        const recipe = this.state;

        return (
            <section className="main_container">
                {recipe.fetching ?
                    <section className="browse">
                        <Spinner />
                    </section> :
                    <section className="browse">
                        <RecipeContent recipe={recipe}/>
                        <CommentSection comments={recipe.comments} recipeId={recipe.id} onSubmit={this.handleCommentSubmit}/>
                    </section>}
            </section>
        )
    }
}

export default Recipe;