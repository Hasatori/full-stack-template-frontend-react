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
    const {t, i18n} = useTranslation();
    const iconSize = 35;
    const providers = [
        {
            authUrl: GOOGLE_AUTH_URL(i18n.language),
            name: 'Google',
            socialIconUlr:'https://google'
        },
        {
            authUrl: FACEBOOK_AUTH_URL(i18n.language),
            name: 'Facebook',
            socialIconUlr:'https://facebook'
        },
        {
            authUrl: GITHUB_AUTH_URL(i18n.language),
            name: 'Github',
            socialIconUlr:'https://github'
        }
    ]

    return (
        <div className="d-flex flex-row flex-center o2auth-wrapper">
            {providers.map((provider)=>{
                return (
                    <div className="mx-2 o2auth-provider">
                        <a href={provider.authUrl} onClick={() => {
                            store.dispatch({
                                type: IN_PROGRESS,
                                message: props.registration ? i18next.t('ns1:signingUpWithProvider', {providerName: `${provider.name}`}) : i18next.t('ns1:loggingInWithProvider', {providerName: `${provider.name}`})
                            });
                        }}>
                            <SocialIcon url={provider.socialIconUlr} style={{height: iconSize, width: iconSize}}/>
                        </a></div>
                )
            })}
        </div>
    );
}

export default connect()(O2AuthAuthentication);
