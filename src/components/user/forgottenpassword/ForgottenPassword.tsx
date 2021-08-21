import React, {useState} from "react";
import {connect} from "react-redux";
import {forgottenPasswordRequest} from "../../../redux/actiontype/UserActionTypes";
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";
import {useTranslation} from "react-i18next";
import {MDBCol, MDBRow} from "mdbreact";
import {Input} from "../../form/Input";
import {isEmailValid} from "../../../util/APIUtils";

function mapDispatchToProps(dispatch: ThunkDispatch<any, any, AnyAction>) {
    return {
        forgottenPasswordRequest: (email: string) => dispatch(forgottenPasswordRequest(email))
    };
};

interface ForgottenPasswordProps {
    forgottenPasswordRequest: (email: string) => void;
}

function ForgottenPassword(props: ForgottenPasswordProps) {
    const [email, setEmail] = useState('');
    const [emailValidationStarted, setEmailValidationStarted] = useState(false);
    const [emailValid, setEmailValid] = useState(false);
    const {t} = useTranslation();

    function handleSubmit(event: React.FormEvent<EventTarget>) {
        event.preventDefault();
        setEmailValidationStarted(true);
        setEmailValid(isEmailValid(email));
        if (emailValid){
            props.forgottenPasswordRequest(email);
        }

    }

    return (
        <MDBRow>
            <MDBCol sm="1" md="2" xl="3"/>
            <MDBCol sm="10" md="8" xl="6">
                <div className="login-content">
                    <form onSubmit={handleSubmit}>
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
                            invalidValueMessage= {t('ns1:invalidEmailMessage')}
                        />
                        <div className="text-center">
                            <div className="text-center my-2">
                                <button className="btn btn-block btn-primary p-1" type="submit"> {t('ns1:requestPasswordResetButtonLabel')}</button>
                            </div>
                        </div>
                    </form>
                </div>
            </MDBCol>
            <MDBCol sm="1" md="2" xl="3"/>
        </MDBRow>
    );
}

export default connect(null, mapDispatchToProps)(ForgottenPassword);
