import axios from "axios";
import qs from "qs";
import {SERVER_ADDR} from "../constants";

export const login = async (username, password) => {
    return axios.post(`${SERVER_ADDR}/`,
        qs.stringify({username: username, password: password}),
        {headers: {'content-type': 'application/x-www-form-urlencoded;charset=utf-8'}})
        .then(response => {
            localStorage.setItem("token", response.data);
            return refresh();
        });
};

export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setAuthorizationToken();
};

export const refresh = async () => {
    const token = localStorage.getItem("token");
    if (token) {
        setAuthorizationToken(token);
        return axios.get(`${SERVER_ADDR}/user`).then(response => {
            localStorage.setItem("user", JSON.stringify(response.data));
        }).catch(() => {
            logout();
        });
    }
};

export const getUser = () => {
    return JSON.parse(localStorage.getItem("user"));
};

export function isLoggedIn() {
    return getUser() ? true : false;
}

const setAuthorizationToken = (token) => {
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
};