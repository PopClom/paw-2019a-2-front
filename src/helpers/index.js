import {getUser, isLoggedIn} from "./auth";
import axios from "axios";
import {NotificationManager} from "react-notifications";
import {Trans} from "react-i18next";
import React from "react";

const TOAST_TIMEOUT = 5000;
let connectionError = false;

export const setupNotifications = () => {
    axios.interceptors.response.use(
        response => {
            return response;
        },
        error => {
            if (error.response) {
                console.log(error.response);
                if (error.response.status === 400 || error.response.status === 401 ||
                    error.response.status === 403 || error.response.status === 405) {
                    NotificationManager.error(<Trans>notification.failedRequest</Trans>,
                        <Trans>notification.oops</Trans>, TOAST_TIMEOUT);
                }
            } else {
                if (!connectionError) {
                    connectionError = true;
                    NotificationManager.error(<Trans>notification.connectionError</Trans>,
                        <Trans>notification.oops</Trans>, TOAST_TIMEOUT);
                    setTimeout(() => {connectionError = false}, TOAST_TIMEOUT);
                }
            }
            return Promise.reject(error);
        }
    );
};

export const formatNumber = (value, decimals = 0) => {
    return value.toFixed(decimals);
};

export const formatDate = (date) => {
    let month = '' + (date.getMonth() + 1);
    let day = '' + date.getDate();
    let year = date.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
};

export function handleInputChange(event, validate = null) {
    let name = event.target.name;
    let value = event.target.value;

    this.setState({[name]: value}, () => {
        if(validate !== null)
            validate(name, value)
    });
}

export function onChange(change) {
    this.setState(change);
}

export function getCurrentUserId(){
    const user = getUser();
    if (user)
        return user.id;
    return null;
}

export function isMyUser(id){
    return id != null && parseInt(id) === getCurrentUserId();
}

export function isUserAdmin() {
    return isLoggedIn() && getUser().admin;
}

export function isUserBanned(user) {
    return user.status !== "REGULAR";
}

export function followUser(user) {
    const myUser = getUser();
    if (!myUser.following.users.some(x => x.id === user.id)) {
        myUser.following.users.push(user);
        myUser.followingAmount = myUser.following.users.length;
    }
    localStorage.setItem("user", JSON.stringify(myUser));
}

export function unfollowUser(user) {
    const myUser = getUser();
    myUser.following.users = myUser.following.users.filter(x => x.id !== user.id);
    myUser.followingAmount = myUser.following.users.length;
    localStorage.setItem("user", JSON.stringify(myUser));
}