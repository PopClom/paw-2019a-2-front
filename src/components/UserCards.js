import React from 'react';
import {Card, CardDeck} from "react-bootstrap";
import {Trans} from "react-i18next";
import RecipeCard from "./RecipeCard";
import {Link} from "react-router-dom";
import UserImg from "../assets/img/user.png"
import {getUser} from "../helpers/auth";
import {followsUser, isMyUser} from "../helpers";

class UserCards extends React.Component {

    changeFollowState = (event, userId) => {
        event.preventDefault();
    };

    render() {
        const {users} = this.props;

        return (
            <div>
                {users.length === 0 ?
                    <h3 className="navigation-subtitle">
                        <Trans i18nKey="NoUsersMatchingFilter"/>
                    </h3> : ''}

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

                                        {!isMyUser(user.id) ?
                                            followsUser(user.id) ?
                                                <button className="btn-sm btn-outline-light-blue float-right circle-button-user-cards" onClick={(event)=> this.changeFollowState(event, user.id)}>
                                                    <Trans i18nKey="unfollow"/>
                                                </button> :
                                                <button className="btn-sm btn-light-blue float-right circle-button-user-cards" onClick={(event)=> this.changeFollowState(event, user.id)}>
                                                    <Trans i18nKey="follow"/>
                                                </button> : ''
                                        }

                                    </div>
                                </Card.Body>
                            </Link>
                        </Card>)}

                </CardDeck>
            </div>
        );
    }
}

export default UserCards;