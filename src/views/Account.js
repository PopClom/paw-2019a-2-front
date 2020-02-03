import React from 'react';
import RecipesImg from '../assets/img/recipes.jpg';
import CooklistsImg from '../assets/img/cooklists.jpeg';
import IngredientsImg from '../assets/img/ingredients.jpg'
import RecentlyCookedImg from '../assets/img/recently_cooked.png'
import FavouritesRecipesImg from '../assets/img/favourites_recipes.jpg'
import StatisticsImg from '../assets/img/statistics.jpg'
import {Trans} from "react-i18next";
import SimpleCard from "../components/SimpleCard";

class Account extends React.Component {

    componentDidMount() {
        // axios.get(`${SERVER_ADDR}/recipes/${id}`).then(response =>
        //     this.setState({recipe: response.data, fetching: false}));
    };

    isMyAccount = () => {
        return true;
    };

    render() {

        return (

            <section className="main_container">
                <h4 className="navigation-title pt-3">
                    {this.isMyAccount() ? <Trans>myAccount</Trans> : <Trans i18nKey='otherUserAccount' values={{0: 'TODO'}}/>}
                </h4>

                <section className="browse">
                    <div className="card-deck">

                        {/*Recipes*/}
                        <SimpleCard title={<Trans>recipes</Trans>}
                                    description={this.isMyAccount() ? <Trans>myRecipesExplanation</Trans> : <Trans>recipesExplanation</Trans>}
                                    image={RecipesImg} link={"userRecipesUrl"}/>

                        {/*Cooklists*/}
                        <SimpleCard title={<Trans>lists</Trans>}
                                    description={this.isMyAccount() ? <Trans>myListsExplanation</Trans> : <Trans>listsExplanation</Trans>}
                                    image={CooklistsImg} link={"/user_cooklists"}/>

                        {this.isMyAccount() ?
                            <SimpleCard title={<Trans>myIngredients</Trans>} description={<Trans>myIngredientsExplanation</Trans>}
                                        image={IngredientsImg} link={"/my_ingredients"}/> : ''}


                        <SimpleCard title={<Trans>recentlyCooked</Trans>}
                                    description={this.isMyAccount() ? <Trans>MyrecentlyCookedExplanation</Trans> : <Trans i18nKey='recentlyCookedExplanation' values={{0: 'user.username'}}/>}
                                    image={RecentlyCookedImg} link={"/recently_cooked"}/>

                        <SimpleCard title={<Trans>favouriteRecipes</Trans>}
                                    description={this.isMyAccount() ? <Trans>myFavouriteRecipesExplanation</Trans> : <Trans i18nKey='FavouriteRecipesExplanation' values={{0: 'user.username'}}/>}
                                    image={FavouritesRecipesImg} link={"/favourites_recipes"}/>

                        {this.isMyAccount() ?
                            <SimpleCard title={<Trans>myStatistics</Trans>} description={<Trans>myStatisticsExplanation</Trans>}
                                        image={StatisticsImg} link={"/statistics"}/> : ''}

                    </div>
                </section>

                {/*<section className="side-card-container">
                    <div className="card">
                        <div className="card-body card-body-user-bar" id="user-big-card">
                            <c:set var="accountPage" value="${true}"/>
                            <%@include file="userbar.jsp" %>
                        </div>
                    </div>
                </section>*/}
            </section>
        );
    }
}

export default Account;