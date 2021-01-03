import {MDBContainer, MDBFooter} from "mdbreact";
import React, {useState} from "react";
import './Footer.css';
import instagram from "../../assets/images/logos/instagram-logo.png";
import fbLogo from "../../assets/images/logos/fb-logo.png";
import twitter from "../../assets/images/logos/twitter-logo.png";
import {Toast} from "react-toastify/dist/components";
import {store} from "../../index";
import {INFO} from "../../redux/actiontype/GeneralActionTypes";
import {useTranslation} from "react-i18next";

export function Footer() {
    const logoSize = 35;
    const [t]=useTranslation();
    return (
        <MDBFooter className="font-small pt-4 mt-4 border-top">
            <MDBContainer fluid className="text-center text-md-right">
                <div className='d-flex flex-column'>
                    <div className="d-flex flex-row flex-center">
                        <div className="mx-2">
                            <a>
                                <img className="rounded hoverable" width={logoSize} height={logoSize} src={instagram}
                                     alt="Instagram"/>
                            </a></div>
                        <div className="mx-2">
                            <a>
                                <img className="rounded hoverable" src={fbLogo} width={logoSize} height={logoSize}
                                     alt="Facebook"/> </a></div>

                        <div className="mx-2"><a>
                            <img className="rounded hoverable" width={logoSize} height={logoSize} src={twitter}
                                 alt="Twitter"/>
                        </a></div>

                    </div>

                    <div className='d-flex flex-row justify-content-center'>

                        <div className='d-flex mx-2'>
                        <img  width={150} onClick={() => store.dispatch({type:INFO,message:t("ns1:functionNotImplemented")})}
                             src={require("../../assets/images/mobilestore/google-play-badge.svg")}/>
                        </div>
                        <div className='d-flex mx-2'><img width={150}
                                                          onClick={() => store.dispatch({type:INFO,message:t("ns1:functionNotImplemented")})}
                                                          src={require("../../assets/images/mobilestore/app-store-badge.svg")}/>
                        </div>
                    </div>
                </div>


            </MDBContainer>
            <div className="footer footer-copyright text-center py-3 ">
                <MDBContainer fluid>
                    &copy; {new Date().getFullYear()} Copyright: <a
                    href="https://www.mdbootstrap.com"> FullStackTemplate.com </a>
                </MDBContainer>
            </div>
        </MDBFooter>
    )
}
