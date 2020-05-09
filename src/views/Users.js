import React from 'react';
import axios from "axios";
import {SERVER_ADDR} from '../constants';
import Spinner from '../components/Spinner';
import {Tab, Tabs} from "react-bootstrap";
import {Trans} from "react-i18next";
import {Doughnut, HorizontalBar} from "react-chartjs-2";
import UserCards from "../components/UserCards";
import UserFilters from "../components/UserFilters";
import {getUser, refresh} from "../helpers/auth";


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
        refresh().then(() => {
            this.setState({following: getUser().following.users, followers: getUser().followers.users}, () => {
                axios.post(`${SERVER_ADDR}/users/search`, {}).then(response =>
                    this.setState({users: response.data.users, fetching: false}));
            });
        });
    }

    handleFollow = (user) => {
        axios.post(`${SERVER_ADDR}/users/${user.id}/follow`)
            .then(() => {
                const following = this.state.following;
                this.setState({following: [...following, user]});
            });
    };

    handleUnfollow = (user) => {
        axios.post(`${SERVER_ADDR}/users/${user.id}/unfollow`)
            .then(() => {
                const following = this.state.following.filter(x => x.id !== user.id);
                this.setState({following: following});
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
                                <div className="tab-users-content">
                                    <UserCards users={followers} following={following}
                                               onFollow={this.handleFollow} onUnfollow={this.handleUnfollow}/>
                                </div>
                            </Tab.Content>
                        </Tab>
                        <Tab eventKey="Following" title={<Trans i18nKey="following"/>}>
                            <Tab.Content>
                                <div className="tab-users-content">
                                    <UserCards users={following} following={following}
                                               onFollow={this.handleFollow} onUnfollow={this.handleUnfollow}/>
                                </div>
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