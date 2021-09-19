import React, {useEffect} from 'react';
import {Redirect, Route, Switch, useHistory, useLocation} from 'react-router-dom';
import AppHeader from './navigation/AppHeader';
import About from './about/About';
import Signup from './user/signup/Signup';
import OAuth2RedirectHandler from './user/oauth2/OAuth2RedirectHandler';
import NotFound from './notfound/NotFound';
import LoadingIndicator from './loading/LoadingIndicator';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import './App.css';
import ForgottenPassword from "./user/forgottenpassword/ForgottenPassword";
import PasswordReset from "./user/forgottenpassword/PasswordReset";
import {PrivateRoute} from "./user/PrivateRoute";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import {connect} from 'react-redux'
import Account from "./user/account/Account";
import {AppState} from "../redux/store/Store";
import {toast, ToastContainer, ToastOptions} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {AnyAction} from "redux";
import {
    loadCurrentlyLoggedInUser,
    logoutActionCreator,
    refreshTokenActionCreator
} from "../redux/actiontype/UserActionTypes";
import {ThunkDispatch} from "redux-thunk";

import {
    dismissFailure,
    dismissInfo,
    dismissSuccess,
    dismissWarning,
    FAILURE,
    failureActionCreator,
    INFO,
    SUCCESS,
    WARNING
} from "../redux/actiontype/GeneralActionTypes";
import ActivateAccount from "./user/activateaccount/ActivateAccount";
import {CookiesConsent} from "./modal/CookiesConsent";
import {AppProps, store} from "../index";
import {Footer} from './footer/Footer';
import ConfirmEmailChange from "./user/confirmemilchange/ConfirmEmailChange";
import {MDBContainer} from "mdbreact";
import Login from "./user/login/Login";
import {Cookies} from "react-cookie";
import {THEME_COOKIE_NAME} from "../redux/reducer/GeneralReducer";
import {Routes} from "../util/Constants";

function mapStateToProps(state: AppState, props: AppProps) {
    return {
        loading: state.generalState.loading,
        loadingMessage: state.generalState.loadingMessage,
        successMessage: state.generalState.successMessage,
        failureMessage: state.generalState.failureMessage,
        warningMessage: state.generalState.warningMessage,
        infoMessage: state.generalState.infoMessage,
        authenticated: state.userState.authenticated,
        loggedIn: state.userState.loggedIn,
        user: state.userState.currentUser,
        accessToken: state.userState.accessToken,
        redirectUrl: state.generalState.redirectUrl,
        theme: state.generalState.theme
    }
}

function mapDispatchToProps(dispatch: ThunkDispatch<any, any, AnyAction>) {
    return {
        loadCurrentUser: () => dispatch(loadCurrentlyLoggedInUser()),
        onLogOut: () => dispatch(logoutActionCreator()),
        refreshToken: () => dispatch(refreshTokenActionCreator())
    };
};

function toastEmitter(type: string): ToastOptions {
    let dismissOnClose: <T = {}>(props: T) => void = () => {
    };
    let autoClose: number | false = false;
    switch (type) {
        case SUCCESS:
            dismissOnClose = () => {
                store.dispatch(dismissSuccess())
            };
            autoClose = 3000;
            break;
        case WARNING:
            dismissOnClose = () => {
                store.dispatch(dismissWarning())
            };
            autoClose = 5000;
            break;
        case FAILURE:
            dismissOnClose = () => {
                store.dispatch(dismissFailure())
            };
            autoClose = false;
            break;
        case INFO:
            dismissOnClose = () => {
                store.dispatch(dismissInfo())
            };
            autoClose = false;
            break;
    }
    return {
        position: "top-right",
        autoClose: autoClose,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        onClose: dismissOnClose
    }
};

