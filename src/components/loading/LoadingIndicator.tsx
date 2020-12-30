import React from 'react';
import {AppProps} from "../../index";
import {CircleLoader} from "react-spinners";
import './LoadingIndicator.css';
import {connect} from "react-redux";

const override = `margin:auto;


`;

function LoadingIndicator(props: AppProps) {
    return (
        <div className={props.loading ? 'loadingBackground visible' : 'hidden'}>
            <div className="loadingWrapper  sweet-loading">
                <CircleLoader
                    css={override}
                    size={150}
                    color={"#123abc"}
                    loading={props.loading}
                />
                <h2 className='loadingMessage'>{props.loadingMessage}</h2>
            </div>
        </div>
    )
}

export default connect()(LoadingIndicator);
