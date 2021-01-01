import React from 'react';
import './Account.css';
import ChangePassword from "./ChangePassword";
import TwoFactorSetup from "./TwoFactorSetup";
import {connect} from "react-redux";
import CloseAccount from "./CloseAccount";
import Profile from "./Profile";
import {useTranslation} from "react-i18next";


function Account() {
    const {t} = useTranslation();
    return (

        <div>
            <div className="container mt-5">
                <h5 className='text-center  '>{t('ns1:manageProfileHeading')}</h5>
                <Profile {...{} as any}/>
                <div className='divider'/>
                <ChangePassword {...{} as any}/>
                <div className='divider'/>
                <TwoFactorSetup {...{} as any}/>
                <div className='divider'/>
                <CloseAccount/>
            </div>
        </div>
    );

}

export default connect()(Account);

