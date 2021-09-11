import React, {useEffect, useState} from 'react';
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
import {getLanguageFlagPairFromLocale} from "../../i18n/I18nConfig";
import DarkModeToggle from "react-dark-mode-toggle";
import {Cookies} from "react-cookie";

function AppHeader(props: AppProps) {
    const [open, setOpen] = useState(false);
    const {t,i18n} = useTranslation();
    let [flagName] = getLanguageFlagPairFromLocale(i18n.language);
    const location = useLocation();
    const bgPink = {backgroundColor: '#ffffff'}
    const themeCookieName = 'theme';
    const cookies = new Cookies();
    let theme = cookies.get(themeCookieName);
    if (typeof  theme === 'undefined'){
        cookies.set(themeCookieName,'dark',{path:"/", expires:createThemeCookieExpirationDate()})
        theme = cookies.get(themeCookieName);
    }
    const [isDark,setIsDark]  = useState(theme==='dark');
    useEffect(() => {
        if (isDark) {
            document.body.classList.add('dark');
        } else {
            document.body.classList.remove('dark');
        }
        cookies.set(themeCookieName,isDark?'dark':'light',{path:"/", expires:createThemeCookieExpirationDate()})
    }, [isDark]);

    return (

        <header className="app-header z-depth-1">
            <MDBNavbar className="navbar" fixed="top" style={bgPink} expand="lg">
                <MDBContainer>
                    <MDBNavbarBrand href="/">
                        Full stack template
                    </MDBNavbarBrand>
                    <MDBNavbarToggler
                        className={open?'toggler-icon open':'toggler-icon'}

                        onClick={() => {
                            setOpen(!open)
                        }}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </MDBNavbarToggler>
                    <MDBCollapse isOpen={open} navbar>
                        <MDBNavbarNav left>
                            <MDBNavItem active={location.pathname === '/'}>
                                <MDBNavLink to="/" link><div onClick={()=>{setOpen(false)}}>{t('ns1:aboutAppLabel')}</div></MDBNavLink>
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
                                                to="/account" onClick={()=>setOpen(false)}>{t('ns1:profileHeading')}</NavLink></MDBDropdownItem>
                                            <MDBDropdownItem><MDBIcon icon="sign-out-alt"/> <a
                                                onClick={()=>{props.onLogOut();setOpen(false)}}>{t('ns1:logoutLabel')}</a></MDBDropdownItem>
                                        </MDBDropdownMenu>
                                    </MDBDropdown>
                                </MDBNavItem>
                            ) : (
                                <>
                                    <MDBNavItem active={location.pathname === '/login'} className='my-auto'>
                                        <MDBNavLink to="/login" link><div onClick={()=>{setOpen(false)}}>{t('ns1:loginLabel')}</div></MDBNavLink>
                                    </MDBNavItem>
                                    <MDBNavItem active={location.pathname === '/signup'} className='my-auto'>

                                        <MDBNavLink to="/signup" link><div onClick={()=>{setOpen(false)}}>{t('ns1:signupLabel')}</div></MDBNavLink>
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
                                                onClick={() => {
                                                    i18n.changeLanguage(language);
                                                    setOpen(false);
                                                }}>
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
                            </MDBNavItem>
                            <MDBNavItem className="my-auto">
                                <DarkModeToggle
                                    onChange={()=>{
                                        setIsDark(!isDark);
                                        setOpen(false);
                                    }}
                                    checked={isDark}
                                    size={50}
                                />
                            </MDBNavItem>
                        </MDBNavbarNav>
                    </MDBCollapse>
                </MDBContainer>
            </MDBNavbar>
        </header>
    )
}

function createThemeCookieExpirationDate():Date{
    const expiresDate = new Date();
    expiresDate.setTime(expiresDate.getTime() + (100*365*24*60*60*1000)); // expires in 100 years
    return expiresDate;
}

export default connect()(AppHeader);
