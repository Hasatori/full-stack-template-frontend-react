import React, {useEffect, useState} from 'react';
import './Login.css';
import {Link, RouteComponentProps} from 'react-router-dom'
import {MDBCard, MDBCardBody, MDBCardFooter, MDBCol, MDBContainer, MDBRow} from "mdbreact";
import O2AuthAuthentication from "../oauth2/O2AuthAuthentication";
import {connect} from "react-redux";
import {ThunkDispatch} from "redux-thunk";
import {
    loginActionCreator,
    loginRecoveryCodeActionCreator,
    loginTwoFactorActionCreator
} from "../../../redux/actiontype/UserActionTypes";
import {AnyAction} from "redux";
import {AppState} from "../../../redux/store/Store";
import {failureActionCreator} from "../../../redux/actiontype/GeneralActionTypes";
import {store} from "../../../index";
import {useTranslation} from "react-i18next";

function mapDispatchToProps(dispatch: ThunkDispatch<any, any, AnyAction>) {
    return {
        login: (loginRequest: LoginRequest) => dispatch(loginActionCreator(loginRequest)),
        loginTwoFactor: (twoFactorLoginRequest: TwoFactorLoginRequest) => dispatch(loginTwoFactorActionCreator(twoFactorLoginRequest)),
        loginRecoveryCode: (twoFactorLoginRequest: TwoFactorLoginRequest) => dispatch(loginRecoveryCodeActionCreator(twoFactorLoginRequest))

    };
};

function mapStateToProps(state: AppState, props: LoginProps) {
    return {
        twoFactorRequired: state.userState.twoFactorRequired,
        loading: state.generalState.loading
    }
}

export interface LoginProps {
    login: (loginRequest: LoginRequest) => void;
    loginTwoFactor: (loginRequest: TwoFactorLoginRequest) => void,
    loginRecoveryCode: (loginRequest: TwoFactorLoginRequest) => void,
    twoFactorRequired: boolean,
    loading: boolean
}

