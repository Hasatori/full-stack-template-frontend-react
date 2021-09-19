import React from "react";
import {OAUTH2_PROVIDER_LOCAL_STORAGE_NAME, O2AUTH_URL, OAuth2Provider} from "../../../util/Constants";
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
            authUrl: O2AUTH_URL(OAuth2Provider.GOOGLE, i18n.language),
            provider: OAuth2Provider.GOOGLE
        },
        {
            authUrl: O2AUTH_URL(OAuth2Provider.FACEBOOK, i18n.language),
            provider: OAuth2Provider.FACEBOOK
        },
        {
            authUrl: O2AUTH_URL(OAuth2Provider.GITHUB, i18n.language),
            provider: OAuth2Provider.GITHUB
        }
    ]

    return (
        <div className="d-flex flex-row flex-center o2auth-wrapper">
            {providers.map((o2auth)=>{
                return (
                    <div className="mx-2 o2auth-provider">
                        <a href={o2auth.authUrl} onClick={() => {
                            localStorage.setItem(OAUTH2_PROVIDER_LOCAL_STORAGE_NAME, o2auth.provider);
                            store.dispatch({
                                type: IN_PROGRESS,
                                message: props.registration ? i18next.t('ns1:signingUpWithProvider', {providerName: `${o2auth.provider}`}) : i18next.t('ns1:loggingInWithProvider', {providerName: `${o2auth.provider}`})
                            });
                        }}>
                            <SocialIcon network={o2auth.provider}  style={{height: iconSize, width: iconSize}}/>
                        </a></div>
                )
            })}
        </div>
    );
}

export default connect()(O2AuthAuthentication);
