import React, {useEffect, useState} from 'react';
import './Login.css';
import {Link, RouteComponentProps} from 'react-router-dom'
import {MDBCard, MDBCardBody, MDBCardFooter, MDBCol, MDBRow} from "mdbreact";
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
import {Input} from "../../form/Input";
import TwoFactorCodeForm from "./TwoFactorCodeForm";

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
    loginRecoveryCode: (loginRequest: TwoFactorLoginRequest) => void;
    twoFactorRequired: boolean,
    loading: boolean
}

export interface TwoFactorFormProps {
    email: string;
    password: string;
    rememberMe: boolean;
    loginTwoFactor: (loginRequest: TwoFactorLoginRequest) => void
    loginRecoveryCode: (loginRequest: TwoFactorLoginRequest) => void;
}

function Login(props: RouteComponentProps & LoginProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const {t} = useTranslation();

    useEffect(() => {
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


    if (!props.twoFactorRequired) {
        return (
            <div>
                <MDBRow>
                    <MDBCol sm="1" md="2" xl="3"/>
                    <MDBCol sm="10" md="8" xl="6">
                        <MDBCard>
                            <MDBCardBody className="p-5">
                                <form onSubmit={handleRegularLogin}
                                      noValidate>

                                    <Input
                                        id={"email"}
                                        type="email"
                                        label={t("ns1:emailLabel")}
                                        value={email}
                                        valid={true}
                                        validationStarted={false}
                                        onChange={(event) => setEmail(event.target.value)}
                                        required={false}
                                        invalidValueMessage={t('ns1:invalidEmailMessage')}
                                    />
                                    <Input
                                        id={"password"}
                                        type="password"
                                        label={t("ns1:passwordLabel")}
                                        value={password}
                                        valid={true}
                                        validationStarted={false}
                                        onChange={(event) => setPassword(event.target.value)}
                                        required={false}
                                        invalidValueMessage={t('ns1:invalidPasswordFormatMessage')}
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
                    <MDBCol sm="1" md="2" xl="3"/>
                </MDBRow>
            </div>
        );
    } else {
        return (
            <TwoFactorCodeForm email={email}
                               password={password}
                               rememberMe={rememberMe}
                               loginTwoFactor={props.loginTwoFactor}
                               loginRecoveryCode={props.loginRecoveryCode}
            />
        )
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