function Login(props: RouteComponentProps & LoginProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [code, setCode] = useState("");
    const [recoveryCode, setRecoveryCode] = useState("");
    const [userRecoveryCode, setUseRecoveryCode] = useState(false);
    const {t} = useTranslation();

    useEffect(() => {

        // If the OAuth2 login encounters an error, the user is redirected to the /login page with an error.
        // Here we display the error and then remove the error query parameter from the location.
        // @ts-ignore
        if (props.location.state && props.location.state.error) {
            setTimeout(() => {
                // @ts-ignore
                store.dispatch(failureActionCreator(props.location.state.error));
                props.history.replace({
                    pathname: props.location.pathname,
                    state: {}
                });
            }, 100);
        }
    });

    function handleRegularLogin(event: React.FormEvent<EventTarget>) {
        event.preventDefault();
        const loginRequest: LoginRequest = {email: email, password: password, rememberMe: rememberMe,}
        props.login(loginRequest);

    }

    function handleTwoFactorLogin(event: React.FormEvent<EventTarget>) {
        event.preventDefault();
        const loginRequest: TwoFactorLoginRequest = {
            email: email,
            password: password,
            rememberMe: rememberMe,
            code: code
        };
        props.loginTwoFactor(loginRequest);
    }

    function handleRecoveyCodeLogin(event: React.FormEvent<EventTarget>) {
        event.preventDefault();
        const loginRequest: TwoFactorLoginRequest = {
            email: email,
            password: password,
            rememberMe: rememberMe,
            code: recoveryCode
        };
        props.loginRecoveryCode(loginRequest);
    }

    if (!props.twoFactorRequired) {
        return (
            <MDBContainer className="mt-5">
                <MDBRow>
                    <MDBCol md="3"/>
                    <MDBCol md="6">
                        <MDBCard>

                            <MDBCardBody className="p-5">
                                <p className="h4 text-center">{t('ns1:loginHeading')}</p>
                                <form onSubmit={handleRegularLogin}
                                      noValidate>
                                    <label
                                        htmlFor="email"
                                        className="grey-text font-weight-light"
                                    >
                                        {t('ns1:emailLabel')}
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        className="form-control"
                                        value={email} onChange={(event) => setEmail(event.target.value)} required
                                    />
                                    <br/>
                                    <label
                                        htmlFor="password"
                                        className="grey-text font-weight-light"
                                    >
                                        {t('ns1:passwordLabel')}
                                    </label>
                                    <input
                                        type="password"
                                        id="password"
                                        className="form-control"
                                        value={password} onChange={(event) => setPassword(event.target.value)} required
                                    />
                                    <div className="d-flex"><span className="link"> <Link
                                        to="/forgotten-password">{t('ns1:forgotPasswordQuestion')}</Link></span>
                                    </div>
                                    <div className="text-center py-4 mt-3">
                                        <div className="text-center my-2">

                                            <button className="btn btn-block btn-primary p-1" type="submit"
                                                    disabled={props.loading}>{t('ns1:loginLabel')}</button>
                                        </div>
                                    </div>
                                </form>
                                <span className="font-weight-light-blue flex-center">{t('ns1:newUserLoginQuestion')}
                                    <Link className="ml-1"
                                          to="/signup">{t('ns1:signupLabel')}!</Link></span>
                            </MDBCardBody>
                            <MDBCardFooter>
                                <div className="text-center mb-1">{t('ns1:orLoginWithSuggestion')}</div>

                                {<O2AuthAuthentication {...props} registration={false}/>}
                            </MDBCardFooter>
                        </MDBCard>
                    </MDBCol>
                    <MDBCol md="3"/>


                </MDBRow>
            </MDBContainer>
        );
    } else if (userRecoveryCode) {
        return (<MDBContainer className="mt-5">
                <MDBRow>
                    <MDBCol md="3"/>
                    <MDBCol md="6">
                        <MDBCard>

                            <MDBCardBody>
                                <p className="h4 text-center">{t('ns1:loginHeading')}</p>
                                <form onSubmit={handleRecoveyCodeLogin}>
                                    <label
                                        htmlFor="code"
                                        className="grey-text font-weight-light"
                                    >
                                        {t('ns1:recoveryCodeLabel')}
                                    </label>
                                    <input
                                        type="text"
                                        id="code"
                                        className="form-control"
                                        value={recoveryCode} onChange={(event) => setRecoveryCode(event.target.value)}
                                        required
                                    />
                                    <div className="text-center py-4 mt-3">
                                        <div className="text-center my-2">

                                            <button className="btn btn-block btn-primary p-1" type="submit"
                                                    disabled={props.loading}>{t('ns1:loginLabel')}</button>
                                        </div>
                                    </div>
                                </form>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                    <MDBCol md="3"/>
                </MDBRow>
            </MDBContainer>
        )
    } else {
        return (
            <MDBContainer className="mt-5">
                <MDBRow>
                    <MDBCol md="3"/>
                    <MDBCol md="6">
                        <MDBCard>

                            <MDBCardBody>
                                <p className="h4 text-center">{t('ns1:loginHeading')}</p>
                                <form onSubmit={handleTwoFactorLogin}>
                                    <label
                                        htmlFor="code"
                                        className="grey-text font-weight-light"
                                    >
                                        {t('ns1:twoFactorCodeLabel')}
                                    </label>
                                    <input
                                        type="text"
                                        id="code"
                                        className="form-control"
                                        value={code} onChange={(event) => setCode(event.target.value)} required
                                    />
                                    <div className="text-center py-4 mt-1">
                                        <div className="text-center my-2">

                                            <button className="btn btn-block btn-primary p-1" type="submit"
                                                    disabled={props.loading}>{t('ns1:loginLabel')}</button>
                                        </div>
                                    </div>
                                </form>
                                <span
                                    className="font-weight-light-blue flex-center">{t('ns1:havingProblemsLoginTwoFactorQuestion')}
                                    <Link
                                        className="ml-1" onClick={() => {
                                        setUseRecoveryCode(true)
                                    }}
                                        to="#">{t('ns1:useRecoveryCodeLabel')}</Link></span>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                    <MDBCol md="3"/>
                </MDBRow>
            </MDBContainer>)
    }
}

export interface LoginRequest {
    email: string,
    password: string,
    rememberMe: boolean
}

export interface TwoFactorLoginRequest {
    email: string,
    password: string,
    rememberMe: boolean,
    code: string,
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
