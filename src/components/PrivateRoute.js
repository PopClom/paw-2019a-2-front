import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import {getUser} from "../helpers/auth";

const PrivateRoute = ({ component: Component, ...rest }) => {

    const isLoggedIn = getUser() !== null;

    return (
        <Route
            {...rest}
            render={props =>
                isLoggedIn ? (
                    <Component {...props} />
                ) : (
                    <Redirect to={{ pathname: '/login', from: props.location.pathname }} />
                )
            }
        />
    )
};

export default PrivateRoute;