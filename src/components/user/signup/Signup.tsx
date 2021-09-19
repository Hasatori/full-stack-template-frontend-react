import * as React from "react";
import {useState} from "react";
import './Signup.css';
import {Link, useHistory} from 'react-router-dom'
import O2AuthAuthentication from "../oauth2/O2AuthAuthentication";
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";
import {signUp} from "../../../redux/actiontype/UserActionTypes";
import {MDBCard, MDBCardBody, MDBCardFooter} from "mdbreact";
import {useTranslation} from "react-i18next";
import {connect} from "react-redux";
import {Input} from "../../form/Input";
import {arePasswordsSame, isEmailValid, isPasswordValid} from "../../../util/ValidationUtils";
import {Routes} from "../../../util/Constants";

interface SignUpProps {
    signUp: (signUpRequest: SignUpRequest) => void;
}

function mapDispatchToProps(dispatch: ThunkDispatch<any, any, AnyAction>) {
    return {
        signUp: (signUpRequest: SignUpRequest) => dispatch(signUp(signUpRequest))
    };
};

function Signup(props: SignUpProps) {
    const [name, setName] = useState('');
    const [nameValid, setNameValid] = useState(false);
    const [nameValidationStarted, setNameValidationStarted] = useState(false);
    const [email, setEmail] = useState('');
    const [emailValidationStarted, setEmailValidationStarted] = useState(false);
    const [emailValid, setEmailValid] = useState(false);
    const [password, setPassword] = useState('');
    const [passwordValidationStarted, setPasswordValidationStarted] = useState(false);
    const [passwordValid, setPasswordValid] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [confirmPasswordValidationStarted, setConfirmPasswordValidationStarted] = useState(false);
    const [confirmPasswordValid, setConfirmPasswordValid] = useState(false);
    const {t} = useTranslation();
    const history = useHistory();

    function handleSubmit(event: React.FormEvent<EventTarget>) {
        event.preventDefault();
        if (emailValid && passwordValid && confirmPasswordValid && nameValid) {
            const signUpRequest: SignUpRequest = {name: name, email: email, password: password}
            props.signUp(signUpRequest);
        } else {
            setEmailValidationStarted(true);
            setPasswordValidationStarted(true);
            setConfirmPasswordValidationStarted(true);
            setNameValidationStarted(true);
        }
    }

    return (
        <MDBCard className="card">
            <MDBCardBody className="p-5">
                <form onSubmit={handleSubmit}
                      noValidate>
                    <Input id={"name"}
                           type={"text"}
                           label={t('ns1:nameLabel')}
                           value={name}
                           valid={nameValid}
                           validationStarted={nameValidationStarted}
                           onChange={(event) => {
                               setNameValidationStarted(true);
                               setNameValid(event.target.value.length >= 4);
                               setName(event.target.value);
                           }}
                           invalidValueMessage={t('ns1:invalidNameMessage')}
                           required={true}/>
                    <Input
                        id={"email"}
                        type="email"
                        label={t("ns1:emailLabel")}
                        value={email}
                        valid={emailValid}
                        validationStarted={emailValidationStarted}
                        onChange={(event) => {
                            setEmail(event.target.value);
                            setEmailValidationStarted(true);
                            setEmailValid(isEmailValid(event.target.value));
                        }}
                        required={true}
                        invalidValueMessage={t('ns1:invalidEmailMessage')}
                    />
                    <Input
                        id={"password"}
                        type="password"
                        label={t("ns1:passwordLabel")}
                        value={password}
                        valid={passwordValid}
                        validationStarted={passwordValidationStarted}
                        onChange={(event) => {
                            setPasswordValidationStarted(true);
                            setConfirmPasswordValidationStarted(true)
                            setPasswordValid(isPasswordValid(event.target.value));
                            setPassword(event.target.value);
                        }}
                        required={true}
                        invalidValueMessage={t('ns1:invalidPasswordFormatMessage')}
                    />
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
                        invalidValueMessage={t('ns1:passwordsDoNotMatchMessage')}

                    />
                    <div className="form-item">
                        <button type="submit"
                                className="btn btn-block btn-primary">   {t('ns1:signupLabel')}</button>
                    </div>
                </form>
                <span
                    className="font-weight-light-blue flex-center">{t('ns1:alreadyHavenAnAccountQuestion')}
                    <Link className="ml-1"
                          to={Routes.LOGIN}>{t('ns1:loginLabel')}!</Link></span>
            </MDBCardBody>
            <MDBCardFooter>
                <div className="text-center mb-1">{t('ns1:orSignupWithSuggestion')}</div>

                {<O2AuthAuthentication {...props} registration={true}/>}
            </MDBCardFooter>
        </MDBCard>

    );
}


export interface SignUpRequest {
    name: string,
    email
        :
        string,
    password
        :
        string

}

export default connect(null, mapDispatchToProps)(Signup);
