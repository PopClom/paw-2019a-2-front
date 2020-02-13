import React from 'react';
import {Card, CardDeck} from "react-bootstrap";
import {Trans} from "react-i18next";
import RecipeCard from "./RecipeCard";
import {Link} from "react-router-dom";
import {getUser} from "../helpers/auth";
import {followsUser, isMyUser, userIsAdmin, isUserBanned} from "../helpers";
import UserImg from '../assets/img/user.png';
import ConfirmationModal from "./ConfirmationModal";

class UserBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showBanModal: false,
            showAdminModal: false
        }
    }

    toggleAdminModal = () => {
        this.setState({showAdminModal: !this.state.showAdminModal});
    };

    toggleBanModal = () => {
        this.setState({showBanModal: !this.state.showBanModal});
    };

    banUser = () => {
        if(isUserBanned(this.props.user))
            this.props.user.status = "REGULAR";
        else
            this.props.user.status = "DISABLED"
    };

    changeAdminPermission = () => {
        this.props.user.admin = !this.props.user.admin;
    };

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
                                                    className="btn-sm btn-outline-light-blue form-user-bar circle-button-user-bar">
                                                    <Trans i18nKey="unfollow"/>
                                                </button> :
                                                <button className="btn-sm btn-light-blue form-user-bar circle-button-user-bar">
                                                    <Trans i18nKey="follow"/>
                                                </button> : ''
                                        }

                                        {getUser().admin && accountPage && !isMyUser(user.id) ?
                                            <div>
                                                {isUserBanned(user) ?
                                                    <button className="btn-sm btn-outline-danger form-user-bar circle-button-user-bar"
                                                            onClick={this.toggleBanModal}>
                                                        <Trans i18nKey="user.unban"/>
                                                    </button>
                                                    :
                                                    <button className="btn-sm btn-danger form-user-bar circle-button-user-bar"
                                                            onClick={this.toggleBanModal}>
                                                        <Trans i18nKey="user.ban"/>
                                                    </button>
                                                }
                                                {user.admin ?
                                                    <button className="btn-sm btn-outline-warning circle-button-user-bar" onClick={this.toggleAdminModal}>
                                                        <Trans i18nKey="admin.Remove"/>
                                                    </button> :
                                                    <button className="btn-sm btn-warning circle-button-user-bar" onClick={this.toggleAdminModal}>
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

                <ConfirmationModal title={isUserBanned(user) ?  <Trans i18nKey="user.unban"/> : <Trans i18nKey="user.ban"/>}
                                   description={isUserBanned(user) ?  <Trans i18nKey="user.unbanWarning" values={{0: user.username}}/> : <Trans i18nKey="user.banWarning" values={{0: user.username}}/>}
                                   variant="danger" showModal={this.state.showBanModal}
                                   toggleModal={this.toggleBanModal} onConfirmation={this.banUser}/>

                <ConfirmationModal title={user.admin ? <Trans i18nKey="admin.Remove"/> : <Trans i18nKey="admin.Grant"/>}
                                   description={user.admin ?  <Trans i18nKey="admin.RemoveWarning" values={{0: user.username}}/> : <Trans i18nKey="admin.GrantWarning" values={{0: user.username}}/>}
                                   variant="danger" showModal={this.state.showAdminModal}
                                   toggleModal={this.toggleAdminModal} onConfirmation={this.changeAdminPermission}/>
            </section>
        );
    }
}

UserBar.defaultProps = {
    accountPage: false,
};

export default UserBar;