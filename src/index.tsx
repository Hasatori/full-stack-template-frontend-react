import './index.css';

import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter as Router} from 'react-router-dom';
import {Provider} from "react-redux";
import configureStore from "./redux/store/Store";
import App, {User} from "./components/App";
import ReactDOM from 'react-dom';
import React from 'react';
import './i18n/I18nConfig';

export const store = configureStore();

export interface AppProps {
    loading: boolean,
    loadingMessage: string | undefined
    successMessage: string | undefined
    failureMessage: string | undefined
    warningMessage: string | undefined
    infoMessage: string | undefined
    redirectUrl: string | undefined
    authenticated: boolean,
    loggedIn: boolean,
    loadCurrentUser: () => void
    onLogOut: () => void,
    refreshToken: () => void,
    user: User,
    accessToken: string
}

export const initProps: AppProps = {
        authenticated: false,
        loggedIn: false,
        loading: false,
        loadingMessage: undefined,
        successMessage: undefined,
        failureMessage: undefined,
        warningMessage: undefined,
        infoMessage: undefined,
        redirectUrl:undefined,
        user: {} as any,
        onLogOut: () => {
        },
        loadCurrentUser: () => {
        },
        refreshToken: () => {
        },
        accessToken: ""
    }
;
ReactDOM.render(
    <Router>

        <Provider store={store}>
            <App {...initProps}/>
        </Provider>
    </Router>,
    document.getElementById('root')
)

registerServiceWorker();
