import {MDBFooter} from "mdbreact";
import React from "react";
import './Footer.css';
import {useTranslation} from "react-i18next";

export function Footer() {
    const [t] = useTranslation();
    return (
        <MDBFooter className="footer">
            <div className="footer-copyright text-center py-3 ">Copyright
                &copy;{new Date().getFullYear()} <strong>Oldřich Hradil (hradil.o@email.cz)</strong>
            </div>
        </MDBFooter>
    )
}
