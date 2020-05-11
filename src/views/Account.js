import React from 'react';
import RecipesImg from '../assets/img/recipes.jpg';
import CooklistsImg from '../assets/img/cooklists.jpeg';
import IngredientsImg from '../assets/img/ingredients.jpg'
import RecentlyCookedImg from '../assets/img/recently_cooked.png'
import FavouritesRecipesImg from '../assets/img/favourites_recipes.jpg'
import StatisticsImg from '../assets/img/statistics.jpg'
import {Trans} from "react-i18next";
import SimpleCard from "../components/General/SimpleCard";
import UserBar from "../components/User/UserBar";
import {getUser} from "../helpers/auth";
import axios from "axios";
import {SERVER_ADDR} from "../constants";
import Spinner from "../components/General/Spinner";
import {isMyUser} from "../helpers";
import Error from "../components/General/Error";

class Account extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fetching: true,
            error: false,
            user: {},
        }
    }

    componentDidMount() {
        this.loadData(this.props);
    };

    componentWillReceiveProps(nextProps) {
        this.setState({fetching: true}, () => {
            this.loadData(nextProps);
        });
    }

    loadData(props) {
        const userId = props.match.params.userId;
        if (props.location.user)
            this.setState({user: props.location.user, fetching: false});
        else if (userId === undefined || isMyUser(userId))
            this.setState({user: getUser(), fetching: false});
        else
            axios.get(`${SERVER_ADDR}/users/${userId}`)
                .then(response => this.setState({user: response.data, fetching: false}))
                .catch(() => this.setState({fetching: false, error: true}));
    }

    render() {
        const {fetching, user, error} = this.state;

        return (

            <section className="main_container">
                {fetching ?
                    <section className="browse">
                        <Spinner/>
                    </section> : (error ?
                        <Error error="404"/> :
                        <section>
                            <h4 className="navigation-title pt-3">
                                {isMyUser(user.id) ? <Trans>myAccount</Trans> :
                                    <Trans i18nKey='otherUserAccount' values={{0: user.username}}/>}
                            </h4>

                            <section className="browse">
                                <div className="card-deck">

                                    {/*Recipes*/}
                                    <SimpleCard title={<Trans>recipes</Trans>}
                                                description={isMyUser(user.id) ? <Trans>myRecipesExplanation</Trans> :
                                                    <Trans i18nKey="recipesExplanation" values={{0: user.username}}/>}
                                                image={RecipesImg} link={`/user/${user.id}/recipes`}/>

                                    {/*Cooklists*/}
                                    <SimpleCard title={<Trans>lists</Trans>}
                                                description={isMyUser(user.id) ? <Trans>myListsExplanation</Trans> :
                                                    <Trans i18nKey="listsExplanation" values={{0: user.username}}/>}
                                                image={CooklistsImg} link={`/cooklists/${user.id}`}/>

                                    {isMyUser(user.id) ?
                                        <SimpleCard title={<Trans>myIngredients</Trans>}
                                                    description={<Trans>myIngredientsExplanation</Trans>}
                                                    image={IngredientsImg} link={"/my_ingredients"}/> : ''}


                                    <SimpleCard title={<Trans>recentlyCooked</Trans>}
                                                description={isMyUser(user.id) ?
                                                    <Trans>MyrecentlyCookedExplanation</Trans> :
                                                    <Trans i18nKey='recentlyCookedExplanation' values={{0: user.username}}/>}
                                                image={RecentlyCookedImg} link={`/recently_cooked/${user.id}`}/>

                                    <SimpleCard title={<Trans>favouriteRecipes</Trans>}
                                                description={isMyUser(user.id) ?
                                                    <Trans>myFavouriteRecipesExplanation</Trans> :
                                                    <Trans i18nKey='FavouriteRecipesExplanation'
                                                           values={{0: user.username}}/>}
                                                image={FavouritesRecipesImg} link={`/favourites_recipes/${user.id}`}/>

                                    {isMyUser(user.id) ?
                                        <SimpleCard title={<Trans>myStatistics</Trans>}
                                                    description={<Trans>myStatisticsExplanation</Trans>}
                                                    image={StatisticsImg} link={"/statistics"}/> : ''}

                                </div>
                            </section>

                            <UserBar user={user} accountPage={true}/>
                        </section>
                    )
                }
            </section>
        );
    }
}

export default Account;