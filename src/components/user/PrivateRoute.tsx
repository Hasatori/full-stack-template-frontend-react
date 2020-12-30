import React from 'react';
import {Redirect, Route} from "react-router-dom";
import {RouteProps, useLocation} from 'react-router';


export const PrivateRoute: React.FC<ProtectedRouteProps> = props => {
    const currentLocation = useLocation();
    let redirectPath = props.redirectPathOnAuthentication;
    if (!props.authenticated) {
        redirectPath = props.authenticationPath;
    }
    if (redirectPath !== currentLocation.pathname) {
        const renderComponent = () => <Redirect to={{pathname: redirectPath}}/>;
        return <Route {...props} component={renderComponent} render={undefined}/>;
    } else {
        return <Route {...props} />;
    }
};

export interface ProtectedRouteProps extends RouteProps {
    authenticated: boolean;
    authenticationPath: string;
    redirectPathOnAuthentication: string;
}
