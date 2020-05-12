import React from 'react';
import axios from "axios";
import {SERVER_ADDR} from '../constants';
import Spinner from '../components/General/Spinner';
import {Tab, Tabs} from "react-bootstrap";
import {Trans} from "react-i18next";
import UserCards from "../components/User/UserCards";
import UserFilters from "../components/User/UserFilters";
import {getUser, isLoggedIn, refresh} from "../helpers/auth";
import {followUser, unfollowUser} from "../helpers";
import {Link} from "react-router-dom";


class Users extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fetching: true,
            users: [],
            following: [],
            followers: []
        };
    }

    componentDidMount() {
        if (isLoggedIn()) {
            refresh().then(() => {
                this.setState({following: getUser().following.users, followers: getUser().followers.users}, () => {
                    axios.post(`${SERVER_ADDR}/users/search`, {}).then(response =>
                        this.setState({users: response.data.users, fetching: false}));
                });
            });
        } else {
            axios.post(`${SERVER_ADDR}/users/search`, {}).then(response =>
                this.setState({users: response.data.users, fetching: false}));
        }
    }

    handleFollow = (user) => {
        axios.post(`${SERVER_ADDR}/users/${user.id}/follow`)
            .then(() => {
                followUser(user);
                this.setState({following: getUser().following.users});
            });
    };

    handleUnfollow = (user) => {
        axios.post(`${SERVER_ADDR}/users/${user.id}/unfollow`)
            .then(() => {
                unfollowUser(user);
                this.setState({following: getUser().following.users});
            });
    };

    render() {
        const {fetching, users, following, followers} = this.state;

        return (
            <section className="main_container">
                <h4 className="navigation-title pt-3">
                    <Trans i18nKey="Users"/>
                </h4>

                <section className="browse">

                    <Tabs defaultActiveKey="All" id="uncontrolled-tab-example" className="tab-border">
                        <Tab eventKey="All" title={<Trans i18nKey="allUsers"/>}>
                            <Tab.Content>
                                {fetching ? <Spinner/> :
                                    <div className="tab-users-content">
                                        <UserCards users={users} following={following}
                                                   onFollow={this.handleFollow} onUnfollow={this.handleUnfollow}/>
                                    </div>}
                            </Tab.Content>
                        </Tab>
                        <Tab eventKey="Followers" title={<Trans i18nKey="followers"/>}>
                            <Tab.Content>
                                {fetching ? <Spinner/> :
                                    (!isLoggedIn() ?
                                        <h3 className="navigation-subtitle">
                                            <Trans i18nKey="followers.login"/>
                                        </h3> :
                                        <div className="tab-users-content">
                                            <UserCards users={followers} following={following}
                                                       onFollow={this.handleFollow} onUnfollow={this.handleUnfollow}/>
                                        </div>)}
                            </Tab.Content>
                        </Tab>
                        <Tab eventKey="Following" title={<Trans i18nKey="following"/>}>
                            <Tab.Content>
                                {fetching ? <Spinner/> :
                                    (!isLoggedIn() ?
                                        <h3 className="navigation-subtitle">
                                            <Trans i18nKey="following.login"/>
                                        </h3> :
                                        <div className="tab-users-content">
                                            <UserCards users={following} following={following}
                                                       onFollow={this.handleFollow} onUnfollow={this.handleUnfollow}/>
                                        </div>)}
                            </Tab.Content>
                        </Tab>
                    </Tabs>
                </section>

                <UserFilters/>
            </section>
        );
    }
}

export default Users;