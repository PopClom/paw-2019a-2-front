import React from 'react';
import axios from "axios";
import {SERVER_ADDR} from "../../constants";
import Spinner from "../../components/General/Spinner";
import RecipeCard from "../../components/Recipe/RecipeCard";
import {Link} from "react-router-dom";
import TooltipHover from "../../components/General/TooltipHover";
import {Trans} from "react-i18next";
import {Button} from "react-bootstrap";
import {isMyUser} from "../../helpers";

class UserRecipes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fetchingRecipes: true,
            recipes: []
        }
    }

    componentDidMount() {
        this.loadData(this.props);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.user.id !== prevProps.user.id) {
            this.setState({fetchingRecipes: true}, () => {
                this.loadData(this.props);
            });
        }
    }

    loadData(props) {
        axios.get(`${SERVER_ADDR}/recipes/user/${props.user.id}`).then(response =>
            this.setState({recipes: response.data.recipes, fetchingRecipes: false}));
    }

    render() {
        const {fetchingRecipes, recipes} = this.state;
        const {user} = this.props;

        return (
            <section>
                {isMyUser(user.id) ?
                    <h4 className="navigation-title pt-3"><Trans i18nKey="myRecipes"/></h4> :
                    <h4 className="navigation-title pt-3"><Trans i18nKey="recipe.title"
                                                                 values={{0: user.username}}/></h4>}

                {fetchingRecipes ?
                    <section className="browse">
                        <Spinner/>
                    </section> :
                    <section>
                        <section className="browse">
                            {recipes.length === 0 ?
                                (isMyUser(user.id) ?
                                    <h3 className="navigation-subtitle">
                                        <Trans i18nKey="emptyMyRecipes"/>
                                    </h3> :
                                    <h3 className="navigation-subtitle">
                                        <Trans i18nKey="emptyRecipes" values={{0: user.username}}/>
                                    </h3>) :
                                <div className="card-deck">
                                    {Object.keys(recipes).map(idx => <RecipeCard key={idx} recipe={recipes[idx]}/>)}
                                </div>}
                        </section>
                    </section>}

                {isMyUser(user.id) ?
                    <Link to={`/create_recipe`}>
                        <TooltipHover placement="top" message={<Trans>addNewRecipe</Trans>} icon={
                            <Button className="btn-green add">+</Button>
                        }/>
                    </Link> : ''}
            </section>
        );
    }
}

export default UserRecipes;