import React from 'react';
import axios from "axios";
import {withTranslation, Trans} from 'react-i18next';
import foodifyImage from '../assets/img/foodify.png';
import {Link} from "react-router-dom";
import {handleInputChange} from "../helpers";
import {isLoggedIn, login, logout} from "../helpers/auth";
import {SERVER_ADDR} from "../constants";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            loginError: false,
            loginErrorMessage: '',
            submitting: false
        };

        this.handleInputChange = handleInputChange.bind(this);
    }

    componentDidMount() {
        if (isLoggedIn())
            this.props.history.replace(`/`);
    }

    handleLoginSubmit = (event) => {
        event.preventDefault();
        this.setState({submitting: true});
        login(this.state.username, this.state.password).then(() => {
            if (this.props.location.from)
                this.props.history.push(`..` + this.props.location.from);
            else
                this.props.history.push(`/`);
        }).catch(err => {
            logout();
            const loginErrorMessage = err.response.data === "User is disabled" ? "signInDisabled" : "signInBadCredentials";
            this.setState({loginError: true, loginErrorMessage: loginErrorMessage, submitting: false});
        });
    };

    handleResendEmail = () => {
        axios.post(`${SERVER_ADDR}/registration/emails/${this.state.username}`).then(() =>
            this.setState({loginErrorMessage: "mail.Sent"}));
    };

    render() {
        const {loginError, loginErrorMessage, submitting} = this.state;
        const {t} = this.props;

        return (
            <div className="login">
                <div className="offset_login"/>
                <form encType="application/x-www-form-urlencoded"
                      className="centered_login text-center border border-light p-5 col-xl-4 col-lg-6 col-md-6 col-sm-8 col-xs-10 container"
                      onSubmit={this.handleLoginSubmit}>
                    <img className="logo" src={foodifyImage} alt="LOGO"/>

                    <input type="text" name="username" className="form-control mb-4"
                           placeholder={t('User.username')} onChange={this.handleInputChange}/>

                    <input type="password" name="password" className="form-control mb-4"
                           placeholder={t('User.password')} onChange={this.handleInputChange}/>

                    {loginError &&
                    <div className="form-text text-muted mb-4 error-text text-center" element="small"><Trans>{loginErrorMessage}</Trans>
                        <br/>
                        {loginErrorMessage === "signInDisabled" &&
                        <div>
                            <Trans i18nKey="didntReceiveEmail"/>
                            <button onClick={this.handleResendEmail} className="btn-link register-btn">
                                <Trans i18nKey="clickToResend"/>
                            </button>
                        </div>}
                    </div>}
                    <button className="btn btn-info btn-block my-4" type="submit" disabled={submitting}>
                        <Trans i18nKey="signIn"/>
                    </button>
                    <p className="font-weight-bold" style={{fontSize: "20px"}}>
                        <Link to={`/`} className="register-btn">
                            <Trans i18nKey="goToTheSite"/>
                        </Link>
                    </p>
                    <p>
                        <Trans i18nKey="notAmember"/>
                        <Link to={`/register`} className="register-btn">
                            <Trans i18nKey="register"/>
                        </Link>
                    </p>
                </form>
                <div className="offset_login"/>
            </div>
        );
    }
}

const Extended = withTranslation()(Login);
Extended.static = Login.static;

export default Extended;