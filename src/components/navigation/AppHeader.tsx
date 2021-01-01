import React, {useState} from 'react';
import {NavLink, useLocation} from 'react-router-dom';
import './AppHeader.css';
import {connect} from "react-redux";
import {AppProps} from "../../index";
import {
    MDBCollapse,
    MDBContainer,
    MDBDropdown,
    MDBDropdownItem,
    MDBDropdownMenu,
    MDBDropdownToggle,
    MDBIcon,
    MDBNavbar,
    MDBNavbarBrand,
    MDBNavbarNav,
    MDBNavbarToggler,
    MDBNavItem,
    MDBNavLink
} from 'mdbreact';
import {useTranslation} from "react-i18next";
import i18next from "i18next";
import {getLanguageFlagPairFromLocale} from "../../i18n/I18nConfig";
import hamburger from "../../assets/images/common/hamburger-icon.png"
import close from "../../assets/images/common/close-icon.png"

function AppHeader(props: AppProps) {
    const [open, setOpen] = useState(false);
    const {t,i18n} = useTranslation();
    let [flagName] = getLanguageFlagPairFromLocale(i18n.language);
    const location = useLocation();
    const bgPink = {backgroundColor: '#ffffff'}
    return (

        <header className="app-header z-depth-1">

            <MDBNavbar fixed="top" style={bgPink} expand="lg">
                <MDBContainer>
                    <MDBNavbarBrand href="/">
                        Full stack template
                    </MDBNavbarBrand>
                    <MDBNavbarToggler

                        image={open ? close : hamburger}
                        onClick={() => {
                            setOpen(!open)
                        }}/>
                    <MDBCollapse isOpen={open} navbar>
                        <MDBNavbarNav left>
                            <MDBNavItem active={location.pathname === '/'}>
                                <MDBNavLink to="/" link>{t('ns1:homeLabel')}</MDBNavLink>
                            </MDBNavItem>
                        </MDBNavbarNav>
                        <MDBNavbarNav right>
                            {props.authenticated ? (
                                <MDBNavItem>
                                    <MDBDropdown>
                                        <MDBDropdownToggle caret color='transparent'
                                                           className='z-depth-0  mx-2 p-0 profile-avatar text-center border-0'>
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
                                </MDBNavItem>
                            ) : (
                                <>
                                    <MDBNavItem active={location.pathname === '/login'} className='my-auto'>
                                        <MDBNavLink to="/login" link>{t('ns1:loginLabel')}</MDBNavLink>
                                    </MDBNavItem>
                                    <MDBNavItem active={location.pathname === '/signup'} className='my-auto'>

                                        <MDBNavLink to="/signup" link>{t('ns1:signupLabel')}</MDBNavLink>
                                    </MDBNavItem>
                                </>
                            )}
                            <MDBNavItem>
                                <MDBDropdown>
                                    <MDBDropdownToggle caret color='transparent' className='z-depth-0 mx-2 p-0  border-0'>
                                        <img
                                            style={{width: 20}}
                                            src={flagName}
                                            alt={props.user?.name}/>
                                    </MDBDropdownToggle>
                                    <MDBDropdownMenu>
                                        {i18n.languages.sort((a, b) => {
                                            if (a > b) {
                                                return -1;
                                            }
                                            if (b > a) {
                                                return 1;
                                            }
                                            return 0
                                        }).map((language) => {
                                            let [flagName, languageName] = getLanguageFlagPairFromLocale(language);
                                            return (<MDBDropdownItem
                                                onClick={() =>
                                                    i18n.changeLanguage(language)
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
                                </MDBDropdown></MDBNavItem>
                        </MDBNavbarNav>
                    </MDBCollapse>
                </MDBContainer>
            </MDBNavbar>
        </header>
    )
}

export default connect()(AppHeader);
