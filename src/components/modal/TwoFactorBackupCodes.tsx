import {useState} from "react";
import {useTranslation} from "react-i18next";
import {
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
import * as React from "react";
import "./TwoFactorBackupCodes.css"

export interface ModalProps {
    codes: Array<string>;
    show: boolean;
    onClose: () => void,
    email:string

}

export function TwoFactorBackupCodes(modalProps: ModalProps) {
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
                    <MDBInput className='text-codes-area' type="textarea" label="Codes" outline value={codesString} rows={16}
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
                                link.download = `full-stack-template_${modalProps.email}_backup_codes`;
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
