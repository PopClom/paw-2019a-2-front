import React from 'react';
import {Card, CardDeck} from "react-bootstrap";
import {Trans} from "react-i18next";
import RecipeCard from "./RecipeCard";
import {Link} from "react-router-dom";
import UserImg from "../assets/img/user.png"
import {getUser} from "../helpers/auth";
import {isFollowingUser, isMyUser} from "../helpers";
import axios from "axios";
import {SERVER_ADDR} from "../constants";

class UserCards extends React.Component {

    followUser = (user) => {
        axios.post(`${SERVER_ADDR}/users/follow/${user.id}`).then(() => {
            let updateUser = this.props.myUser;
            updateUser.following.users.push(user);
            this.props.onChange({myUser: updateUser});
        });
    };

    unfollowUser = (user) => {
        axios.post(`${SERVER_ADDR}/users/unfollow/${user.id}`).then(() => {
            let updateUser = this.props.myUser;
            updateUser.following.users = updateUser.following.users.filter(userFollowing => userFollowing.id !== user.id);
            this.props.onChange({myUser: updateUser});
        });
    };

    render() {
        const {users, myUser} = this.props;

        return (
            <div>
                {users.length === 0 ?
                    <h3 className="navigation-subtitle">
                        <Trans i18nKey="NoUsersMatchingFilter"/>
                    </h3> :

                <CardDeck>

                    {users.map(user =>
                        <Card key={user.id} className="card-recipe">
                            <Link to={`/account/${user.id}`} className="custom-card">
                                <Card.Body>
                                    <span>
                                        <img className="user_image" src={UserImg} alt="userImage"/>
                                        </span>
                                    <span>
                                            <h5 className="user-title user-title-big">{user.username}</h5>
                                        </span>


                                    <div className="user-card-info">
                                        <p className="card-text">
                                            <Trans i18nKey="Recipe.amount" values={{0: "TODO"}}/>
                                        </p>

                                        <p className="card-text">
                                            <Trans code="AverageRate" values={{0: "TODO"}}/>
                                        </p>
                                    </div>
                                </Card.Body>
                            </Link>
                            <div>
                                {!isMyUser(user.id) ?
                                    isFollowingUser(myUser, user.id) ?
                                        <button
                                            className="btn-sm btn-outline-light-blue float-right circle-button-user-cards"
                                            onClick={() => this.unfollowUser(user)}>
                                            <Trans i18nKey="unfollow"/>
                                        </button> :
                                        <button className="btn-sm btn-light-blue float-right circle-button-user-cards"
                                                onClick={() => this.followUser(user)}>
                                            <Trans i18nKey="follow"/>
                                        </button> : ''
                                }
                            </div>
                        </Card>)}

                </CardDeck>}
            </div>
        );
    }
}

export default UserCards;