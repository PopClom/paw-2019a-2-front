import React from 'react';
import axios from "axios";
import {SERVER_ADDR} from '../constants';
import RecipeCard from '../components/RecipeCard';
import Filters from '../components/Filters';
import Spinner from '../components/Spinner';
import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fetching: true,
            recipes: {},
            filters: {}
        }
    }

    componentDidMount() {
        this.applyFilters();
    }

    applyFilters() {
        axios.post(`${SERVER_ADDR}/recipes/search`, this.state.filters).then(response =>
            this.setState({recipes: response.data.recipes, fetching: false}));
    };

    onSearch = (searchString, tags, order, ingredients, cookable) => {
        let searchTags = [];
        Object.keys(tags).forEach(tag => {
            if (tags[tag])
                searchTags.push(tag);
        });
        let ingredientsList = [];
        ingredients.forEach(ingredient => ingredientsList.push(ingredient.id));
        this.setState({filters: {search: searchString, tags: searchTags, order: order,
                cookable: cookable, ingredients: ingredientsList}, fetching: true}, this.applyFilters);
    };

    render() {
        const {fetching, recipes} = this.state;

        return (
            <section>
                <section className="main_container">
                    <section className="browse">
                        {fetching ? <Spinner/> :
                            <div className="card-deck">
                                {Object.keys(recipes).map(idx => <RecipeCard key={idx} recipe={recipes[idx]}/>)}
                            </div>}
                    </section>
                    <section className="side-card-container">
                        <div className="card">
                            <div className="card-body" id="filters-big-card">
                                <Filters onSearch={this.onSearch}/>
                            </div>
                        </div>
                    </section>
                </section>
                <Link to={`/create_recipe`}>
                    <Button className="btn-green add">+</Button>
                </Link>
            </section>
        );
    }
}

export default Home;