import React from 'react';
import {withTranslation, Trans} from 'react-i18next';
import foodifyImage from '../assets/img/foodify.png';
import {Link} from "react-router-dom";
import {handleInputChange} from "../helpers";

class Register extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            username: '',
            password: '',
            repeatPassword: '',
            formErrors: {firstName: '', lastName: '', email: '', username: '', password: '', repeatPassword: ''},
            formValid: false
        };

        this.handleInputChange = handleInputChange.bind(this);
    }

    componentDidMount() {
    }

    handleRegisterSubmit = (event) => {

    }

    validateField = (name, value) => {
        let fieldValidationErrors = this.state.formErrors;

        switch (name) {
            case 'firstName': {
                if (value.length < 2 || value.length > 100)
                    fieldValidationErrors.firstName = 'name.lengthError';
                else
                    fieldValidationErrors.firstName = '';
                break;
            }
            case 'lastName': {
                if (value.length < 2 || value.length > 100)
                    fieldValidationErrors.lastName = 'name.lengthError';
                else
                    fieldValidationErrors.lastName = '';
                break;
            }
            case 'email': {
                if (value.length < 6 || value.length > 100)
                    fieldValidationErrors.email = 'email.lengthError';

                // preguntar a la api si esta disponible
                else if(false)
                    fieldValidationErrors.email = 'email.notAvailable';

                else
                    fieldValidationErrors.email = '';
                break;
            }
            case 'username': {
                if (value.length < 1 || value.length > 40)
                    fieldValidationErrors.username = 'username.lengthError';

                // preguntar a la api si esta disponible
                else if(false)
                    fieldValidationErrors.username = 'username.notAvailable';

                else
                    fieldValidationErrors.username = '';
                break;
            }
            case 'password' : {
                let error = false;
                if (value.length < 6 || value.length > 100){
                    fieldValidationErrors.password = 'password.lengthError';
                    error = true;
                }
                if(value !== this.state.repeatPassword) {
                    fieldValidationErrors.repeatPassword = 'password.notMatch';
                    error = true;
                }
                else {
                    fieldValidationErrors.repeatPassword = '';
                }

                if(!error)
                    fieldValidationErrors.password = '';
                break;
            }
            case 'repeatPassword': {
                if (value !== this.state.password)
                    fieldValidationErrors.repeatPassword = 'password.notMatch';
                else
                    fieldValidationErrors.repeatPassword = '';
                break;
            }
            default:
                break;
        }

        this.setState({formErrors: fieldValidationErrors});

        let formValid = true;
        Object.values(fieldValidationErrors).forEach((item) => {
            console.log(item);
            if(item.length > 0)
                formValid = false;
        });

        console.log(formValid);
        this.setState({formValid: formValid});
    }

    render() {
        const {t} = this.props;

        return (

            <div className="register">
                <div className="offset_register"/>
                <form onSubmit={this.handleRegisterSubmit()} encType="multipart/form-data"
                      className="centered_register text-center border border-light p-5 col-xl-4 col-lg-6 col-md-6 col-sm-8 col-xs-10 container">
                    <img className="logo" src={foodifyImage} alt="LOGO"/>

                    {/*First name*/}
                    <input placeholder={t('User.name')}
                           onChange={e => this.handleInputChange(e, this.validateField)}
                           type="text" name="firstName"
                           className="form-control mb-4 register-login-input"/>
                    <errors className="form-text text-muted mb-4 error-text" element="small">
                        <Trans>{this.state.formErrors.firstName}</Trans></errors>


                    {/*Last name*/}
                    <input placeholder={t('User.surname')}
                           onChange={e => this.handleInputChange(e, this.validateField)}
                           type="text" name="lastName"
                           className="form-control mb-4 register-login-input"/>
                    <errors className="form-text text-muted mb-4 error-text" element="small">
                        <Trans>{this.state.formErrors.lastName}</Trans></errors>


                    {/*E-mail*/}
                    <input placeholder={t('User.email')}
                           onChange={e => this.handleInputChange(e, this.validateField)}
                           type="text" name="email"
                           className="form-control mb-4 register-login-input"/>
                    <errors className="form-text text-muted mb-4 error-text" element="small">
                        <Trans>{this.state.formErrors.email}</Trans></errors>


                    {/*username*/}
                    <input placeholder={t('User.username')}
                           onChange={e => this.handleInputChange(e, this.validateField)}
                           type="text" name="username"
                           className="form-control mb-4 register-login-input"/>
                    <errors className="form-text text-muted mb-4 error-text" element="small">
                        <Trans>{this.state.formErrors.username}</Trans></errors>


                    {/*Password*/}
                    <input placeholder={t('User.password')}
                           onChange={e => this.handleInputChange(e, this.validateField)}
                           type="password" name="password"
                           className="form-control mb-4 register-login-input"/>
                    <errors className="form-text text-muted mb-4 error-text" element="small">
                        <Trans>{this.state.formErrors.password}</Trans></errors>


                    {/*Repeat password*/}
                    <input placeholder={t('User.repeatPassword')}
                           onChange={e => this.handleInputChange(e, this.validateField)}
                           type="password" name="repeatPassword"
                           className="form-control mb-4 register-login-input"/>
                    <errors className="form-text text-muted mb-4 error-text" element="small">
                        <Trans>{this.state.formErrors.repeatPassword}</Trans></errors>


                    {/*Sign up button*/}
                    <button className="btn btn-info my-4 btn-block" type="submit" disabled={!this.state.formValid}>
                        <Trans i18nKey="Register.signUp"/>
                    </button>

                    <p>
                        <Trans i18nKey="alreadyMember"/>
                        <Link to={`/login`} className="register-btn">
                            <Trans i18nKey="logIn"/>
                        </Link>
                    </p>

                </form>
                <div className="offset_register"/>
            </div>
        );
    }
}

const Extended = withTranslation()(Register);
Extended.static = Register.static;

export default Extended;