import {Redirect, RouteComponentProps} from "react-router";
import React from "react";
import {connect} from "react-redux";
import {AccountActivationRequest} from "../../../util/APIUtils";
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";
import {confirmEmailChange} from "../../../redux/actiontype/UserActionTypes";
import {getUrlParameter} from "../../../util/ValidationUtils";


function mapDispatchToProps(dispatch: ThunkDispatch<any, any, AnyAction>) {
    return {
        confirmEmailChange: (accountActivationRequest: AccountActivationRequest) => dispatch(confirmEmailChange(accountActivationRequest))
    };
};

interface ActivateAccountProps {
    confirmEmailChange: (accountActivationRequest: AccountActivationRequest) => void
}

function ConfirmEmailChange(props: ActivateAccountProps & RouteComponentProps) {
    const token = getUrlParameter(window.location.search, 'token');
    props.confirmEmailChange({token: token});
    return <Redirect to={{
        pathname: "/login",
        state: {
            from: props.location,
            state: {from: props.location}
        }
    }}/>
}

export default connect(null, mapDispatchToProps)(ConfirmEmailChange)
