import React from 'react';
import {withTranslation, Trans} from 'react-i18next';
import foodifyImage from '../assets/img/foodify.png';
import {Link} from "react-router-dom";
import {handleInputChange} from "../helpers";
import {login} from "../helpers/auth";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            loginError: false
        };

        this.handleInputChange = handleInputChange.bind(this);
    }

    handleLoginSubmit = (event) => {
        event.preventDefault();
        login(this.state.username, this.state.password).then(() => {
            this.props.history.push(`/`);
        }).catch(() => {
            /*validar si las credenciales son correctas, si no loginError = true*/
            this.setState({loginError: true});
        });
    };

    render() {
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

                    {this.state.loginError === true &&
                    <p className="form-text text-muted mb-4 error-text" element="small"><Trans>signInError</Trans></p>}

                    <div className="d-flex justify-content-around">
                        <div>
                            <div className="custom-control custom-checkbox">
                                <input name="j_rememberme" type="checkbox" className="custom-control-input"
                                       id="defaultLoginFormRemember"/>
                                <label className="custom-control-label" htmlFor="defaultLoginFormRemember">
                                    <Trans i18nKey="rememberMe"/>
                                </label>
                            </div>
                        </div>
                    </div>
                    <button className="btn btn-info btn-block my-4" type="submit">
                        <Trans i18nKey="signIn"/>
                    </button>
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