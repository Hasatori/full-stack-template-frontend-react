import React from 'react';
import './Account.css';
import ChangePassword from "./ChangePassword";
import TwoFactorSetup from "./TwoFactorSetup";
import {connect} from "react-redux";
import CloseAccount from "./CloseAccount";
import Profile from "./Profile";
import {useTranslation} from "react-i18next";
import {MDBCol, MDBRow} from "mdbreact";


function Account() {
    const {t} = useTranslation();
    return (
        <MDBRow>
            <MDBCol lg="1"/>
            <MDBCol  md="12" lg="10">
                <h5 className='text-center  '>{t('ns1:manageProfileHeading')}</h5>
                <Profile {...{} as any}/>
                <ChangePassword {...{} as any}/>
                <TwoFactorSetup {...{} as any}/>
                <CloseAccount/>
            </MDBCol>
            <MDBCol  lg="1"/>
        </MDBRow>
    );

}

export default connect()(Account);

