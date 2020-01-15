import React from 'react';
import axios from "axios";
import {SERVER_ADDR} from '../constants';
import RecipeCard from '../components/RecipeCard';
import Filters from '../components/Filters';
import Spinner from '../components/Spinner';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fetching: true,
            recipes: {}
        }
    }

    componentDidMount() {
        axios.get(`${SERVER_ADDR}/recipes/`).then(response =>
            this.setState({recipes: response.data.recipes, fetching: false}));
    }

    render() {
        const {fetching, recipes} = this.state;

        return (
            <section className="main_container">
                <section className="browse">
                    {fetching ? <Spinner /> :
                        <div className="card-deck">
                            {Object.keys(recipes).map(idx => <RecipeCard key={idx} recipe={recipes[idx]}/>)}
                        </div>}
                </section>
                <section className="side-card-container">
                    <div className="card">
                        <div className="card-body" id="filters-big-card">
                            <Filters />
                        </div>
                    </div>
                </section>
            </section>
        );
    }
}

export default Home;