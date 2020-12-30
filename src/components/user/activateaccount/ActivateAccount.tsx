import {Redirect, RouteComponentProps} from "react-router";
import React from "react";
import {connect} from "react-redux";
import {AccountActivationRequest, getUrlParameter} from "../../../util/APIUtils";
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";
import {activateAccount} from "../../../redux/actiontype/UserActionTypes";


function mapDispatchToProps(dispatch: ThunkDispatch<any, any, AnyAction>) {
    return {
        activateAccount: (accountActivationRequest: AccountActivationRequest) => dispatch(activateAccount(accountActivationRequest))
    };
};

interface ActivateAccountProps {
    activateAccount: (accountActivationRequest: AccountActivationRequest) => void
}

function ActivateAccount(props: ActivateAccountProps & RouteComponentProps) {
    const token = getUrlParameter(window.location.search, 'token');
    props.activateAccount({token: token});
    return <Redirect to={{
        pathname: "/login",
        state: {
            from: props.location,
            state: {from: props.location}
        }
    }}/>
}

export default connect(null, mapDispatchToProps)(ActivateAccount)
