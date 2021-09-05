import {MDBContainer, MDBFooter} from "mdbreact";
import React from "react";
import './Footer.css';
import {store} from "../../index";
import {INFO} from "../../redux/actiontype/GeneralActionTypes";
import {useTranslation} from "react-i18next";
import googlePlayBadge from "../../assets/images/mobilestore/google-play-badge.svg";
import appStoreBadge from "../../assets/images/mobilestore/app-store-badge.svg";

export function Footer() {
    const [t] = useTranslation();
    return (
        <MDBFooter className="footer">
            <div className="footer-copyright text-center py-3 ">
                &copy; {new Date().getFullYear()} Copyright: <strong>fullstack-template-react.herokuapp.com</strong>
            </div>
        </MDBFooter>
    )
}
