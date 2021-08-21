import {MDBCard, MDBCardBody, MDBCol, MDBContainer, MDBRow} from "mdbreact";
import {Link} from "react-router-dom";
import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import {TwoFactorFormProps, TwoFactorLoginRequest} from "./Login";

export default function TwoFactorCodeForm(twoFactorFormProps: TwoFactorFormProps) {
    const {t} = useTranslation();
    const [code, setCode] = useState("");
    const [userRecoveryCode, setUseRecoveryCode] = useState(false);
    const [recoveryCode, setRecoveryCode] = useState("");

    function handleTwoFactorLogin(event: React.FormEvent<EventTarget>) {
        event.preventDefault();
        const loginRequest: TwoFactorLoginRequest = {
            email: twoFactorFormProps.email,
            password: twoFactorFormProps.password,
            rememberMe: twoFactorFormProps.rememberMe,
            code: code
        };
        twoFactorFormProps.loginTwoFactor(loginRequest);
    }

    function handleRecoveryCodeLogin(event: React.FormEvent<EventTarget>) {
        event.preventDefault();
        const loginRequest: TwoFactorLoginRequest = {
            email: twoFactorFormProps.email,
            password: twoFactorFormProps.password,
            rememberMe: twoFactorFormProps.rememberMe,
            code: recoveryCode
        };
        twoFactorFormProps.loginTwoFactor(loginRequest);
    }

    if (userRecoveryCode) {
        return (
            <MDBContainer className="mt-5">
                <MDBRow>
                    <MDBCol md="3"/>
                    <MDBCol md="6">
                        <MDBCard>
                            <MDBCardBody>
                                <p className="h4 text-center">{t('ns1:loginHeading')}</p>
                                <form onSubmit={handleRecoveryCodeLogin}>
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

                                            <button className="btn btn-block btn-primary p-1"
                                                    type="submit">{t('ns1:loginLabel')}</button>
                                        </div>
                                    </div>
                                </form>
                                <span
                                    className="font-weight-light-blue flex-center">
                                    <Link
                                        className="ml-1" onClick={() => {
                                        setUseRecoveryCode(false)
                                    }}
                                        to="#">{t('ns1:backToTwoFactorLoginLabel')}</Link></span>
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

                                            <button className="btn btn-block btn-primary p-1"
                                                    type="submit">{t('ns1:loginLabel')}</button>
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
            </MDBContainer>
        )
    }


}
