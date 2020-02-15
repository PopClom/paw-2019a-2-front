import React from 'react';
import axios from "axios";
import {SERVER_ADDR} from '../constants';
import RecipeCard from '../components/RecipeCard';
import Filters from '../components/Filters';
import Spinner from '../components/Spinner';
import {Link} from "react-router-dom";
import {Button, Card, Tab, Tabs} from "react-bootstrap";
import {Trans} from "react-i18next";
import {Doughnut, HorizontalBar} from "react-chartjs-2";
import UserCards from "../components/UserCards";
import UserFilters from "../components/UserFilters";
import {getUser} from "../helpers/auth";
import {onChange} from "../helpers";

class Users extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fetching: true,
            myUser: getUser(),
            users: [{id: 1, username: 'miguel'}, {id: 2, username: 'miguel'}, {
                id: 3,
                username: 'miguel'
            }]
        };
    }

    componentDidMount() {
    }

    render() {
        const {myUser} = this.state;

        return (
            <section className="main_container">
                <h4 className="navigation-title pt-3">
                    <Trans i18nKey="Users"/>
                </h4>

                <section className="browse">

                    <Tabs defaultActiveKey="All" id="uncontrolled-tab-example" className="tab-border">
                        <Tab eventKey="All" title={<Trans i18nKey="allUsers"/>}>
                            <Tab.Content>
                                <div className="tab-users-content">
                                    <UserCards users={this.state.users} myUser={myUser} onChange={onChange.bind(this)}/>
                                </div>
                            </Tab.Content>
                        </Tab>
                        <Tab eventKey="Followers" title={<Trans i18nKey="followers"/>}>
                            <Tab.Content>
                                <div className="tab-users-content">
                                    <UserCards users={myUser.followers.users} myUser={myUser} onChange={onChange.bind(this)}/>
                                </div>
                            </Tab.Content>
                        </Tab>
                        <Tab eventKey="Following" title={<Trans i18nKey="following"/>}>
                            <Tab.Content>
                                <div className="tab-users-content">
                                    <UserCards users={myUser.following.users} myUser={myUser} onChange={onChange.bind(this)}/>
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