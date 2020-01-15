import React from 'react';
import axios from 'axios';
import {SERVER_ADDR} from "../constants";
import RecipeContent from "../components/RecipeContent";
import Spinner from "../components/Spinner";

class Recipe extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fetching: true,
            recipe: {}
        }
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        axios.get(`${SERVER_ADDR}/recipes/${id}`).then(response =>
            this.setState({recipe: response.data, fetching: false}));
    }

    render() {
        const {fetching, recipe} = this.state;

        return (
            <section className="main_container">
                <section className="browse">
                    {fetching ? <Spinner /> :
                    <RecipeContent recipe={recipe}/>}
                </section>
            </section>
        )
    }
}

export default Recipe;