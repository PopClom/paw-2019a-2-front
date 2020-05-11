import React from 'react';
import {
    Switch,
    Route
} from 'react-router-dom';
import Account from "./Account";
import Ingredients from "./Ingredients";
import UserRecipes from "../UserRecipes";
import Cooklists from "./Cooklists";
import Statistics from "./Statistics";
import Spinner from "../../components/General/Spinner";
import {isMyUser} from "../../helpers";
import {getUser} from "../../helpers/auth";
import axios from "axios";
import {SERVER_ADDR} from "../../constants";
import UserBar from "../../components/User/UserBar";
import Error from "../../components/General/Error";

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

    render() {
        const {fetchingUser, error, user} = this.state;

        return (
            <section>
                <section className="main_container">
                    {fetchingUser ?
                        <section className="browse">
                            <Spinner/>
                        </section> : (error ?
                            <Error error="404"/> :
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
                                <Route exact path="/user/me/statistics"
                                       render={(props) => <Statistics {...props} user={user} />}/>

                                <Route render={() =>
                                    <section className="browse">
                                        <Error error="404"/>
                                    </section>}/>
                            </Switch>
                            <UserBar user={user} accountPage={this.props.match.params.section === 'account'}/>
                        </section>)}
                </section>
            </section>
        );
    }
}

export default UserView;