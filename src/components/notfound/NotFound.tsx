import React from 'react';
import './NotFound.css';
import {Link} from 'react-router-dom';
import {useTranslation} from "react-i18next";

function NotFound() {
    const {t} = useTranslation();
    return (
        <div className="page-not-found">
            <h1 className="title">
                404
            </h1>
            <div className="desc">
                {t('ns1:pageNotFoundMessage')}
            </div>
            <Link to="/">
                <button className="go-back-btn btn btn-primary" type="button"> {t('ns1:goBackButton')}</button>
            </Link>
        </div>
    );
}

export default NotFound;
