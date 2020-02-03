import React from 'react';
import RecipesImg from '../assets/img/recipes.jpg';
import CooklistsImg from '../assets/img/cooklists.jpeg';
import IngredientsImg from '../assets/img/ingredients.jpg'
import RecentlyCookedImg from '../assets/img/recently_cooked.png'
import FavouritesRecipesImg from '../assets/img/favourites_recipes.jpg'
import StatisticsImg from '../assets/img/statistics.jpg'
import {Trans, withTranslation} from "react-i18next";
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
        const {t} = this.props;

        return (

            <section className="main_container">
                <h4 className="navigation-title pt-3">
                    {this.isMyAccount() ? <Trans>myAccount</Trans> : t('otherUserAccount', {0: 'Traducir'})}
                </h4>

                <section className="browse">
                    <div className="card-deck">

                        {/*Recipes*/}
                        <SimpleCard title={t('recipes')}
                                    description={this.isMyAccount() ? t('myRecipesExplanation') : t('recipesExplanation')}
                                    image={RecipesImg} link={"userRecipesUrl"}/>

                        {/*Cooklists*/}
                        <SimpleCard title={t('lists')}
                                    description={this.isMyAccount() ? t('myListsExplanation') : t('listsExplanation')}
                                    image={CooklistsImg} link={"/user_cooklists"}/>

                        {this.isMyAccount() ?
                            <SimpleCard title={t('myIngredients')} description={t('myIngredientsExplanation')}
                                        image={IngredientsImg} link={"/my_ingredients"}/> : ''}


                        <SimpleCard title={t('recentlyCooked')}
                                    description={this.isMyAccount() ? t('MyrecentlyCookedExplanation') : t('recentlyCookedExplanation', {0: 'user.username'})}
                                    image={RecentlyCookedImg} link={"/recently_cooked"}/>

                        <SimpleCard title={t('favouriteRecipes')}
                                    description={this.isMyAccount() ? t('myFavouriteRecipesExplanation') : t('FavouriteRecipesExplanation', {0: 'user.username'})}
                                    image={FavouritesRecipesImg} link={"/favourites_recipes"}/>

                        {this.isMyAccount() ?
                            <SimpleCard title={t('myStatistics')} description={t('myStatisticsExplanation')}
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


const Extended = withTranslation()(Account);
Extended.static = Account.static;

export default Extended;