import React from 'react';
import {Link} from "react-router-dom";
import Comment from "../components/Comment"
import {Trans} from "react-i18next";
import {handleInputChange} from "../helpers";
import {isLoggedIn} from "../helpers/auth";

class CommentSection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: '',
            submitError: false
        };

        this.handleInputChange = handleInputChange.bind(this);
    }

    handleCommentSubmit = (message) => {
        const onSubmit = this.props.onSubmit;
        onSubmit(message).then(() => {
            this.setState({submitError: false, message: ''});
        }).catch(() => {
            this.setState({submitError: true});
        })
    };

    render() {
        const comments = this.props.comments;
        const message = this.state.message;
        const loggedIn = isLoggedIn();

        return (
            <div className="card card-comments">
                <div className="card-body">
                    {loggedIn ?
                        <div>
                            <label className="comment-add-label">
                                {<Trans>comment.Add</Trans>}
                            </label>
                            <span className="float-right">{<Trans>comment.Size</Trans>}</span>
                            <textarea className="comment-textarea" maxLength="500" value={message}
                                      name="message" onChange={this.handleInputChange}/>
                            {this.state.submitError &&
                            <p className="form-text text-muted mb-4 error-text" element="small"><Trans>comment.Size</Trans></p>}
                            <button className="btn btn-green" onClick={() => this.handleCommentSubmit(message)}>
                                {<Trans>comment.Send</Trans>}</button>
                        </div> : <div>
                            <h4>{<Trans>comment.login</Trans>}</h4>
                            <Link to="/logIn">
                                <button className="btn btn-green">{<Trans>logIn</Trans>}</button>
                            </Link>
                        </div>}
                    {comments.sort((comment1, comment2) => {
                        return comment2.date.localeCompare(comment1.date);
                    }).map(comment => <Comment key={comment.id} comment={comment} onDelete={this.props.onDelete}/>)}
                </div>
            </div>
        );
    }
}

CommentSection.defaultProps = {
    comments: []
};

export default CommentSection;