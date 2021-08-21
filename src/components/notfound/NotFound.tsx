import React from 'react';
import {Link} from 'react-router-dom';
import {useTranslation} from "react-i18next";
import {MDBBtn, MDBCard, MDBCardBody, MDBCardText, MDBCardTitle, MDBContainer} from 'mdbreact';
import "../App.css";

function NotFound() {
    const {t} = useTranslation();
    return (
                <MDBCard className="card">
                    <MDBCardBody>
                        <MDBCardTitle className="text-center h1-responsive">404</MDBCardTitle>
                        <MDBCardText className='text-center'>
                            {t('ns1:pageNotFoundMessage')}
                        </MDBCardText>
                        <Link to="/">
                            <MDBBtn className="flex-center" color="primary" href="#">{t('ns1:goBackButton')}</MDBBtn>
                        </Link>
                    </MDBCardBody>
                </MDBCard>
    );
}

export default NotFound;
