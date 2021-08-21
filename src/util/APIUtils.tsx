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

export function getUrlParameter(url: string, name: string) {
    name = name.replace(/[\\[]/, '\\[').replace(/[\]]/, '\\]');
    let regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    let results = regex.exec(url);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};


export function isEmailValid(email: string): boolean {
    let pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    return pattern.test(email);
}


export function isPasswordValid(password: string): boolean {
    let pattern = new RegExp(/^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])[\w!@#$%^&*]{8,}$/);
    return pattern.test(password);
}

export function arePasswordsSame(password: string,confirmPassword:string): boolean {
   return password === confirmPassword;
}


export interface AccountActivationRequest {
    token: string
}
