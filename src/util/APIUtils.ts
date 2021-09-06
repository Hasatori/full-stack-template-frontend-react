import {store} from "../index";
import {LOGOUT_USER, TOKEN_REFRESHED} from "../redux/actiontype/UserActionTypes";
import axios from "axios";
import i18next from "i18next";

const API = axios.create({
    baseURL: process.env.REACT_APP_REST_API_URL,
    timeout: 10000
})

API.interceptors.response.use(
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
            return API
                .get(`${process.env.REACT_APP_REST_API_URL}/auth/access-token`)
                .then((res) => {
                    if (res.status === 200) {
                        store.dispatch({type: TOKEN_REFRESHED, accessToken: res.data.accessToken});
                        return axios(originalRequest);
                    }
                }).catch(error => {
                    store.dispatch({type:LOGOUT_USER})
                    return Promise.reject(error);
                });
        }
        return Promise.reject(error);
    }
);
API.interceptors.request.use(
    (config) => {
        //config.headers['Access-Control-Allow-Credentials'] = true;
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

export default API;

export interface AccountActivationRequest {
    token: string
}
