import React from 'react';
import {Card, CardDeck} from "react-bootstrap";
import {Trans} from "react-i18next";
import RecipeCard from "./RecipeCard";
import {Link} from "react-router-dom";
import {getUser} from "../helpers/auth";
import {followsUser, isMyUser} from "../helpers";
import UserImg from '../assets/img/user.png';

class UserBar extends React.Component {

    render() {
        const {user, accountPage} = this.props;

        return (
            <section className="side-card-container">
                <div className="card">
                    <div className="card-body card-body-user-bar" id="user-big-card">
                        <div id="user-card">
                            {user.status === "DELETED" ?
                                <p>
                                    <Trans i18nKey="userNotExist"/>
                                </p> :
                                <div>
                                    <a className="bg-transparent" href="#">
                                        <div>
                                            <span><img className="user_image" alt="userImage" src={UserImg}/></span>
                                            <span><h5 className="user-title">{user.username}</h5></span>
                                        </div>
                                    </a>
                                    <div className="user-card-info">

                                        <p className="card-text">
                                            <Trans i18nKey="Followers" values={{0: user.followers.users.length}}/>
                                        </p>

                                        <p className="card-text">
                                            <Trans i18nKey="Following" values={{0: user.following.users.length}}/>
                                        </p>

                                        <p className="card-text">
                                            <Trans i18nKey="Recipe.amount" values={{0: "TODO!!!"}}/>
                                        </p>

                                        <p className="card-text">
                                            <Trans i18nKey="AverageRate" values={{0: "TODO!!!"}}/>
                                        </p>

                                        {!isMyUser(user.id) ?
                                            getUser().following.users.includes(user.id) ?
                                                <button
                                                    className="btn-sm btn-outline-light-blue circle-button-user-bar">
                                                    <Trans i18nKey="unfollow"/>
                                                </button> :
                                                <button className="btn-sm btn-light-blue circle-button-user-bar">
                                                    <Trans i18nKey="follow"/>
                                                </button> : ''
                                        }

                                        {getUser().admin && accountPage && !isMyUser(user.id) ?
                                            <div>
                                                <button type="button"
                                                        className="btn-sm btn-danger form-user-bar circle-button-user-bar"
                                                        data-toggle="modal"
                                                        id="ban-user-modal"
                                                        data-target="#ban-user">
                                                    <Trans i18nKey="user.ban"/>
                                                </button>
                                                {user.admin ?
                                                    <button className="btn-sm btn-outline-warning circle-button-user-bar">
                                                        <Trans i18nKey="admin.Remove"/>
                                                    </button> :
                                                    <button className="btn-sm btn-warning circle-button-user-bar">
                                                        <Trans i18nKey="admin.Grant"/>
                                                    </button>
                                                }
                                            </div> : ''
                                        }

                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

UserBar.defaultProps = {
    accountPage: false,
};

export default UserBar;