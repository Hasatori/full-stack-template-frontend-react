import React from 'react';
import {connect} from "react-redux";
import {Redirect, RouteComponentProps} from "react-router";
import {AppProps, store} from "../../../index";
import {successActionCreator} from "../../../redux/actiontype/GeneralActionTypes";
import {getUrlParameter} from "../../../util/ValidationUtils";

function OAuth2RedirectHandler(props: AppProps & RouteComponentProps) {
    const token = getUrlParameter(props.location.search, 'token');
    const expires = getUrlParameter(props.location.search, 'expires');
    const error = getUrlParameter(props.location.search, 'error');
    if (token) {
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
