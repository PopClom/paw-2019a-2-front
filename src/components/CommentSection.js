import React from 'react';
import {Link} from "react-router-dom";
import Comment from "../components/Comment"
import {Trans} from "react-i18next";
import {getUser} from "../helpers/auth";

const canEdit = true;

class CommentSection extends React.Component {
    render() {
        const comments = this.props.comments;

        return (
            <div className="card card-comments">
                <div className="card-body">
                    {canEdit ?
                        <div>
                            <label className="comment-add-label">
                                {<Trans>comment.Add</Trans>}
                            </label>
                            <span className="float-right">{<Trans>comment.Max</Trans>}</span>
                            <textarea className="comment-textarea" type="text" maxLength="500"/>
                            <errors className="form-text text-muted" element="small"/>
                            <button className="btn btn-green">
                                {<Trans>comment.Send</Trans>}</button>
                        </div> : <div>
                            <h4>{<Trans>comment.login</Trans>}</h4>
                            <Link to="/logIn">
                                <button className="btn btn-green">{<Trans>logIn</Trans>}</button>
                            </Link>
                        </div>}
                    {comments.map(comment => <Comment comment={comment} />)}
                </div>
            </div>
        );
    }
}

CommentSection.defaultProps = {
    comments: []
};

export default CommentSection;