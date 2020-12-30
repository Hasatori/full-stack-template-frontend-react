import React, {useState} from "react";
import {getFormControlClass, getUrlParameter, isPasswordValid} from "../../../util/APIUtils";
import {RouteComponentProps} from "react-router-dom";
import {connect} from "react-redux";
import {resetPassword} from "../../../redux/actiontype/UserActionTypes";
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";
import {useTranslation} from "react-i18next";

function mapDispatchToProps(dispatch: ThunkDispatch<any, any, AnyAction>) {
    return {
        resetPassword: (resetPasswordRequest: ResetPasswordRequest) => dispatch(resetPassword(resetPasswordRequest))
    };
};

interface PasswordResetProps {
    resetPassword: (resetPasswordRequest: ResetPasswordRequest) => void;
}

function PasswordReset(props: PasswordResetProps & RouteComponentProps) {

    const [password, setPassword] = useState('');
    const [passwordValidationStarted, setPasswordValidationStarted] = useState(false);
    const [passwordValid, setPasswordValid] = useState(false);
    const [passwordCheck, setPasswordCheck] = useState('');
    const [passwordCheckValidationStarted, setPasswordCheckValidationStarted] = useState(false);
    const [passwordCheckValid, setPasswordCheckValid] = useState(false);
    const token = getUrlParameter(props.location.search, 'token');
    const email = getUrlParameter(props.location.search, 'email');
    const {t} = useTranslation();
    console.log(token);
    if (token === '' || email === '') {
        props.history.push("/login");
    }

    function handleSubmit(event: React.FormEvent<EventTarget>) {
        event.preventDefault();
        if (passwordValid && passwordCheckValid) {
            props.resetPassword({email: email, password: password, token: token})
        }
    }

    return (
        <div className="login-container">
            <div className="login-content">
                <h1 className="login-title">{t('ns1:forgottenPasswordHeading')}</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-item">
                        <input type="password" name="password"
                               className={getFormControlClass(passwordValidationStarted, passwordValid)}
                               placeholder={t('ns1:passwordLabel')}
                               value={password} onChange={(event) => {
                            setPasswordValidationStarted(true);
                            setPasswordValid(isPasswordValid(event.target.value));
                            setPasswordCheckValidationStarted(true);
                            setPasswordCheckValid(event.target.value === passwordCheck);
                            setPassword(event.target.value);

                        }} required/>
                        <div className="invalid-feedback text-left">
                            {t('ns1:invalidPasswordFormatMessage')}
                        </div>
                    </div>
                    <div className="form-item">
                        <input type="password" name="passwordCheck"
                               className={getFormControlClass(passwordCheckValidationStarted, passwordCheckValid)}
                               placeholder={t('ns1:confirmPasswordLabel')}
                               value={passwordCheck} onChange={(event) => {
                            setPasswordCheckValidationStarted(true);
                            setPasswordCheckValid(password === event.target.value);
                            setPasswordCheck(event.target.value)

                        }} required/>
                        <div className="invalid-feedback text-left">
                            {t('ns1:invalidPasswordFormatMessage')}
                        </div>
                    </div>
                    <div className="form-item">
                        <button type="submit"
                                className="btn btn-block btn-primary">{t('ns1:requestPasswordResetButtonLabel')}</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export interface ResetPasswordRequest {

    email: string;
    password: string;
    token: string;
}

export default connect(null, mapDispatchToProps)(PasswordReset);
