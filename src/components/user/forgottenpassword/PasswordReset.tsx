import React, {useState} from "react";
import {arePasswordsSame, getUrlParameter, isPasswordValid} from "../../../util/APIUtils";
import {RouteComponentProps} from "react-router-dom";
import {connect} from "react-redux";
import {resetPassword} from "../../../redux/actiontype/UserActionTypes";
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";
import {useTranslation} from "react-i18next";
import {Input} from "../../form/Input";

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
    const [confirmPassword, setConfirmPassword] = useState('');
    const [confirmPasswordValidationStarted, setConfirmPasswordValidationStarted] = useState(false);
    const [confirmPasswordValid, setConfirmPasswordValid] = useState(false);
    const token = getUrlParameter(props.location.search, 'token');
    const email = getUrlParameter(props.location.search, 'email');
    const {t} = useTranslation();
    console.log(token);
    if (token === '' || email === '') {
        props.history.push("/login");
    }

    function handleSubmit(event: React.FormEvent<EventTarget>) {
        event.preventDefault();
        if (passwordValid && confirmPasswordValid) {
            props.resetPassword({email: email, password: password, token: token})
        }
    }

    return (
        <div className="login-container">
            <div className="login-content">
                <h1 className="login-title">{t('ns1:forgottenPasswordHeading')}</h1>
                <form onSubmit={handleSubmit}>
                    <Input id={"password"} type={"password"} label={t('ns1:passwordLabel')} value={password} valid={passwordValid} validationStarted={passwordValidationStarted} required={true} onChange={(event) => {
                        setPasswordValidationStarted(true);
                        setPasswordValid(isPasswordValid(event.target.value));
                        setConfirmPasswordValidationStarted(true);
                        setPassword(event.target.value);

                    }}  invalidValueMessage={t('ns1:invalidPasswordFormatMessage')} />
                    <Input
                        id={"confirmPassword"}
                        type="password"
                        label={t('ns1:confirmPasswordLabel')}
                        value={confirmPassword}
                        valid={confirmPasswordValid}
                        validationStarted={confirmPasswordValidationStarted}
                        onChange={(event) => {
                            setConfirmPasswordValidationStarted(true);
                            setConfirmPasswordValid(arePasswordsSame(password, event.target.value));
                            setConfirmPassword(event.target.value);
                        }}
                        required={true}
                        invalidValueMessage= {t('ns1:passwordsDoNotMatchMessage')}

                    />
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
