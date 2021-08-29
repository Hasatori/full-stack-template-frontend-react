import {connect} from "react-redux";
import React, {ChangeEvent, useState} from "react";
import {RouteComponentProps} from "react-router-dom";
import {ProfileImage, User} from "../../App";
import {AppState} from "../../../redux/store/Store";
import {MDBBtn} from "mdbreact";
import {useTranslation} from "react-i18next";
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";
import {updateProfile} from "../../../redux/actiontype/UserActionTypes";
import {Input} from "../../form/Input";
import {isEmailValid} from "../../../util/ValidationUtils";
import {store} from "../../../index";
import {failureActionCreator} from "../../../redux/actiontype/GeneralActionTypes";
import i18next from "i18next";

export interface ProfileProps extends RouteComponentProps {
    user: User,
    updateProfile: (updateProfileRequest: User) => void
}

function mapStateToProps(state: AppState, props: ProfileProps) {
    return {
        user: state.userState.currentUser
    }
}

function mapDispatchToProps(dispatch: ThunkDispatch<any, any, AnyAction>) {
    return {
        updateProfile: (updateProfileRequest: User) => dispatch(updateProfile(updateProfileRequest)),
    };
};


function Profile(props: ProfileProps) {
    let user: User = props.user;
    let [file, setFile] = useState<ProfileImage>(user.profileImage);
    let [email, setEmail] = useState(user.email);
    const [emailValidationStarted, setEmailValidationStarted] = useState(false);
    const [emailValid, setEmailValid] = useState(isEmailValid(user.email));
    let [name, setName] = useState(user.name);
    let [nameValid, setNameValid] = useState(false);
    let [nameValidationStarted, setNameValidationStarted] = useState(false);
    const {t} = useTranslation();

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        event.preventDefault();
        let files = event.target.files;
        if (files !== null) {
            const newProfileFile = files[0];
            const allowedTypes = [
                {extension: "jpg", mimeType: "image/jpeg"},
                {extension: "png", mimeType: "image/png"}
            ];
            const maxSize: number = 10000000;
            if (newProfileFile.size > maxSize) {
                store.dispatch(failureActionCreator(i18next.t('ns1:invalidFileSize', {maxFileSize: `${Math.ceil(maxSize / 1000000)} MB`})));
            } else if (!allowedTypes.map(type => type.mimeType).includes(newProfileFile.type)) {
                store.dispatch(failureActionCreator(i18next.t('ns1:invalidFileType', {fileTypes: `[ ${allowedTypes.map(type => type.extension).join(", ")} ]`})));
            } else {
                let reader = new FileReader();
                reader.onload = () => {
                    setFile({
                        data: reader.result?.toString().split(",")[1],
                        type: newProfileFile?.type,
                        name: file.name,
                        id: file.id
                    })
                };
                reader.readAsDataURL(newProfileFile)
            }
        }
    }

    function handleSubmit(event: React.FormEvent<EventTarget>) {
        event.preventDefault();
        if (emailValid)
            props.updateProfile({
                id: user.id,
                name: name,
                email: email,
                profileImage: file,
                twoFactorEnabled: user.twoFactorEnabled,
                backupCodes: []

            });
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className='row py-5 px-3 '>
                <div className='col-md-4 col-sm-12 mb-3'>
                    <div className='text-primary'>{t('ns1:profileHeading')}</div>
                    <div className='small'>{t('ns1:profileDescription')}</div>
                </div>

                <div className='col-md-4 col-sm-12'>
                    <label
                        htmlFor="password"
                        className="grey-text font-weight-light text-center"
                    >
                        {t('ns1:profileImageHeading')}
                    </label>

                    <div className="profile-avatar mb-2 text-center">

                        {
                            typeof file !== 'undefined' ?
                                <img
                                    style={{width: 150}}
                                    src={`data:${file.type};base64,${file.data}`}
                                    alt={user?.name}/>
                                :
                                user.profileImage !== null ? (
                                    <img
                                        style={{width: 150}}
                                        src={`data:${user?.profileImage.type};base64,${user?.profileImage.data}`}
                                        alt={user?.name}/>
                                ) : (
                                    <div className="text-avatar">
                                        <span>{user.name && user.name[0]}</span>
                                    </div>
                                )
                        }
                    </div>
                    <div className="input-group mb-2">
                        <div className="input-group-prepend">
                        </div>
                        <div className="custom-file hoverable">
                            <input
                                type="file"
                                className="custom-file-input"
                                id="inputGroupFile01"
                                onChange={(event) => {
                                    handleChange(event)
                                }}
                                aria-describedby="inputGroupFileAddon01"
                            />
                            <label className="custom-file-label" htmlFor="inputGroupFile01">
                                {t('ns1:chooseFile')}
                            </label>
                        </div>
                    </div>
                    <Input
                        id={"email"}
                        type="email"
                        label={t("ns1:emailLabel")}
                        value={email}
                        valid={emailValid}
                        validationStarted={emailValidationStarted}
                        onChange={(event) => {
                            setEmail(event.target.value);
                            setEmailValidationStarted(true);
                            setEmailValid(isEmailValid(event.target.value));
                        }}
                        required={true}
                        invalidValueMessage={t('ns1:invalidEmailMessage')}
                    />
                    <Input id={"name"}
                           type={"text"}
                           label={t('ns1:nameLabel')}
                           value={name}
                           valid={nameValid}
                           validationStarted={nameValidationStarted}
                           onChange={(event) => {
                               setNameValidationStarted(true);
                               setNameValid(event.target.value.length >= 4);
                               setName(event.target.value);
                           }}
                           invalidValueMessage={t('ns1:invalidNameMessage')}
                           required={true}/>
                    <div className="form-item mt-3 save text-center">
                        <MDBBtn color="primary"
                                type="submit"
                                disabled={((typeof file === 'undefined' || file.data === user.profileImage.data) && email === user.email && name === user.name) || !isEmailValid(email)}

                        >  {t('ns1:saveButtonLabel')}</MDBBtn>
                    </div>
                </div>

            </div>
        </form>

    )
}


export default connect(mapStateToProps, mapDispatchToProps)(Profile)
