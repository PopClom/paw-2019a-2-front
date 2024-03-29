import React from 'react';
import {Card, CardDeck} from "react-bootstrap";
import {Trans} from "react-i18next";
import {Link} from "react-router-dom";
import UserImg from "../../assets/img/user.png"
import {isLoggedIn} from "../../helpers/auth";
import {isMyUser, isUserBanned} from "../../helpers";
import Spinner from "../General/Spinner";
import InfiniteScroll from "react-infinite-scroll-component";

class UserCards extends React.Component {

    render() {
        const {onFetch, hasMore, users, following, onFollow, onUnfollow} = this.props;
        const loggedIn = isLoggedIn();

        return (
            <div>
                {users.length === 0 ?
                    <h3 className="navigation-subtitle">
                        <Trans i18nKey="NoUsersMatchingFilter"/>
                    </h3> :
                    <InfiniteScroll
                        dataLength={users.length}
                        next={onFetch}
                        hasMore={hasMore}
                        loader={<Spinner/>}>
                        <CardDeck>
                            {users.map(user =>
                                <Card key={user.id} className="card-recipe">
                                    <Card.Body>
                                        <Link to={{pathname:`/user/${user.id}/account`, user:user}} className="custom-card">
                                    <span>
                                        <img className="user_image" src={UserImg} alt="userImage"/>
                                    </span>
                                            <span>
                                        <h5 className="user-title user-title-big">{user.username}</h5>
                                    </span>
                                        </Link>

                                        <div className="user-card-info">
                                            {isUserBanned(user) &&
                                            <div className="error-text">
                                                <p>
                                                    <i><Trans i18nKey="userNotExist"/></i>
                                                </p>
                                            </div>}

                                            <div className="card-text">
                                                <Trans i18nKey="Recipe.amount" values={{0: user.recipesAmount}}/>
                                            </div>

                                            <p className="card-text">
                                                <Trans i18nKey="AverageRate" values={{0: user.rating >= 0 ?
                                                        (user.rating - user.rating % 0.5).toFixed(1) + "★" : "-"}}/>
                                            </p>

                                            {loggedIn && !isMyUser(user.id) &&
                                            (following.some(x => x.id === user.id) ?
                                                <button className="btn-sm btn-outline-light-blue float-right circle-button-user-cards"
                                                        onClick={() => onUnfollow(user)}>
                                                    <Trans i18nKey="unfollow"/>
                                                </button> :
                                                <button className="btn-sm btn-light-blue float-right circle-button-user-cards"
                                                        onClick={() => onFollow(user)}>
                                                    <Trans i18nKey="follow"/>
                                                </button>)}
                                        </div>
                                    </Card.Body>
                                </Card>)}
                        </CardDeck>
                    </InfiniteScroll>}
            </div>
        );
    }
}

export default UserCards;