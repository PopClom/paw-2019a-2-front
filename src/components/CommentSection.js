import React from 'react';
import {Link} from "react-router-dom";
import Comment from "../components/Comment"
import {Trans} from "react-i18next";
import {handleInputChange} from "../helpers";
import {isLoggedIn, refresh} from "../helpers/auth";
import axios from "axios";
import {SERVER_ADDR} from "../constants";

class CommentSection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: ''
        };

        this.handleInputChange = handleInputChange.bind(this);
    }

    handleCommentSubmit = () => {
        axios.post(`${SERVER_ADDR}/recipes/${this.props.recipeId}/comments`,{message: this.state.message})
            .then(() => {
                console.log("Ok");
            }).catch(() => {
                console.log(":(");
        })
    };

    render() {
        const comments = this.props.comments;
        const loggedIn = isLoggedIn();

        return (
            <div className="card card-comments">
                <div className="card-body">
                    {loggedIn ?
                        <div>
                            <label className="comment-add-label">
                                {<Trans>comment.Add</Trans>}
                            </label>
                            <span className="float-right">{<Trans>comment.Max</Trans>}</span>
                            <textarea className="comment-textarea" type="text" maxLength="500"
                                      name="message" onChange={this.handleInputChange}/>
                            <errors className="form-text text-muted" element="small"/>
                            <button className="btn btn-green" onClick={this.handleCommentSubmit}>
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