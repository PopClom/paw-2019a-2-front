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

import {setupNotifications} from "./helpers";
import {refresh} from "./helpers/auth";
import {createMuiTheme, MuiThemeProvider} from "@material-ui/core";


const muiTheme = createMuiTheme({
    palette: {
        primary: {500: '#1ed75f'}
    },
    input: {
        color: "primary"
    }
});

const run = async () => {
    setupNotifications();
    await refresh();
    ReactDOM.render(
        <MuiThemeProvider theme={muiTheme}><App/></MuiThemeProvider>, document.getElementById('root'));
};

run();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
