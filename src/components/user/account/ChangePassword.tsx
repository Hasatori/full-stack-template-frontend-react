import * as React from "react";
import {useState} from "react";
import {connect} from "react-redux";
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";
import {changePassword, forgottenPasswordRequest} from "../../../redux/actiontype/UserActionTypes";
import {MDBAlert, MDBBtn} from "mdbreact";
import {useTranslation} from "react-i18next";
import {Input} from "../../form/Input";
import {arePasswordsSame, isPasswordValid} from "../../../util/ValidationUtils";
import {AppState} from "../../../redux/store/Store";
import {User} from "../../App";


function mapDispatchToProps(dispatch: ThunkDispatch<any, any, AnyAction>) {
    return {
        changePassword: (changePasswordRequest: ChangePasswordRequest) => dispatch(changePassword(changePasswordRequest)),
        forgottenPasswordRequest: (email: string) => dispatch(forgottenPasswordRequest(email))
    };
};


function mapStateToProps(state: AppState, props: ChangePasswordProps) {
    return {
        user: state.userState.currentUser
    }
}

interface ChangePasswordProps {
    changePassword: (changePasswordRequest: ChangePasswordRequest) => void,
    user: User,
    forgottenPasswordRequest: (email: string) => void;
}

function ChangePassword(props: ChangePasswordProps) {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordValidationStarted, setNewPasswordValidationStarted] = useState(false);
    const [newPasswordValid, setNewPasswordValid] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [confirmPasswordValidationStarted, setConfirmPasswordValidationStarted] = useState(false);
    const [confirmPasswordValid, setConfirmPasswordValid] = useState(false);
    const [newPasswordRequested,setNewPasswordRequested]  = useState(false);
    const {t} = useTranslation();

    function handleSubmit(event: React.FormEvent<EventTarget>) {
        event.preventDefault();
        if (newPasswordValid && confirmPasswordValid) {
            props.changePassword({currentPassword: currentPassword, newPassword: newPassword});
        }
    }

    return (


        <div className='row py-5 px-3'>
            <div className='col-md-4 col-sm-12 mb-3'>
                <div className='text-primary'>    {t('ns1:passwordHeading')}</div>
                <div className='small'>{t('ns1:passwordDescription')}</div>
            </div>

            <div className='col-md-4 col-sm-12'>
                {props.user.o2AuthInfo?.needToSetPassword ?
                    <MDBBtn color="primary"
                            onClick={() => {setNewPasswordRequested(prevState => true);props.forgottenPasswordRequest(props.user.email)}} disabled={newPasswordRequested}>{newPasswordRequested?t('ns1:newPasswordRequested'):t('ns1:requestNewPassword')}</MDBBtn>
                    :
                    <form onSubmit={handleSubmit}>
                        <Input
                            id={"password"}
                            type="password"
                            label={t("ns1:currentPasswordLabel")}
                            value={currentPassword}
                            valid={true}
                            validationStarted={false}
                            onChange={(event) => {
                                setCurrentPassword(event.target.value);
                            }}
                            required={true}
                            invalidValueMessage={t('ns1:invalidPasswordFormatMessage')}
                        />
                        <Input
                            id={"newPassword"}
                            type="password"
                            label={t("ns1:newPasswordLabel")}
                            value={newPassword}
                            valid={newPasswordValid}
                            validationStarted={newPasswordValidationStarted}
                            onChange={(event) => {
                                setNewPasswordValidationStarted(true);
                                setConfirmPasswordValidationStarted(true)
                                setNewPasswordValid(isPasswordValid(event.target.value));
                                setNewPassword(event.target.value);
                            }}
                            required={true}
                            invalidValueMessage={t('ns1:invalidPasswordFormatMessage')}
                        />
                        <Input
                            id={"confirmPassword"}
                            type="password"
                            label={t('ns1:confirmPasswordLabel')}
                            value={confirmPassword}
                            valid={confirmPasswordValid}
                            validationStarted={confirmPasswordValidationStarted}
                            onChange={(event) => {
                                setConfirmPasswordValidationStarted(true);
                                setConfirmPasswordValid(arePasswordsSame(newPassword, event.target.value));
                                setConfirmPassword(event.target.value);
                            }}
                            required={true}
                            invalidValueMessage={t('ns1:passwordsDoNotMatchMessage')}

                        />

                        <div className="form-item mt-3 save text-center">
                            <MDBBtn color="primary" type='submit'
                                    disabled={!confirmPasswordValid || !confirmPasswordValidationStarted || !newPasswordValid || !newPasswordValidationStarted}>     {t('ns1:saveButtonLabel')}</MDBBtn>
                        </div>
                    </form>
                }

            </div>
        </div>

    )
}

export interface ChangePasswordRequest {

    currentPassword: string;
    newPassword: string;
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
