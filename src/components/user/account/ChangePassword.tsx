import * as React from "react";
import {useState} from "react";
import {connect} from "react-redux";
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";
import {changePassword} from "../../../redux/actiontype/UserActionTypes";
import {getFormControlClass, isPasswordValid} from "../../../util/APIUtils";
import {MDBBtn} from "mdbreact";
import {useTranslation} from "react-i18next";


function mapDispatchToProps(dispatch: ThunkDispatch<any, any, AnyAction>) {
    return {
        changePassword: (changePasswordRequest: ChangePasswordRequest) => dispatch(changePassword(changePasswordRequest)),
    };
};

interface ChangePasswordProps {
    changePassword: (changePasswordRequest: ChangePasswordRequest) => void
}

function ChangePassword(props: ChangePasswordProps) {
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordValidationStarted, setNewPasswordValidationStarted] = useState(false);
    const [newPasswordValid, setNewPasswordValid] = useState(false);
    const [passwordConfirmed, setPasswordConfirmed] = useState('');
    const [passwordConfirmedValidationStarted, setPasswordConfirmedValidationStarted] = useState(false);
    const [passwordConfirmedValid, setPasswordConfirmedValid] = useState(false);
    const {t} = useTranslation();

    function handleSubmit(event: React.FormEvent<EventTarget>) {
        event.preventDefault();
        if (newPasswordValid && passwordConfirmedValid) {
            props.changePassword({currentPassword: password, newPassword: newPassword});
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className='row py-5 px-3'>
                <div className='col-md-4 col-sm-12'>
                    <div className='text-primary'>    {t('ns1:passwordHeading')}</div>
                    <div className='small'>{t('ns1:passwordDescription')}</div>
                </div>

                <div className='col-md-4 col-sm-12'>
                    <label
                        htmlFor="password"
                        className="grey-text font-weight-light"
                    >
                        {t('ns1:currentPasswordLabel')}
                    </label>
                    <div className="form-item">
                        <input type="password" name="password"
                               className='form-control'
                               defaultValue={password}
                               value={password} onChange={(event) => {
                            setPassword(event.target.value);
                        }}
                               required/>
                    </div>
                    <label
                        htmlFor="newPassword"
                        className="grey-text font-weight-light"
                    >
                        {t('ns1:newPasswordLabel')}
                    </label>
                    <div className="form-item">
                        <input type="password" name="newPassword"
                               className={getFormControlClass(newPasswordValidationStarted, newPasswordValid)}
                               value={newPassword} onChange={(event) => {
                            setNewPasswordValidationStarted(true);
                            setPasswordConfirmedValidationStarted(true);
                            setNewPasswordValid(isPasswordValid(event.target.value));
                            setPasswordConfirmedValid(passwordConfirmed === event.target.value);
                            setNewPassword(event.target.value);

                        }} required/>
                        <div className="invalid-feedback text-left">
                            {t('ns1:invalidPasswordFormatMessage')}
                        </div>
                    </div>
                    <label
                        htmlFor="password"
                        className="grey-text font-weight-light"
                    >
                        {t('ns1:confirmPasswordLabel')}
                    </label>
                    <div className="form-item">
                        <input type="password" name="newPassword"
                               className={getFormControlClass(passwordConfirmedValidationStarted, passwordConfirmedValid)}

                               value={passwordConfirmed} onChange={(event) => {
                            setPasswordConfirmedValidationStarted(true);
                            setPasswordConfirmedValid(event.target.value === newPassword);
                            setPasswordConfirmed(event.target.value);

                        }} required/>
                        <div className="invalid-feedback text-left">
                            {t('ns1:passwordsDoNotMatchMessage')}
                        </div>
                    </div>

                    <div className="form-item mt-3 save text-center">
                        <MDBBtn color="primary" type='submit'
                                disabled={!passwordConfirmedValid || !passwordConfirmedValidationStarted || !newPasswordValid || !newPasswordValidationStarted}>     {t('ns1:saveButtonLabel')}</MDBBtn>
                    </div>
                </div>
            </div>
        </form>
    )

}

export interface ChangePasswordRequest {

    currentPassword: string;
    newPassword: string;
}

export default connect(null, mapDispatchToProps)(ChangePassword);
