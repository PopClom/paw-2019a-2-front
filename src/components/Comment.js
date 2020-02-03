import React from 'react';
import userImg from '../assets/img/user.png';
import {Link} from "react-router-dom";

const canEdit = false;

class Comment extends React.Component {
    render() {
        console.log(this.props.comment);
        const {user, date, message} = this.props.comment;

        return(
            <div className="card-body-comment">
                <div className="card-body-inside">
                    <Link className="bg-transparent" to={`/account/${user.id}`}>
                        <img className="user-image-commentary" alt="user" src={userImg}/>
                    </Link>
                    <div className="user-date-comment">
                        <Link className="bg-transparent" to="/user_recipes">
                            <h5 className="user-title-commentary">
                                {user}
                            </h5>
                        </Link>
                        <p className="card-comments-date">
                            {date.substring(0, 16).replace('T', ' ')}
                        </p>
                    </div>
                    {canEdit && <div className="float-right">
                        <button type="submit" className="bg-transparent text-center delete-btn">
                            {/*onClick={show_delete_comment(${comment.id})}>*/}
                            <i className="fas fa-trash fa-2x red-ic"/>
                        </button>
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