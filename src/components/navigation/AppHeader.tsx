import React, {useState} from 'react';
import {Link, NavLink} from 'react-router-dom';
import './AppHeader.css';
import {connect} from "react-redux";
import {AppProps} from "../../index";
import {MDBDropdown, MDBDropdownItem, MDBDropdownMenu, MDBDropdownToggle, MDBIcon} from 'mdbreact';
import {useTranslation} from "react-i18next";
import i18next from "i18next";


import {getLanguageFlagPairFromLocale} from "../../i18n/I18nConfig";

function AppHeader(props: AppProps) {
    const [open, setOpen] = useState(false);
    const {t} = useTranslation();
    let [flagName] = getLanguageFlagPairFromLocale(i18next.language);
    return (
        <header className="app-header z-depth-1">
            <div className="container">
                <div className="app-branding mr-4">
                    <Link to="/" className="app-title">Full stack template</Link>
                </div>
                <div className="nav-main">
                    <nav className="app-nav">
                        <ul>
                            <li><NavLink to="/" exact>{t('ns1:homeLabel')}</NavLink></li>
                        </ul>
                    </nav>
                </div>
                <div className="app-options">
                    <nav className="app-nav">
                        <ul>
                            {props.authenticated ? (
                                <>
                                    <li>
                                        <MDBDropdown>
                                            <MDBDropdownToggle caret color='transparent'
                                                               className='z-depth-0  mx-2 p-0 profile-avatar text-center'>
                                                <img
                                                    style={{width: 30}}
                                                    src={`data:${props.user?.profileImage.type};base64,${props.user?.profileImage.data}`}
                                                    alt={props.user?.name}/>
                                            </MDBDropdownToggle>
                                            <MDBDropdownMenu>
                                                <MDBDropdownItem> <MDBIcon icon="cog"/> <NavLink
                                                    to="/account">{t('ns1:profileHeading')}</NavLink></MDBDropdownItem>
                                                <MDBDropdownItem><MDBIcon icon="sign-out-alt"/> <a
                                                    onClick={props.onLogOut}>{t('ns1:logoutLabel')}</a></MDBDropdownItem>
                                            </MDBDropdownMenu>
                                        </MDBDropdown>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li>
                                        <NavLink to="/login">{t('ns1:loginLabel')}</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/signup">{t('ns1:signupLabel')}</NavLink>
                                    </li>
                                </>
                            )}
                            <li>
                                <MDBDropdown>
                                    <MDBDropdownToggle caret color='transparent' className='z-depth-0 mx-2 p-0'>
                                        <img
                                            style={{width: 20}}
                                            src={flagName}
                                            alt={props.user?.name}/>
                                    </MDBDropdownToggle>
                                    <MDBDropdownMenu>
                                        {i18next.languages.sort((a, b) => {
                                            if (a > b) {
                                                return -1;
                                            }
                                            if (b > a) {
                                                return 1;
                                            }
                                            return 0
                                        }).map((language) => {
                                            let [flagName, languageName] = getLanguageFlagPairFromLocale(language);
                                            console.log(flagName);
                                            return (<MDBDropdownItem
                                                onClick={() =>
                                                    i18next.changeLanguage(language)
                                                }>
                                                <div className='flex-row d-flex'>
                                                    <div><img
                                                        style={{width: 20}}
                                                        src={flagName}
                                                        alt={props.user?.name}/></div>
                                                    <div className='ml-2'>{languageName}</div>
                                                </div>
                                            </MDBDropdownItem>)
                                        })}
                                    </MDBDropdownMenu>
                                </MDBDropdown>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    )
}

export default connect()(AppHeader);
