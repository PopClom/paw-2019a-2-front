import React from 'react';
import userImg from '../assets/img/user.png';
import {Link} from "react-router-dom";
import {Trans} from "react-i18next";
import TooltipHover from "./TooltipHover";
import {isMyUser, userIsAdmin} from "../helpers";
import DeleteIcon from '@material-ui/icons/Delete';

class Comment extends React.Component {
    render() {
        const {username, userId, id, date, message} = this.props.comment;
        const canEdit = isMyUser(userId) || userIsAdmin();

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
                    {canEdit && <div className="float-right">
                        <TooltipHover placement="top" message={<Trans>comment.delete</Trans>} icon={
                            <button type="submit" className="bg-transparent" onClick={() => this.props.onDelete(id)}>
                                {/*onClick={show_delete_comment(${comment.id})}>*/}
                                <DeleteIcon className="delete-ingredient-icon"/>
                            </button>}
                        />
                    </div>}
                </div>
                <div className="card-comments-text">
                    <p className="card-text">
                        {message}
                    </p>
                </div>
            </div>);
    }
}
export default Comment;