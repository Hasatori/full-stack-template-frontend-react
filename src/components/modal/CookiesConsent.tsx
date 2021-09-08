import CookieConsent from "react-cookie-consent";
import React from "react";
import {useTranslation} from "react-i18next";
import "./CookiesConsent.css"
import AreYouSureModal from "./AreYouSureModal";

export function CookiesConsent() {
    const {t} = useTranslation();
    return (
         <CookieConsent
                location="bottom"
                buttonText={t('ns1:closeLabel')}
                buttonClasses={"close-button"}
                cookieName="cookiesConsent"
                style={{'box-shadow': '0 1px 11px rgba(0, 0, 0, 0.27)', color: '#fff'}}
                buttonStyle={{
                    color: "#fff",
                    fontSize: "15px",
                    background: '#0f96f6',
                    'border-radius': '5px',
                    padding: '10px'
                }}
                expires={150}
            >{t('ns1:cookiesConsentMessage')}
            </CookieConsent>
    )
}
