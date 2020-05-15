import React from 'react';
import {
    Switch,
    Route
} from 'react-router-dom';
import Account from "./Account";
import Ingredients from "./Ingredients";
import UserRecipes from "./UserRecipes";
import Cooklists from "./Cooklists";
import FavouriteRecipes from "./FavouriteRecipes";
import Statistics from "./Statistics";
import Spinner from "../../components/General/Spinner";
import {isMyUser} from "../../helpers";
import {getUser, isLoggedIn} from "../../helpers/auth";
import axios from "axios";
import {SERVER_ADDR} from "../../constants";
import UserBar from "../../components/User/UserBar";
import Error from "../../components/General/Error";
import PrivateRoute from "../../components/PrivateRoute";

class UserView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fetchingUser: true,
            error: false,
            user: {}
        }
    }

    componentDidMount() {
        this.loadData(this.props);
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.match.params.userId !== prevProps.match.params.userId) {
            this.setState({fetchingUser: true}, () => {
                this.loadData(this.props);
            });
        }
    }

    loadData(props) {
        let userId = props.match.params.userId;
        if (props.location.user)
            this.setState({user: props.location.user, fetchingUser: false});
        else if (userId === 'me' || isMyUser(userId))
            this.setState({user: getUser(), fetchingUser: false});
        else
            axios.get(`${SERVER_ADDR}/users/${userId}`)
                .then(response => this.setState({user: response.data, fetchingUser: false}))
                .catch(() => this.setState({fetchingUser: false, error: true}));
    }

    handleBanUser = () => {
        const user = this.state.user;
        if (user.status === "REGULAR") {
            axios.post(`${SERVER_ADDR}/users/${user.id}/ban`).then(() => {
                this.setState({user: {...user, status: "DELETED"}});
            });
        } else {
            axios.post(`${SERVER_ADDR}/users/${user.id}/unban`).then(() => {
                this.setState({user: {...user, status: "REGULAR"}});
            });
        }
    };

    render() {
        const {fetchingUser, error, user} = this.state;
        const {userId} = this.props.match.params;
        const loggedIn = isLoggedIn();

        return (
            <section>
                <section className="main_container">
                    {fetchingUser ?
                        <section className="browse">
                            <Spinner/>
                        </section> : (error ?
                            <Error error="404"/> :
                            (userId === 'me' && !loggedIn ?
                                <PrivateRoute/> :
                                <section>
                                    <Switch>
                                        <Route exact path="/user/:userId/account"
                                               render={(props) => <Account {...props} user={user} />}/>
                                        <Route exact path="/user/:userId/recipes"
                                               render={(props) => <UserRecipes {...props} user={user} />}/>
                                        <Route exact path="/user/:userId/cooklists"
                                               render={(props) => <Cooklists {...props} user={user} />}/>
                                        <Route exact path="/user/me/ingredients"
                                               render={(props) => <Ingredients {...props} user={user} />}/>
                                        <Route exact path="/user/:userId/favourite_recipes"
                                               render={(props) => <FavouriteRecipes {...props} user={user} />}/>
                                        <Route exact path="/user/me/statistics"
                                               render={(props) => <Statistics {...props} user={user} />}/>

                                        <Route render={() =>
                                            <section className="browse">
                                                <Error error="404"/>
                                            </section>}/>
                                    </Switch>
                                    <UserBar accountPage user={user} onBan={this.handleBanUser}/>
                                </section>))}
                </section>
            </section>
        );
    }
}

export default UserView;