import React from 'react';
import {Link} from 'react-router-dom';
import {useTranslation} from "react-i18next";
import {MDBBtn, MDBCard, MDBCardBody, MDBCardText, MDBCardTitle} from 'mdbreact';
import "../App.css";
import {Routes} from "../../util/Constants";

function NotFound() {
    const {t} = useTranslation();
    return (
                <MDBCard className="card">
                    <MDBCardBody>
                        <MDBCardTitle className="text-center h1-responsive">404</MDBCardTitle>
                        <MDBCardText className='text-center'>
                            {t('ns1:pageNotFoundMessage')}
                        </MDBCardText>
                        <Link to={Routes.ABOUT1}>
                            <MDBBtn className="flex-center" color="primary" href="#">{t('ns1:goBackButton')}</MDBBtn>
                        </Link>
                    </MDBCardBody>
                </MDBCard>
    );
}

export default NotFound;
