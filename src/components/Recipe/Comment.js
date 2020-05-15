import React from 'react';
import userImg from '../../assets/img/user.png';
import {Link} from "react-router-dom";
import {Trans} from "react-i18next";
import TooltipHover from "../General/TooltipHover";
import {isMyUser, isUserAdmin} from "../../helpers";
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from "@material-ui/core/IconButton";
import ConfirmationModal from "../Modal/ConfirmationModal";

class Comment extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            showDeleteModal: false,
        };
    };

    toggleDeleteModal = () => {
        this.setState({showDeleteModal: !this.state.showDeleteModal});
    };

    render() {
        const {username, userId, id, date, message} = this.props.comment;
        const canEdit = isMyUser(userId) || isUserAdmin();

        return(
            <div className="card-body-comment">
                <div className="card-body-inside">
                    <Link className="bg-transparent" to={`/account/${userId}`}>
                        <img className="user-image-commentary" alt="user" src={userImg}/>
                    </Link>
                    <div className="user-date-comment">
                        <Link className="bg-transparent" to="/user_recipes">
                            <h5 className="user-title-commentary">
                                {username}
                            </h5>
                        </Link>
                        <p className="card-comments-date">
                            {date.substring(0, 16).replace('T', ' ')}
                        </p>
                    </div>
                    {canEdit &&
                    <div className="float-right">
                        <TooltipHover placement="top" message={<Trans>comment.delete</Trans>} icon={
                            <IconButton className="myingredient-btn" onClick={this.toggleDeleteModal}>
                                <DeleteIcon className="delete-ingredient-icon"/>
                            </IconButton>}
                        />
                    </div>}
                </div>
                <div className="card-comments-text">
                    <p className="card-text">
                        {message}
                    </p>
                </div>
                <ConfirmationModal
                    title={<Trans i18nKey="comment.delete"/>}
                    description={<Trans>comment.deleteWarning</Trans>}
                    variant="danger" showModal={this.state.showDeleteModal}
                    toggleModal={this.toggleDeleteModal}
                    onConfirmation={() => this.props.onDelete(id)}/>
            </div>);
    }
}
export default Comment;