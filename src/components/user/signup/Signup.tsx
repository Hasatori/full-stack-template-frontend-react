import * as React from "react";
import {useState} from "react";
import './Signup.css';
import {Link} from 'react-router-dom'
import O2AuthAuthentication from "../oauth2/O2AuthAuthentication";
import {connect} from "react-redux";
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";
import {signUp} from "../../../redux/actiontype/UserActionTypes";
import {getFormControlClass, isEmailValid, isPasswordValid} from "../../../util/APIUtils";
import {MDBIcon} from "mdbreact";
import {useTranslation} from "react-i18next";

const googleLogo = require("../../../assets/images/logos/google-logo.png");
const githubLogo = require('../../../assets/images/logos/github-logo.png');
const fbLogo = require("../../../assets/images/logos/fb-logo.png");

interface SignUpProps {
    signUp: (signUpRequest: SignUpRequest) => void;
}

function mapDispatchToProps(dispatch: ThunkDispatch<any, any, AnyAction>) {
    return {
        signUp: (signUpRequest: SignUpRequest) => dispatch(signUp(signUpRequest))
    };
};

function Signup(props: SignUpProps) {
    const {t} = useTranslation();
    return (
        <div className="signup-container">
            <div className="signup-content">
                <h1 className="signup-title">{t('ns1:signupHeading')}</h1>
                {<O2AuthAuthentication {...props} registration={true}/>}
                <div className="or-separator">
                    <span className="or-text">OR</span>
                </div>
                <SignupForm {...props} />
                <span className="login-link">{t('ns1:alreadyHavenAnAccountQuestion')} <Link
                    to="/login">{t('ns1:loginLabel')}</Link></span>
            </div>
        </div>
    );
}

export function SignupForm(props: SignUpProps) {
    const [name, setName] = useState('');
    const [nameValid, setNameValid] = useState(false);
    const [nameValidationStarted, setNameValidationStarted] = useState(false);
    const [email, setEmail] = useState('');
    const [emailValidationStarted, setEmailValidationStarted] = useState(false);
    const [emailValid, setEmailValid] = useState(false);
    const [password, setPassword] = useState('');
    const [passwordValidationStarted, setPasswordValidationStarted] = useState(false);
    const [passwordValid, setPasswordValid] = useState(false);
    const {t} = useTranslation();

    function handleSubmit(event: React.FormEvent<EventTarget>) {
        event.preventDefault();
        if (emailValid && passwordValid && nameValid) {
            const signUpRequest: SignUpRequest = {name: name, email: email, password: password}
            props.signUp(signUpRequest);
        }
    }


    return (
        <form onSubmit={handleSubmit}>
            <div className="form-item">
                <input type="text" name="name"
                       className={getFormControlClass(nameValidationStarted, nameValid)}
                       placeholder={t('ns1:nameLabel')}
                       value={name} onChange={(event) => {
                    setNameValidationStarted(true);
                    setNameValid(event.target.value.length >= 4);
                    setName(event.target.value);
                }} required

                />
                <div className="invalid-feedback text-left">
                    {t('ns1:invalidNameMessage')}
                </div>
                <small className='required error-color'><MDBIcon icon="asterisk"/></small>
            </div>
            <div className="form-item">
                <input type="email" name="email"
                       className={getFormControlClass(emailValidationStarted, emailValid)}
                       placeholder={t('ns1:emailLabel')}
                       value={email} onChange={(event) => {
                    setEmailValidationStarted(true);
                    setEmailValid(isEmailValid(event.target.value));
                    setEmail(event.target.value);

                }} required
                />
                <small className='required error-color'><MDBIcon icon="asterisk"/></small>
                <div className="invalid-feedback text-left">
                    {t('ns1:invalidEmailMessage')}
                </div>
            </div>
            <div className="form-item">
                <input type="password" name="password"
                       className={getFormControlClass(passwordValidationStarted, passwordValid)}
                       placeholder={t('ns1:passwordLabel')}
                       value={password} onChange={(event) => {
                    setPasswordValidationStarted(true);
                    setPasswordValid(isPasswordValid(event.target.value));
                    setPassword(event.target.value);

                }} required/>
                <small className='required error-color'><MDBIcon icon="asterisk"/></small>
                <div className="invalid-feedback text-left">
                    {t('ns1:invalidPasswordFormatMessage')}
                </div>
            </div>

            <div className="form-item">
                <button type="submit" className="btn btn-block btn-primary">   {t('ns1:signupLabel')}</button>
            </div>
        </form>

    );
}


export interface SignUpRequest {
    name: string,
    email: string,
    password: string

}

export default connect(null, mapDispatchToProps)(Signup);
