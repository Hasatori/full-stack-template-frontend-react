import googleLogo from "../../../assets/images/logos/google-logo.png";
import fbLogo from "../../../assets/images/logos/fb-logo.png";
import githubLogo from "../../../assets/images/logos/github-logo.png";
import React from "react";
import {FACEBOOK_AUTH_URL, GITHUB_AUTH_URL, GOOGLE_AUTH_URL} from "../../../util/Constants";
import {connect} from "react-redux";
import {store} from "../../../index";
import {IN_PROGRESS} from "../../../redux/actiontype/GeneralActionTypes";
import i18next from "i18next";
import {useTranslation} from "react-i18next";

export interface O2AuthAuthenticationProps {
    registration: boolean
}

function O2AuthAuthentication(props: O2AuthAuthenticationProps) {
    const {t,i18n} = useTranslation();
    return (
        <div className="d-flex flex-row flex-center">
            <div className="mx-2">
                <a href={GOOGLE_AUTH_URL(i18n.language)} onClick={() => {
                    store.dispatch({
                        type: IN_PROGRESS,
                        message: props.registration ? 'Signing up with Google' : 'Logging in with Google'
                    });
                }}>
                    <img className="rounded hoverable" width={30} height={30} src={googleLogo}
                         alt="Google"/>
                </a></div>
            <div className="mx-2">
                <a
                    onClick={() => {
                        store.dispatch({
                            type: IN_PROGRESS,
                            message: props.registration ? 'Signing up with Facebook' : 'Logging in with Facebook'
                        });
                    }} href={FACEBOOK_AUTH_URL(i18n.language)}>
                    <img className="rounded hoverable" src={fbLogo} width={25} height={25}
                         alt="Facebook"/> </a></div>

            <div className="mx-2"><a
                onClick={() => {
                    store.dispatch({
                        type: IN_PROGRESS,
                        message: props.registration ? 'Signing up with Github' : 'Logging in with Github'
                    });
                }}
                href={GITHUB_AUTH_URL(i18n.language)}>
                <img className="rounded hoverable" width={25} height={25} src={githubLogo}
                     alt="Github"/>
            </a></div>

        </div>
    );
}

export interface O2AuthProps {
    registration: boolean;
}

export default connect()(O2AuthAuthentication);
