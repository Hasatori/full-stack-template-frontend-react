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
        <MDBFooter className="font-small pt-4 mt-4 border-top">
            <MDBContainer fluid className="text-center text-md-right">
                <div className='d-flex flex-column'>
                    <div className='d-flex flex-row justify-content-center'>
                        <div className='d-flex mx-2'>
                            <img width={150}
                                 onClick={() => store.dispatch({type: INFO, message: t("ns1:functionNotImplemented")})}
                                 src={googlePlayBadge}/>
                        </div>
                        <div className='d-flex mx-2'>
                            <img width={150} onClick={() => store.dispatch({
                                type: INFO,
                                message: t("ns1:functionNotImplemented")
                            })} src={appStoreBadge}/>
                        </div>
                    </div>
                </div>
            </MDBContainer>
            <div className="footer footer-copyright text-center py-3 ">
                &copy; {new Date().getFullYear()} Copyright: <a
                href="https://fullstack-template-react.herokuapp.com/">fullstack-template-react.herokuapp.com</a>
            </div>
        </MDBFooter>
    )
}
