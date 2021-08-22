import React, {useState} from "react";
import {connect} from "react-redux";
import {forgottenPasswordRequest} from "../../../redux/actiontype/UserActionTypes";
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";
import {useTranslation} from "react-i18next";
import {MDBCard, MDBCardBody} from "mdbreact";
import {Input} from "../../form/Input";
import "../../App.css"
import {isEmailValid} from "../../../util/ValidationUtils";

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
        <MDBCard className="card">
            <MDBCardBody className="p-5">
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
            </MDBCardBody>
        </MDBCard>
    );
}

export default connect(null, mapDispatchToProps)(ForgottenPassword);
