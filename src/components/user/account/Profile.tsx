import {connect} from "react-redux";
import React, {ChangeEvent, useState} from "react";
import {RouteComponentProps} from "react-router-dom";
import {ProfileImage, User} from "../../App";
import {AppState} from "../../../redux/store/Store";
import {getFormControlClass, isEmailValid} from "../../../util/APIUtils";
import {MDBBtn} from "mdbreact";
import {useTranslation} from "react-i18next";
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";
import {updateProfile} from "../../../redux/actiontype/UserActionTypes";

export interface ProfileProps extends RouteComponentProps {
    user: User,
    updateProfile: (updateProfileRequest: UpdateProfileRequest) => void
}

function mapStateToProps(state: AppState, props: ProfileProps) {
    return {
        user: state.userState.currentUser
    }
}

function mapDispatchToProps(dispatch: ThunkDispatch<any, any, AnyAction>) {
    return {
        updateProfile: (updateProfileRequest: UpdateProfileRequest) => dispatch(updateProfile(updateProfileRequest)),
    };
};


function Profile(props: ProfileProps) {
    let user: User = props.user;
    let [file, setFile] = useState<ProfileImage | undefined>(undefined);
    let [email, setEmail] = useState(user.email);
    let [name, setName] = useState(user.name);
    const [emailValidationStarted, setEmailValidationStarted] = useState(false);
    const [emailValid, setEmailValid] = useState(isEmailValid(user.email));
    const {t} = useTranslation();

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        event.preventDefault();
        let files = event.target.files;
        if (files !== null) {
            let newProfileFile = files[0];
            let reader = new FileReader();
            reader.onload = () => {
                setFile({
                    data: reader.result?.toString().split(",")[1],
                    type: newProfileFile?.type
                })
            };
            reader.readAsDataURL(newProfileFile)
        }
    }

    function handleSubmit(event: React.FormEvent<EventTarget>) {
        event.preventDefault();
        props.updateProfile({
            name: name,
            email: email,
            profileImage: file
        });
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className='row py-5 px-3'>
                <div className='col-md-4 col-sm-12'>
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
                    <label
                        htmlFor="password"
                        className="grey-text font-weight-light"
                    >
                        {t('ns1:emailLabel')}
                    </label>
                    <div className="form-item">
                        <input type="email" name="email"
                               className={getFormControlClass(emailValidationStarted, emailValid)} placeholder="Email"
                               value={email} onChange={(event) => {
                            setEmailValidationStarted(true);
                            setEmailValid(isEmailValid(event.target.value));
                            setEmail(event.target.value);

                        }} required
                        />
                        <div className="invalid-feedback text-left">
                            {t('ns1:invalidEmailMessage')}
                        </div>
                    </div>
                    <label
                        htmlFor="Name"
                        className="grey-text font-weight-light"
                    >
                        {t('ns1:nameLabel')}
                    </label>
                    <input
                        type="text"
                        id="password"
                        className="form-control"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                    />
                    <div className="form-item mt-3 save text-center">
                        <MDBBtn color="primary"
                                type="submit"
                                disabled={(((typeof file === 'undefined' || file.data === user.profileImage.data) && email === user.email && name === user.name)) || !emailValid}

                        >  {t('ns1:saveButtonLabel')}</MDBBtn>
                    </div>
                </div>

            </div>
        </form>

    )
}

export interface UpdateProfileRequest {
    email?: string,
    name?: string,
    profileImage?: ProfileImage

}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
