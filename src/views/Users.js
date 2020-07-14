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

const PAGE_SIZE = 15;

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
            },
            page: 1,
            hasMore: true
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
            axios.get(`${SERVER_ADDR}/users`, {params: this.state.filters}).then(response =>
                this.setState({
                    users: response.data.users,
                    page: 2,
                    hasMore: response.data.users.length >= PAGE_SIZE,
                    fetching: false}));
        });
    };

    handleUpdateFilters = (search, order, status) => {
        this.setState({filters: {search: search, order: order, status: status}});
    };

    fetchMoreData = () => {
        const page = this.state.page;
        axios.get(`${SERVER_ADDR}/users`, {params: {...this.state.filters, page: page}}).then(response =>
            this.setState({
                users: this.state.users.concat(response.data.users),
                page: page + 1,
                hasMore: response.data.users.length >= PAGE_SIZE,
                fetching: false}));
    };

    handleFollow = (user) => {
        axios.put(`${SERVER_ADDR}/user/following/${user.id}`)
            .then(() => {
                followUser(user);
                this.setState({following: getUser().following.users});
            });
    };

    handleUnfollow = (user) => {
        axios.delete(`${SERVER_ADDR}/user/following/${user.id}`)
            .then(() => {
                unfollowUser(user);
                this.setState({following: getUser().following.users});
            });
    };

    render() {
        const {hasMore, fetching, users, following, followers, filters} = this.state;

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
                                        <UserCards onFetch={this.fetchMoreData} users={users} following={following}
                                                   hasMore={hasMore}
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
                                            <UserCards hasMore={false} users={followersFiltered} following={following}
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
                                            <UserCards hasMore={false} users={followingFiltered} following={following}
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