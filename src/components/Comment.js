import React from 'react';
import userImg from '../assets/img/user.png';
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import {Trans} from "react-i18next";
import TooltipHover from "./TooltipHover";
import {isMyUser} from "../helpers";

class Comment extends React.Component {
    render() {
        const {username, userId, id, date, message} = this.props.comment;
        const canEdit = isMyUser(userId);

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
                                <FontAwesomeIcon icon={faTrash} className="delete-btn red-ic" size="2x"/>
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