function App(appProps: AppProps) {
    const history = useHistory();
    useEffect(() => {
        if (typeof appProps.warningMessage !== "undefined") {
            toast.warning('⚠    ' + appProps.warningMessage, toastEmitter(WARNING));
        }
    }, [appProps.warningMessage]);

    useEffect(() => {
        if (typeof appProps.infoMessage !== "undefined") {
            toast.info('ℹ   ' + appProps.infoMessage, toastEmitter(INFO));
        }
    }, [appProps.infoMessage]);
    useEffect(() => {
        if (typeof appProps.successMessage !== "undefined") {
            toast.success('✔    ' + appProps.successMessage, toastEmitter(SUCCESS));
        }
    }, [appProps.successMessage]);
    useEffect(() => {
        if (typeof appProps.failureMessage !== "undefined") {
            toast.error('❕  ' + appProps.failureMessage, toastEmitter(FAILURE));
        }
    }, [appProps.failureMessage]);
    useEffect(() => {
        if (appProps.loggedIn) {
            appProps.loadCurrentUser();
        }
    }, [appProps.loggedIn])
    useEffect(() => {
        if (!appProps.loggedIn) {
            appProps.refreshToken();
        }
    }, []);
    useEffect(() => {
        if (appProps.loading) {
            toast.dismiss();
        }
    }, [appProps.loading])

    useEffect(() => {
        if (typeof appProps.redirectUrl !== 'undefined'){
            history.push(appProps.redirectUrl)
        }
    },[appProps.redirectUrl])

    useEffect(() => {
        if (appProps.theme === 'dark') {
            document.body.classList.add('dark');
        } else {
            document.body.classList.remove('dark');
        }
    }, [appProps.theme]);

    let location = useLocation<{ error: string }>();
    useEffect(() => {
        if (location.state && location.state.error) {
            setTimeout(() => {
                store.dispatch(failureActionCreator(location.state.error));
                history.replace({
                    pathname: location.pathname,
                    state: {}
                });
            }, 100);
        }
    });
    return (
        <div>
            <LoadingIndicator {...appProps}/>
            <div className="app-top-box">
                <AppHeader {...appProps}/>
            </div>
            <CookiesConsent/>
            <MDBContainer className="app-body">
                <Switch>
                    <Route exact path={[Routes.ABOUT1,Routes.ABOUT2]} render={(props )=> <About {...appProps}/>}/>
                    <PrivateRoute
                        path={[Routes.ACCOUNT]}
                        {...{
                            authenticated: appProps.authenticated,
                            authenticationPath: Routes.LOGIN,
                            redirectPathOnAuthentication: Routes.ACCOUNT
                        }} exact={true}
                        render={(props) => <Account/>}/>

                    <Route path={Routes.LOGIN}
                           render={(props) => appProps.authenticated ? <Redirect to={Routes.ACCOUNT}/> :// @ts-ignore
                               <Login {...props} />}/>
                    <Route path={Routes.SIGNUP}
                           render={(props) => appProps.authenticated ? <Redirect to={Routes.ACCOUNT}/> :
                               <Signup {...props}/>}/>
                    <Route path={Routes.FORGOTTEN_PASSWORD}
                           render={(props) => appProps.authenticated ? <Redirect to={Routes.ACCOUNT}/> :
                               <ForgottenPassword {...props} />}/>
                    <Route path={Routes.PASSWORD_RESET}
                           render={(props) => <PasswordReset  {...props}/>}/>
                    <Route path={Routes.OAUTH2_REDIRECT}
                           render={(props) => appProps.authenticated ? <Redirect to={Routes.ACCOUNT}/> :
                               <OAuth2RedirectHandler {...appProps}{...props}/>}/>
                    <Route path={`${Routes.ACTIVATE_ACCOUNT}*`}
                           render={(props) => appProps.authenticated ? <Redirect to={Routes.ACCOUNT}/> :
                               <ActivateAccount {...appProps}{...props}/>}/>
                    <Route path={`${Routes.CONFIRM_EMAIL_CHANGE}*`}
                           render={(props) => <ConfirmEmailChange {...appProps}{...props}/>}/>
                    <Route component={NotFound}/>
                </Switch>
            </MDBContainer>
            <ToastContainer newestOnTop={true}/>
            <Footer/>
        </div>

    );
}


function createThemeCookieExpirationDate():Date{
    const expiresDate = new Date();
    expiresDate.setTime(expiresDate.getTime() + (100*365*24*60*60*1000)); // expires in 100 years
    return expiresDate;
}

export interface User {
    id: number;
    name: string;
    email: string;
    profileImage: ProfileImage;
    twoFactorEnabled: boolean;
    o2AuthInfo: O2AuthInfo | null ;
    backupCodes: string[]

}

export interface O2AuthInfo {
    needToSetPassword: boolean;
}

export interface ProfileImage {
    id: number;
    name?: string;
    type?: string;
    data?: string;
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
