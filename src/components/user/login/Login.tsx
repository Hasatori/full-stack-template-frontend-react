import React, {useState} from 'react';
import './Login.css';
import {Link} from 'react-router-dom'
import {MDBCard, MDBCardBody, MDBCardFooter} from "mdbreact";
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

function Login(props:LoginProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const {t} = useTranslation();

    function handleRegularLogin(event: React.FormEvent<EventTarget>) {
        event.preventDefault();
        const loginRequest: LoginRequest = {email: email, password: password, rememberMe: rememberMe,}
        props.login(loginRequest);
    }


    if (!props.twoFactorRequired) {
        return (
                        <MDBCard className="card">
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
                                        required={true}
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
                                        required={true}
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
