import {connect} from "react-redux";
import React, {useState} from "react";
import {MDBBtn} from "mdbreact";
import AreYouSureModal from "../../modal/AreYouSureModal";
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";
import {cancelAccount} from "../../../redux/actiontype/UserActionTypes";
import {useTranslation} from "react-i18next";


function mapDispatchToProps(dispatch: ThunkDispatch<any, any, AnyAction>) {
    return {
        cancelAccount: () => dispatch(cancelAccount()),
    };
};

interface CloseAccountProps {
    cancelAccount: () => void
}

function CloseAccount(props: CloseAccountProps) {
    const [modalOpen, setModalOpen] = useState(false);
    const {t} = useTranslation();
    return (
        <div className='row py-5 px-3'>
            <div className='col-md-4 col-sm-12 mb-3'>
                <div className='text-danger'>{t('ns1:closeAccountHeading')}</div>
                <div className='small'>{t('ns1:closeAccountDescription')}</div>
            </div>

            <div className='col-md-4 col-sm-12'>
                <MDBBtn  color="danger" className='text-light' onClick={() => {
                    setModalOpen(true)
                }}>{t('ns1:closeAccountHeading')}</MDBBtn>
            </div>
            <AreYouSureModal
                isOpen={modalOpen}
                yes={() => {
                    props.cancelAccount();
                    setModalOpen(false);
                }}
                no={() => {
                    setModalOpen(false)
                }}
                close={() => {
                    setModalOpen(false)
                }}
                message={t('ns1:closeAccountAreYouSureMessage')}
                heading={t('ns1:closeAccountAreYouSureHeading')}
            />
        </div>
    )
}

export default connect(null, mapDispatchToProps)(CloseAccount)
