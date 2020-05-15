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

class Users extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fetching: true,
            users: [],
            following: [],
            followers: [],
            filters: {
                search: "",
                order: "Asc",
                status: "REGULAR"
            }
        };
    }

    componentDidMount() {
        if (isLoggedIn()) {
            refresh().then(() => {
                this.setState({following: getUser().following.users, followers: getUser().followers.users}, this.handleApplyFilters);
            });
        } else {
            this.handleApplyFilters();
        }
    }

    handleApplyFilters = () => {
        this.setState({fetching: true}, () => {
            axios.post(`${SERVER_ADDR}/users/search`, this.state.filters).then(response =>
                this.setState({users: response.data.users, fetching: false}));
        });
    };

    handleUpdateFilters = (search, order, status) => {
        this.setState({filters: {search: search, order: order, status: status}});
    };

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
        const {fetching, users, following, followers, filters} = this.state;

        const followersFiltered = followers.filter(x => x.status === filters.status &&
            x.username.toUpperCase().indexOf(filters.search.toUpperCase()) !== -1).sort();
        const followingFiltered = following.filter(x => x.status === filters.status &&
            x.username.toUpperCase().indexOf(filters.search.toUpperCase()) !== -1).sort();

        if (filters.order === "Desc") {
            followersFiltered.reverse();
            followingFiltered.reverse();
        }

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
                                            <UserCards users={followersFiltered} following={following}
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
                                            <UserCards users={followingFiltered} following={following}
                                                       onFollow={this.handleFollow} onUnfollow={this.handleUnfollow}/>
                                        </div>)}
                            </Tab.Content>
                        </Tab>
                    </Tabs>
                </section>

                <UserFilters onUpdate={this.handleUpdateFilters} onApply={this.handleApplyFilters}/>
            </section>
        );
    }
}

export default Users;