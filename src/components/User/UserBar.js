import React from 'react';
import {Trans} from "react-i18next";
import {Link} from "react-router-dom";
import {getUser, isLoggedIn} from "../../helpers/auth";
import {followUser, unfollowUser, isMyUser, isUserAdmin, isUserBanned} from "../../helpers";
import UserImg from '../../assets/img/user.png';
import ConfirmationModal from "../Modal/ConfirmationModal";
import axios from "axios";
import {SERVER_ADDR} from "../../constants";

class UserBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showBanModal: false,
            showAdminModal: false,
            following: isLoggedIn() ? getUser().following.users : []
        }
    }

    toggleAdminModal = () => {
        this.setState({showAdminModal: !this.state.showAdminModal});
    };

    toggleBanModal = () => {
        this.setState({showBanModal: !this.state.showBanModal});
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

    changeAdminPermission = () => {
        this.props.user.admin = !this.props.user.admin;
    };

    render() {
        const {user, accountPage, onBan} = this.props;
        const {following} = this.state;

        return (
            <section className="side-card-container">
                <div className="card">
                    {user === undefined ? '' :
                        <div>
                            <div className="card-body card-body-user-bar" id="user-big-card">
                                <div id="user-card">
                                    {isUserBanned(user) && !isUserAdmin() ?
                                        <p>
                                            <Trans i18nKey="userNotExist"/>
                                        </p> :
                                        <div>
                                            <Link to={{pathname:`/user/${user.id}/account`, user:user}} className="custom-card">
                                                <div>
                                                    <span><img className="user_image" alt="userImage"
                                                               src={UserImg}/></span>
                                                    <span><h5 className="user-title">{user.username}</h5></span>
                                                </div>
                                            </Link>
                                            <div className="user-card-info">
                                                {isUserBanned(user) ?
                                                    <div className="error-text">
                                                        <p>
                                                            <i><Trans i18nKey="userNotExist"/></i>
                                                        </p>
                                                    </div> : ''}

                                                <div className="card-text">
                                                    <Trans i18nKey="Followers"
                                                           values={{0: user.followersAmount}}/>
                                                </div>

                                                <div className="card-text">
                                                    <Trans i18nKey="Following"
                                                           values={{0: user.followingAmount}}/>
                                                </div>

                                                <div className="card-text">
                                                    <Trans i18nKey="Recipe.amount" values={{0: user.recipesAmount}}/>
                                                </div>

                                                <p className="card-text">
                                                    <Trans i18nKey="AverageRate" values={{0: user.rating >= 0 ?
                                                            (user.rating - user.rating % 0.5).toFixed(1) + "★" : "-"}}/>
                                                </p>

                                                {isLoggedIn() && !isMyUser(user.id) ?
                                                    (following.some(x => x.id === user.id) ?
                                                        <button onClick={() => this.handleUnfollow(user)}
                                                            className="btn-sm btn-outline-light-blue form-user-bar circle-button-user-bar">
                                                            <Trans i18nKey="unfollow"/>
                                                        </button> :
                                                        <button onClick={() => this.handleFollow(user)}
                                                            className="btn-sm btn-light-blue form-user-bar circle-button-user-bar">
                                                            <Trans i18nKey="follow"/>
                                                        </button>) : ''}

                                                {isUserAdmin() && !isMyUser(user.id) && accountPage ?
                                                    <div>
                                                        {isUserBanned(user) ?
                                                            <button
                                                                className="btn-sm btn-outline-danger form-user-bar circle-button-user-bar"
                                                                onClick={this.toggleBanModal}>
                                                                <Trans i18nKey="user.unban"/>
                                                            </button> :
                                                            <button
                                                                className="btn-sm btn-danger form-user-bar circle-button-user-bar"
                                                                onClick={this.toggleBanModal}>
                                                                <Trans i18nKey="user.ban"/>
                                                            </button>
                                                        }
                                                        {user.admin ?
                                                            <button
                                                                className="btn-sm btn-outline-warning circle-button-user-bar"
                                                                onClick={this.toggleAdminModal}>
                                                                <Trans i18nKey="admin.Remove"/>
                                                            </button> :
                                                            <button
                                                                className="btn-sm btn-warning circle-button-user-bar"
                                                                onClick={this.toggleAdminModal}>
                                                                <Trans i18nKey="admin.Grant"/>
                                                            </button>}
                                                    </div> : ''}
                                            </div>
                                        </div>}
                                </div>
                            </div>

                            <ConfirmationModal
                                title={isUserBanned(user) ? <Trans i18nKey="user.unban"/> : <Trans i18nKey="user.ban"/>}
                                description={isUserBanned(user) ?
                                    <Trans i18nKey="user.unbanWarning" values={{0: user.username}}/> :
                                    <Trans i18nKey="user.banWarning" values={{0: user.username}}/>}
                                variant="danger" showModal={this.state.showBanModal}
                                toggleModal={this.toggleBanModal} onConfirmation={onBan}/>

                            <ConfirmationModal
                                title={user.admin ? <Trans i18nKey="admin.Remove"/> : <Trans i18nKey="admin.Grant"/>}
                                description={user.admin ?
                                    <Trans i18nKey="admin.RemoveWarning" values={{0: user.username}}/> :
                                    <Trans i18nKey="admin.GrantWarning" values={{0: user.username}}/>}
                                variant="danger" showModal={this.state.showAdminModal}
                                toggleModal={this.toggleAdminModal} onConfirmation={this.changeAdminPermission}/>
                        </div>
                    }
                </div>
            </section>
        );
    }
}

UserBar.defaultProps = {
    accountPage: false,
};

export default UserBar;