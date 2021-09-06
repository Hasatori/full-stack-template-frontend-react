import * as React from "react";
import {useState} from "react";
import Alert from "react-s-alert";

import "./Account.css";
import 'reactjs-popup/dist/index.css';
import {
    MDBAlert,
    MDBBtn,
    MDBContainer,
    MDBIcon,
    MDBInput,
    MDBModal,
    MDBModalBody,
    MDBModalFooter,
    MDBModalHeader
} from "mdbreact";
import CopyToClipboard from "react-copy-to-clipboard";
import {connect} from "react-redux";
import {useTranslation} from "react-i18next";
import {AppState} from "../../../redux/store/Store";
import {
    disableTwoFactor,
    EMPTY_BACKUP_CODES,
    enableTwoFactor
} from "../../../redux/actiontype/UserActionTypes";
import {AnyAction} from "redux";
import {ThunkDispatch} from "redux-thunk";
import {store} from "../../../index";
import API from "../../../util/APIUtils";

interface TwoFactorProps {
    twoFactorEnabled: boolean,
    backupCodes: string[],
    enableTwoFactor: (verifyTwoFactor: VerifyTwoFactor) => void,
    disableTwoFactor: () => void,
    getNewBackupCodes: () => void,
    isO2AuthAccount: boolean
}

function mapStateToProps(state: AppState, props: TwoFactorProps) {
    return {
        twoFactorEnabled: state.userState.currentUser.twoFactorEnabled,
        backupCodes: state.userState.currentUser.backupCodes,
        isO2AuthAccount: state.userState.currentUser.o2AuthInfo !== null
    }
}

function mapDispatchToProps(dispatch: ThunkDispatch<any, any, AnyAction>) {
    return {
        enableTwoFactor: (verifyTwoFactor: VerifyTwoFactor) => dispatch(enableTwoFactor(verifyTwoFactor)),
        disableTwoFactor: () => dispatch(disableTwoFactor())
    };
};

function TwoFactorSetup(props: TwoFactorProps) {
    const [twoFactorSetup, setTwoFactorSetup] = useState<TwoFactorSetup>();
    const [verificationCode, setVerificationCode] = useState('');
    const {t} = useTranslation();
    function getTwoFactorSetup() {
        API({
            url: process.env.REACT_APP_REST_API_URL + "/two-factor-setup",
            method: 'POST'
        }).then(response => {
            console.log(response);
            setTwoFactorSetup({...response.data})
        }).catch(error => {
            Alert.error((error && error.message) || 'Oops! Something went wrong. Please try again!');
        });
    }

    function handleSubmit(event: React.FormEvent<EventTarget>) {
        event.preventDefault();
        props.enableTwoFactor({code: verificationCode});
    }

    return (
        <div className='row py-5 px-3'>
            <div className='col-md-4 col-sm-12 mb-3'>
                <div className='text-primary'>{t('ns1:twoFactorAuthenticationLabel')}</div>
                <div className='small'>{t('ns1:twoFactorAuthenticationDescription')}</div>
            </div>

            <div className='col-md-6 col-sm-12'>
                <div className='d-flex flex-column'>
                    {props.twoFactorEnabled ?
                        <>
                            {props.backupCodes ? <Modal codes={props.backupCodes}
                                                        show={props.backupCodes && props.backupCodes.length > 0}
                                                        onClose={() => {
                                                            store.dispatch({type: EMPTY_BACKUP_CODES})
                                                        }}/> : <></>}

                            <div className='d-flex flex-row'>
                                <div className='d-flex flex-center'><MDBAlert className="alert-success">
                                    {t('ns1:twoFactorAuthenticationEnabledMessage')}
                                </MDBAlert></div>
                                <div className='d-flex flex-center'><MDBBtn
                                                                            onClick={() => props.disableTwoFactor()}
                                                                            className='btn-danger'>{t('ns1:disableButton')}</MDBBtn>
                                </div>
                            </div>

                        </>
                        : twoFactorSetup == null ?
                            <div className='d-flex flex-column'>
                                <div><MDBBtn color="primary" disabled={props.isO2AuthAccount}
                                             onClick={getTwoFactorSetup}>{t('ns1:enableTwoFactorAuthenticationButton')}</MDBBtn>
                                </div>
                                {props.isO2AuthAccount ?
                                    <div><MDBAlert className="alert-info">{t('ns1:notAvailableForO2AuthAccount')}</MDBAlert></div>
                                    : <></>
                                }
                            </div>
                            : <>
                                <form onSubmit={handleSubmit}>
                                    <label
                                        htmlFor="password"
                                        className="grey-text font-weight-light flex-center"
                                    >
                                        {t('ns1:twoFactorAuthenticationScanQRInstruction')}
                                    </label>
                                    <div className='flex-center'><img
                                        src={`data:${twoFactorSetup.mimeType};base64,${twoFactorSetup.qrData}`}
                                        className="flex-center img-fluid"/></div>


                                    <label htmlFor="verificationCode" className="grey-text">
                                        {t('ns1:verificationCodeLabel')}
                                    </label>
                                    <input type="text" id="verificationCode" className="form-control"
                                           value={verificationCode}
                                           onChange={(event) => setVerificationCode(event.target.value)}/>
                                    <br/>
                                    <div className="form-item mt-3 save text-center">
                                        <MDBBtn color="primary" type='submit'> {t('ns1:enableButton')}</MDBBtn>
                                    </div>
                                </form>
                            </>

                    }
                </div>

            </div>
        </div>

    )


}

interface ModalProps {
    codes: Array<string>;
    show: boolean;
    onClose: () => void

}

export function Modal(modalProps: ModalProps) {
    const codesString = modalProps.codes.join('\n');
    const [copied, setCopied] = useState(false);
    const {t} = useTranslation();
    return (
        <MDBContainer>
            <MDBModal overflowScroll={false} inline={false} noClickableBodyWithoutBackdrop={false}
                      isOpen={modalProps.show}
                      position="top-center">
                <MDBModalHeader>{t('ns1:twoFactorAuthenticationSaveBackupCodesHeading')}</MDBModalHeader>
                <MDBModalBody>
                    <MDBInput type="textarea" label="Codes" outline value={codesString} rows={16}
                              style={{resize: 'none'}}/>
                </MDBModalBody>
                <MDBModalFooter>
                    <CopyToClipboard text={codesString}>
                        <MDBBtn size={"sm"} color={copied ? 'success' : 'primary'} onClick={() => {
                            setCopied(true);
                        }}>     {copied ? t('ns1:copiedLabel') : t('ns1:copyToClipboardLabel')}</MDBBtn>
                    </CopyToClipboard>
                    <MDBBtn size={"sm"} color="primary"
                            onClick={() => {
                                let link = document.createElement("a");
                                const data = new Blob([codesString], {type: 'text/plain'});
                                link.href = URL.createObjectURL(data);
                                link.download = 'backup_codes_txt';
                                link.click();
                                URL.revokeObjectURL(link.href);
                            }}

                    > <MDBIcon icon="download"/>{t('ns1:downloadSomethingLabel')}</MDBBtn>
                    <MDBBtn size={"sm"} color="danger" onClick={() => {
                        modalProps.onClose();
                    }}>{t('ns1:closeLabel')}</MDBBtn>

                </MDBModalFooter>
            </MDBModal>
        </MDBContainer>
    )
}

export interface TwoFactorSetup {
    qrData: string;
    mimeType: string;
}

export interface VerifyTwoFactor {
    code: string
}

export default connect(mapStateToProps, mapDispatchToProps)(TwoFactorSetup);
