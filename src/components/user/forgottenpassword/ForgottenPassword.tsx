import React, {useState} from "react";
import {connect} from "react-redux";
import {forgottenPasswordRequest} from "../../../redux/actiontype/UserActionTypes";
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";
import {useTranslation} from "react-i18next";

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
    const {t} = useTranslation();

    function handleSubmit(event: React.FormEvent<EventTarget>) {
        event.preventDefault();
        props.forgottenPasswordRequest(email);
    }

    return (
        <div className="login-container">
            <div className="login-content">
                <h1 className="login-title">{t('ns1:forgottenPasswordHeading')}</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-item">
                        <input type="email" name="email"
                               className="form-control" placeholder={t('ns1:emailLabel')}
                               value={email} onChange={(event) => setEmail(event.target.value)} required/>
                    </div>
                    <div className="form-item">
                        <button type="submit"
                                className="btn btn-block btn-primary"> {t('ns1:requestPasswordResetButtonLabel')}</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default connect(null, mapDispatchToProps)(ForgottenPassword);
