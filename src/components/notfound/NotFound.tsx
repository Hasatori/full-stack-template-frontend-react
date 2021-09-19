import React from 'react';
import {Link, useHistory} from 'react-router-dom';
import {useTranslation} from "react-i18next";
import {MDBBtn, MDBCard, MDBCardBody, MDBCardText, MDBCardTitle} from 'mdbreact';
import "../App.css";
import {Routes} from "../../util/Constants";

function NotFound() {
    const {t} = useTranslation();
    const history = useHistory();
    return (
                <MDBCard className="card">
                    <MDBCardBody>
                        <MDBCardTitle className="text-center h1-responsive">404</MDBCardTitle>
                        <MDBCardText className='text-center'>
                            {t('ns1:pageNotFoundMessage')}
                        </MDBCardText>
                            <button className="btn btn-block btn-primary" onClick={()=>{history.push(Routes.ABOUT1)}} >{t('ns1:goBackButton')}</button>
                    </MDBCardBody>
                </MDBCard>
    );
}

export default NotFound;
