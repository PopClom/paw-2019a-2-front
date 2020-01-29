import React from 'react';
import { withTranslation, Trans } from 'react-i18next';
import foodifyImage from '../assets/img/foodify.png';
import {Link} from "react-router-dom";


class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
    }

    componentDidMount() {
    }

    onLoginPress(event) {

    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    render() {
        const {username, password} = this.state;
        const { t } = this.props;

        return (
            <div className="login">
                <div className="offset_login"></div>
                <form encType="application/x-www-form-urlencoded"
                      className="centered_login text-center border border-light p-5 col-xl-4 col-lg-6 col-md-6 col-sm-8 col-xs-10 container"
                        onSubmit={this.onLoginPress}>

                    <img className="logo" src={foodifyImage} alt="LOGO"/>

                    <input type="text" id="username" name="j_username" className="form-control mb-4"
                           placeholder={t('User.username')} value={username} onChange={this.handleChange}/>

                    <input type="password" id="password" name="j_password" className="form-control mb-4"
                           placeholder={t('User.password')} value={password} onChange={this.handleChange}/>

                    <div className="form-text text-muted mb-4">
                        <Trans i18nKey="confirmationError"/>
                    </div>

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
                    <Link to={`/`}>
                        <button className="btn btn-info btn-block my-4" type="submit">
                            <Trans i18nKey="signIn"/>
                        </button>
                    </Link>
                    <p>
                        <Trans i18nKey="notAmember"/>
                        <a href={'$'} className="register-btn">
                            <Trans i18nKey="register"/>
                        </a>
                    </p>
                </form>
                <div className="offset_login"></div>
            </div>
        );
    }
}

const Extended = withTranslation()(Login);
Extended.static = Login.static;

export default Extended;