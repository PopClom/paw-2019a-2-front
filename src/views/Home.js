import React from 'react';
import axios from "axios";
import {SERVER_ADDR} from '../constants';
import RecipeCard from '../components/Recipe/RecipeCard';
import RecipeFilters from '../components/Recipe/RecipeFilters';
import Spinner from '../components/General/Spinner';
import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";
import {Trans} from "react-i18next";
import TooltipHover from "../components/General/TooltipHover";
import InfiniteScroll from "react-infinite-scroll-component";

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fetching: true,
            recipes: [],
            filters: {}
        }
    }

    componentDidMount() {
        this.applyFilters();
    }

    applyFilters() {
        axios.get(`${SERVER_ADDR}/recipes`, {params: this.state.filters}).then(response =>
            this.setState({recipes: response.data.recipes, fetching: false}));
    };

    handleSearch = (searchString, tags, order, ingredients, cookable) => {
        let searchTags = [];
        Object.keys(tags).forEach(tag => {
            if (tags[tag])
                searchTags.push(tag);
        });
        let ingredientsList = [];
        if (ingredients)
            ingredients.forEach(ingredient => ingredientsList.push(ingredient.id));
        this.setState({filters: {search: searchString, tags: searchTags.join(" "), order: order,
                cookable: cookable, ingredients: ingredientsList.join(" ")}, fetching: true}, this.applyFilters);
    };

    fetchMoreData = () => {
        axios.get(`${SERVER_ADDR}/recipes`, {params: this.state.filters}).then(response =>
            this.setState({recipes: this.state.recipes.concat(response.data.recipes), fetching: false}));
    };

    render() {
        const {fetching, recipes} = this.state;

        return (
            <section>
                <section className="main_container">
                    <section className="browse">
                        {fetching ? <Spinner/> :
                            <InfiniteScroll
                                dataLength={recipes.length}
                                next={this.fetchMoreData}
                                hasMore={true}
                                loader={<Spinner/>}>
                                <div className="card-deck">
                                    {Object.keys(recipes).map(idx => <RecipeCard key={idx} recipe={recipes[idx]}/>)}
                                </div>
                            </InfiniteScroll>}
                    </section>
                    <RecipeFilters onSearch={this.handleSearch}/>
                </section>
                <Link to={`/create_recipe`}>
                    <TooltipHover placement="top" message={<Trans>addNewRecipe</Trans>} icon={
                        <Button className="btn-green add">＋</Button>
                    }/>
                </Link>
            </section>
        );
    }
}

export default Home;