import React from 'react';
import {connect} from "react-redux";
import {Redirect, RouteComponentProps} from "react-router";
import {AppProps, store} from "../../../index";
import {doneActionCreator, successActionCreator} from "../../../redux/actiontype/GeneralActionTypes";
import {getUrlParameter} from "../../../util/ValidationUtils";
import {LOGIN_SUCCESS} from "../../../redux/actiontype/UserActionTypes";

function OAuth2RedirectHandler(props: AppProps & RouteComponentProps) {
    const token = getUrlParameter(props.location.search, 'access_token');
    if (token) {
        store.dispatch(doneActionCreator());
        store.dispatch({type:LOGIN_SUCCESS,accessToken:token})
        return <Redirect to={{
            pathname: "/account",
            state: {from: props.location}
        }}/>;
    } else {
        return <Redirect to={{
            pathname: "/login",
            state: {
                from: props.location
            }
        }}/>;
    }
}

export default connect()(OAuth2RedirectHandler);
