import React from "react";
import {store} from "../index";
import {TOKEN_REFRESHED} from "../redux/actiontype/UserActionTypes";
import axios from "axios";
import i18next from "i18next";

axios.interceptors.response.use(
    (response) => {
        return response;
    },
    function (error) {
        const originalRequest = error.config;
        if (
            error.response.status === 401 &&
            store.getState().userState.loggedIn &&
            !originalRequest._retry
        ) {
            originalRequest._retry = true;
            return axios
                .post(`${process.env.REACT_APP_REST_API_URL}/auth/refresh-token`)
                .then((res) => {
                    if (res.status === 200) {
                        store.dispatch({type: TOKEN_REFRESHED, accessToken: res.data.accessToken});
                        return axios(originalRequest);
                    }
                }).catch(error => {
                    return Promise.reject(error);
                });
        }
        return Promise.reject(error);
    }
);
axios.interceptors.request.use(
    (config) => {
        //   config.headers['Access-Control-Allow-Credentials'] = true;
        config.headers['Content-Type'] = 'application/json';
        config.headers['Accept-Language'] = i18next.language;
        config.withCredentials = true;

        if (store.getState().userState.accessToken) {
            console.log('Auth', store.getState().userState.accessToken);
            config.headers['Authorization'] = 'Bearer ' + store.getState().userState.accessToken;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export interface AccountActivationRequest {
    token: string
}
