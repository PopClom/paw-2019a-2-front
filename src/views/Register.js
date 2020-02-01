import React from 'react';
import {withTranslation, Trans} from 'react-i18next';
import foodifyImage from '../assets/img/foodify.png';
import {handleInputChange} from "../helpers";
import {validateRegisterFields} from "../helpers/validations";
import {Button, Form} from "react-bootstrap";
import {Formik} from "formik";

class Register extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};

        this.handleInputChange = handleInputChange.bind(this);
    }

    componentDidMount() {
    }

    handleRegisterSubmit = (event) => {

    }

    render() {
        const {t} = this.props;

        return (

            <div className="register">
                <div className="offset_register"/>
                <Formik
                    initialValues={{
                        firstName: '',
                        lastName: '',
                        email: '',
                        username: '',
                        password: '',
                        repeatPassword: ''
                    }}
                    validate={values => validateRegisterFields(values)}
                    onSubmit={(values, {setSubmitting}) => {
                        console.log(values.firstName);
                    }}>
                    {({values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting}) => (
                        <Form onSubmit={handleSubmit} encType="multipart/form-data"
                              className="centered_register text-center border border-light p-5 col-xl-4 col-lg-6 col-md-6 col-sm-8 col-xs-10 container">
                            <img className="logo" src={foodifyImage} alt="LOGO"/>

                            {/*First name*/}
                            <Form.Row >
                                <Form.Control placeholder={t('User.name')}
                                              type="text" name="firstName" maxLength="100"
                                              className="form-control mb-4 register-login-input"
                                              onChange={handleChange}
                                              onBlur={handleBlur}
                                              isValid={touched.firstName && !errors.firstName}
                                              isInvalid={touched.firstName && !!errors.firstName}
                                              value={values.firstName}/>
                                <Form.Control.Feedback type="invalid">
                                    <Trans>{errors.firstName}</Trans>
                                </Form.Control.Feedback>
                            </Form.Row>

                            {/*Last name*/}
                            <Form.Row >
                                <Form.Control placeholder={t('User.surname')}
                                              type="text" name="lastName" maxLength="100"
                                              className="form-control mb-4 register-login-input"
                                              onChange={handleChange}
                                              onBlur={handleBlur}
                                              isValid={touched.lastName && !errors.lastName}
                                              isInvalid={touched.lastName && !!errors.lastName}
                                              value={values.lastName}/>
                                <Form.Control.Feedback type="invalid">
                                    <Trans>{errors.lastName}</Trans>
                                </Form.Control.Feedback>
                            </Form.Row>

                            {/*E-mail*/}
                            <Form.Row >
                                <Form.Control placeholder={t('User.email')}
                                              type="text" name="email" maxLength="100"
                                              className="form-control mb-4 register-login-input"
                                              onChange={handleChange}
                                              onBlur={handleBlur}
                                              isValid={touched.email && !errors.email}
                                              isInvalid={touched.email && !!errors.email}
                                              value={values.email}/>
                                <Form.Control.Feedback type="invalid">
                                    <Trans>{errors.email}</Trans>
                                </Form.Control.Feedback>
                            </Form.Row>

                            {/*username*/}
                            <Form.Row >
                                <Form.Control placeholder={t('User.username')}
                                              type="text" name="username" maxLength="40"
                                              className="form-control mb-4 register-login-input"
                                              onChange={handleChange}
                                              onBlur={handleBlur}
                                              isValid={touched.username && !errors.username}
                                              isInvalid={touched.username && !!errors.username}
                                              value={values.username}/>
                                <Form.Control.Feedback type="invalid">
                                    <Trans>{errors.username}</Trans>
                                </Form.Control.Feedback>
                            </Form.Row>

                            {/*Password*/}
                            <Form.Row>
                                <Form.Control placeholder={t('User.password')}
                                              type="password" name="password" maxLength="100"
                                              className="form-control mb-4 register-login-input"
                                              onChange={handleChange}
                                              onBlur={handleBlur}
                                              isValid={touched.password && !errors.password}
                                              isInvalid={touched.password && !!errors.password}
                                              value={values.password}/>
                                <Form.Control.Feedback type="invalid">
                                    <Trans>{errors.password}</Trans>
                                </Form.Control.Feedback>
                            </Form.Row>

                            {/*Repeat password*/}
                            <Form.Row>
                                <Form.Control placeholder={t('User.repeatPassword')}
                                              type="password" name="repeatPassword" maxLength="100"
                                              className="form-control mb-4 register-login-input"
                                              onChange={handleChange}
                                              onBlur={handleBlur}
                                              isValid={touched.repeatPassword && !errors.repeatPassword}
                                              isInvalid={touched.repeatPassword && !!errors.repeatPassword}
                                              value={values.repeatPassword}/>
                                <Form.Control.Feedback type="invalid">
                                    <Trans>{errors.repeatPassword}</Trans>
                                </Form.Control.Feedback>
                            </Form.Row>

                            {/*Sign up button*/}
                            <Button className="btn-info my-4 btn-block" type="submit" disabled={isSubmitting}>
                                <Trans i18nKey="Register.signUp"/>
                            </Button>

                        </Form>
                    )}
                </Formik>

                <div className="offset_register"/>
            </div>
        );
    }
}

const Extended = withTranslation()(Register);
Extended.static = Register.static;

export default Extended;