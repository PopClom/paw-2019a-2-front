import React from 'react';
import {Link} from "react-router-dom";
import Comment from "../components/Comment"
import {withTranslation} from "react-i18next";

const canEdit = true;

class CommentSection extends React.Component {
    render() {
        const comments = this.props.comments;
        const {t} = this.props;

        return (
            <div className="card card-comments">
                <div className="card-body">
                    {canEdit ?
                        <div>
                            <label className="comment-add-label">
                                {t('comment.Add')}
                            </label>
                            <span className="float-right">{t('comment.Max')}</span>
                            <textarea className="comment-textarea" type="text" maxLength="500"/>
                            <errors className="form-text text-muted" element="small"/>
                            <button className="btn btn-green">{t('comment.Send')}</button>
                        </div> : <div>
                            <h4>{t('comment.login')}</h4>
                            <Link to="/logIn">
                                <button className="btn btn-green">{t('logIn')}</button>
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
}

const Extended = withTranslation()(CommentSection);
Extended.static = CommentSection.static;

export default Extended;