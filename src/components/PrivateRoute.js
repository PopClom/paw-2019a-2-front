import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import {isLoggedIn} from "../helpers/auth";

const PrivateRoute = ({ component: Component, ...rest }) => {
    const loggedIn = isLoggedIn();

    return (
        <Route
            {...rest}
            render={props =>
                loggedIn ? (
                    <Component {...props} />
                ) : (
                    <Redirect to={{ pathname: '/login', from: props.location.pathname }} />
                )
            }
        />
    )
};

export default PrivateRoute;