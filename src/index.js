/* React */
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

/* i18n */
import "./constants/i18n";

/* CSS */
import 'bootstrap/dist/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'react-notifications/lib/notifications.css';
import './style/index.css';

import {refresh} from "./helpers/auth";
import {createMuiTheme, MuiThemeProvider} from "@material-ui/core";
import axios from "axios";
import {NotificationManager} from "react-notifications";
import {Trans} from "react-i18next";


const muiTheme = createMuiTheme({
    palette: {
        primary: {500: '#1ed75f'}
    },
    input: {
        color: "primary"
    }
});

let connectionError = false;

const run = async () => {
    axios.interceptors.response.use(
        response => {
            return response;
        },
        error => {
            if (error.response) {
                if (error.response.status === 401 || error.response.status === 403 || error.response.status === 405) {
                    NotificationManager.error(<Trans>notification.failedRequest</Trans>,
                        <Trans>notification.oops</Trans>, 5000);
                }
            } else {
                if (!connectionError) {
                    connectionError = true;
                    NotificationManager.error(<Trans>notification.connectionError</Trans>,
                        <Trans>notification.oops</Trans>, 5000);
                    setTimeout(() => {connectionError = false}, 5000);
                }
            }
            return Promise.reject(error);
        }
    );

    await refresh();
    ReactDOM.render(
        <MuiThemeProvider theme={muiTheme}><App/></MuiThemeProvider>, document.getElementById('root'));
};

run();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
