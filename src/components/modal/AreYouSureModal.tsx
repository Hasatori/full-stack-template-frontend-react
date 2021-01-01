import {MDBBtn, MDBContainer, MDBModal, MDBModalBody, MDBModalFooter, MDBModalHeader} from "mdbreact";
import React from "react";
import {useTranslation} from "react-i18next";
import "./AreYouSureModal.css"
export interface ModalProps {
    isOpen: boolean
    no: () => void
    yes: () => void
    close: () => void
    heading: string
    message: string
}

export default function AreYouSureModal(modalProps: ModalProps) {
    const {t} = useTranslation();
    return (
        <MDBContainer>
            <MDBModal modalStyle="danger" className="text-white" size="md" overflowScroll={false} inline={false}
                      noClickableBodyWithoutBackdrop={false} isOpen={modalProps.isOpen}
                      position="bottom-center"

            >
                <MDBModalHeader className="text-center" titleClass="w-100" toggle={() => {
                    modalProps.close()
                }}>
                    {modalProps.heading}
                </MDBModalHeader>
                <MDBModalBody className="text-center heading">
                    {modalProps.message}
                </MDBModalBody>
                <MDBModalFooter className="justify-content-center">
                    <MDBBtn color="danger" className='text-light' onClick={() => {
                        modalProps.yes()
                    }}>{t('ns1:yesLabel')}</MDBBtn>
                    <MDBBtn color="primary" onClick={() => {
                        modalProps.no()
                    }}>{t('ns1:noLabel')}</MDBBtn>
                </MDBModalFooter>
            </MDBModal>
        </MDBContainer>
    )
}
