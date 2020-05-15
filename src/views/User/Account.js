import React from 'react';
import RecipesImg from '../../assets/img/recipes.jpg';
import CooklistsImg from '../../assets/img/cooklists.jpeg';
import IngredientsImg from '../../assets/img/ingredients.jpg'
import RecentlyCookedImg from '../../assets/img/recently_cooked.png'
import FavouritesRecipesImg from '../../assets/img/favourites_recipes.jpg'
import StatisticsImg from '../../assets/img/statistics.jpg'
import {Trans} from "react-i18next";
import SimpleCard from "../../components/General/SimpleCard";
import {isMyUser} from "../../helpers";

class Account extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fetching: true,
            error: false
        }
    }

    render() {
        const {user} = this.props;
        const myUser = isMyUser(user.id);

        return (
            <section>
                <h4 className="navigation-title pt-3">
                    {myUser ? <Trans>myAccount</Trans> :
                        <Trans i18nKey='otherUserAccount' values={{0: user.username}}/>}
                </h4>

                <section className="browse">
                    <div className="card-deck">

                        {/*Recipes*/}
                        <SimpleCard title={<Trans>recipes</Trans>}
                                    description={myUser ? <Trans>myRecipesExplanation</Trans> :
                                        <Trans i18nKey="recipesExplanation" values={{0: user.username}}/>}
                                    image={RecipesImg}
                                    link={`/user/${myUser ? 'me' : user.id}/recipes`}/>

                        {/*Cooklists*/}
                        <SimpleCard title={<Trans>lists</Trans>}
                                    description={myUser ? <Trans>myListsExplanation</Trans> :
                                        <Trans i18nKey="listsExplanation" values={{0: user.username}}/>}
                                    image={CooklistsImg}
                                    link={`/user/${myUser ? 'me' : user.id}/cooklists`}/>

                        {/*Ingredients*/}
                        {myUser &&
                            <SimpleCard title={<Trans>ingredients</Trans>}
                                        description={<Trans>myIngredientsExplanation</Trans>}
                                        image={IngredientsImg}
                                        link={`/user/me/ingredients`}/>}

                        {/*Recently cooked*/}
                        <SimpleCard title={<Trans>recentlyCooked</Trans>}
                                    description={myUser ?
                                        <Trans>MyrecentlyCookedExplanation</Trans> :
                                        <Trans i18nKey='recentlyCookedExplanation' values={{0: user.username}}/>}
                                    image={RecentlyCookedImg}
                                    link={`/user/${myUser ? 'me' : user.id}/recently_cooked`}/>

                        {/*Favourite recipes*/}
                        <SimpleCard title={<Trans>favouriteRecipes</Trans>}
                                    description={myUser ?
                                        <Trans>myFavouriteRecipesExplanation</Trans> :
                                        <Trans i18nKey='FavouriteRecipesExplanation'
                                               values={{0: user.username}}/>}
                                    image={FavouritesRecipesImg}
                                    link={`/user/${myUser ? 'me' : user.id}/favourite_recipes`}/>

                        {/*Statistics*/}
                        {myUser &&
                            <SimpleCard title={<Trans>myStatistics</Trans>}
                                        description={<Trans>myStatisticsExplanation</Trans>}
                                        image={StatisticsImg}
                                        link={`/user/me/statistics`}/>}

                    </div>
                </section>
            </section>
        );
    }
}

export default Account;