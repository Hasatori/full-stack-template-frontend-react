import React from 'react';
import {connect} from "react-redux";
import {Redirect, RouteComponentProps} from "react-router";
import {AppProps, store} from "../../../index";
import {getUrlParameter} from "../../../util/APIUtils";
import {successActionCreator} from "../../../redux/actiontype/GeneralActionTypes";
import {isMobile} from 'react-device-detect';

function OAuth2RedirectHandler(props: AppProps & RouteComponentProps) {
    const token = getUrlParameter(props.location.search, 'token');
    const expires = getUrlParameter(props.location.search, 'expires');
    const error = getUrlParameter(props.location.search, 'error');
    /*if (isMobile) {
        window.location.href = "exp://192.168.1.179:19000?token=" + token + "&expires=" + expires + "&error=" + error;
        return <Redirect to={{
            pathname: "/profile",
            state: {from: props.location}
        }}/>;
    } else */if (token) {
        store.dispatch(successActionCreator('Logged in'));
        return <Redirect to={{
            pathname: "/profile",
            state: {from: props.location}
        }}/>;
    } else {
        return <Redirect to={{
            pathname: "/login",
            state: {
                from: props.location,
                error: error
            }
        }}/>;
    }
}

export default connect()(OAuth2RedirectHandler);
