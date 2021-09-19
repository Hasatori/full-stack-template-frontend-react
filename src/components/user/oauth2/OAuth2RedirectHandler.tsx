import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import {Redirect, RouteComponentProps, useLocation} from "react-router";
import {AppProps, store} from "../../../index";
import {doneActionCreator, failureActionCreator, IN_PROGRESS} from "../../../redux/actiontype/GeneralActionTypes";
import {getUrlParameter} from "../../../util/ValidationUtils";
import {LOGIN_SUCCESS} from "../../../redux/actiontype/UserActionTypes";
import TwoFactorCodeForm from "../login/TwoFactorCodeForm";
import {
    OAUTH2_PROVIDER_LOCAL_STORAGE_NAME, OAUTH2_USE_RECOVERY_LOCAL_STORAGE_NAME,
    O2AUTH_URL_RECOVERY,
    O2AUTH_URL_TWO_FACTOR,
    OAuth2Provider, Routes
} from "../../../util/Constants";
import {useTranslation} from "react-i18next";
import i18next from "i18next";
import {useHistory} from "react-router-dom";

function OAuth2RedirectHandler(props: AppProps & RouteComponentProps) {
    const [token] = useState(getUrlParameter(props.location.search, 'access_token'));
    const [error,setError] = useState(getUrlParameter(props.location.search, 'error'));
    const [twoFactorRequired] = useState(getUrlParameter(props.location.search, 'two_factor_required'));
    let [provider] = useState(localStorage.getItem(OAUTH2_PROVIDER_LOCAL_STORAGE_NAME));
    let [useRecovery] = useState(localStorage.getItem(OAUTH2_USE_RECOVERY_LOCAL_STORAGE_NAME) === 'true');
    const {t, i18n} = useTranslation();
    const location = useLocation()
    const history = useHistory()

    useEffect(()=>{
        const queryParams = new URLSearchParams(location.search)
        queryParams.delete("error");
        queryParams.delete('two_factor_required');
        queryParams.delete('provider');
        history.replace({
            search: queryParams.toString(),
        })
    },[])
    if (twoFactorRequired && provider != null && Object.values(OAuth2Provider).map(value => value.toString()).includes(provider)) {
        if (error) {
            store.dispatch(failureActionCreator(error));
            setError("");
        }
        const castedProvider = provider as OAuth2Provider;
        return (
            <TwoFactorCodeForm
                loginTwoFactor={(code) => {
                    localStorage.setItem(OAUTH2_USE_RECOVERY_LOCAL_STORAGE_NAME, 'false');
                    store.dispatch({
                        type: IN_PROGRESS,
                        message: i18next.t('ns1:loggingInWithProvider', {providerName: `${provider}`})
                    });
                    window.location.replace(O2AUTH_URL_TWO_FACTOR(castedProvider, i18n.language, code));
                }}
                loginRecoveryCode={(code ) => {
                    localStorage.setItem(OAUTH2_USE_RECOVERY_LOCAL_STORAGE_NAME, 'true');
                    store.dispatch({
                        type: IN_PROGRESS,
                        message: i18next.t('ns1:loggingInWithProvider', {providerName: `${provider}`})
                    });
                    window.location.replace(O2AUTH_URL_RECOVERY(castedProvider, i18n.language, code));
                }}
                userRecoveryCode={useRecovery}
            />
        )
    } else if (token) {
        store.dispatch(doneActionCreator());
        store.dispatch({type: LOGIN_SUCCESS, accessToken: token})
        localStorage.removeItem(OAUTH2_USE_RECOVERY_LOCAL_STORAGE_NAME);
        localStorage.removeItem(OAUTH2_PROVIDER_LOCAL_STORAGE_NAME);
        return <Redirect to={{
            pathname: Routes.ACCOUNT,
            state: {from: props.location}
        }}/>;
    } else {
        return <Redirect to={{
            pathname: Routes.LOGIN,
            state: {
                from: props.location,
                error: error
            }
        }}/>;
    }
}

export default connect()(OAuth2RedirectHandler);
