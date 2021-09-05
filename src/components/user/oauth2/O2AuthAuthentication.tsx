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
import "./O2AuthAuthentication.css"
import {SocialIcon} from "react-social-icons";
export interface O2AuthAuthenticationProps {
    registration: boolean
}

function O2AuthAuthentication(props: O2AuthAuthenticationProps) {
    const {t,i18n} = useTranslation();
    const iconSize = 35;
    return (
        <div className="d-flex flex-row flex-center o2auth-wrapper">
            <div className="mx-2 o2auth-provider">
                <a href={GOOGLE_AUTH_URL(i18n.language)} onClick={() => {
                    store.dispatch({
                        type: IN_PROGRESS,
                        message: props.registration ? 'Signing up with Google' : 'Logging in with Google'
                    });
                }}>
                    <SocialIcon url="https://google" style={{ height: iconSize, width: iconSize }}/>
                </a></div>
            <div className="mx-2 o2auth-provider">
                <a
                    onClick={() => {
                        store.dispatch({
                            type: IN_PROGRESS,
                            message: props.registration ? 'Signing up with Facebook' : 'Logging in with Facebook'
                        });
                    }} href={FACEBOOK_AUTH_URL(i18n.language)}>
                    <SocialIcon url="https://facebook.com/in/facebook" style={{ height: iconSize, width: iconSize }}/> </a></div>

            <div className="mx-2 o2auth-provider"><a
                onClick={() => {
                    store.dispatch({
                        type: IN_PROGRESS,
                        message: props.registration ? 'Signing up with Github' : 'Logging in with Github'
                    });
                }}
                href={GITHUB_AUTH_URL(i18n.language)}>
                <SocialIcon url="https://github" style={{ height: iconSize, width: iconSize }}/>
            </a></div>

        </div>
    );
}

export interface O2AuthProps {
    registration: boolean;
}

export default connect()(O2AuthAuthentication);
