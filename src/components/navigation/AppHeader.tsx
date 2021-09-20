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
import {getLanguageFlagPairFromLocale} from "../../i18n/I18nConfig";
import DarkModeToggle from "react-dark-mode-toggle";
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";
import {AppState} from "../../redux/store/Store";
import {Theme} from "../../redux/reducer/GeneralReducer";
import {dismisSetTheme} from "../../redux/actiontype/GeneralActionTypes";
import {Routes} from "../../util/Constants";
import About from "../about/About";
import {useMediaQuery} from "@react-hook/media-query";


function mapDispatchToProps(dispatch: ThunkDispatch<any, any, AnyAction>) {
    return {
        setTheme: (theme: Theme) => dispatch(dismisSetTheme(theme))
    };
};


function AppHeader(props: AppProps) {
    const [open, setOpen] = useState(false);
    const {t, i18n} = useTranslation();
    let [flagName] = getLanguageFlagPairFromLocale(i18n.language);
    const location = useLocation();
    const bgPink = {backgroundColor: '#ffffff'}
    const [isDark,setIsDark] = useState(props.theme === 'dark')
    const collapsed = useMediaQuery('only screen and (max-width: 991px)')
    console.log(collapsed)
    return (

        <header className="app-header z-depth-1">
            <MDBNavbar className="navbar" fixed="top" style={bgPink} expand="lg">
                <MDBContainer>
                    <MDBNavbarBrand href={Routes.ABOUT1}>
                        Full stack template
                    </MDBNavbarBrand>
                    <div className="d-flex flex-row">
                    <div className="mr-3">
                        {collapsed? <DarkModeToggle
                            onChange={()=>{
                                setIsDark(!isDark);
                                props.setTheme(!isDark? 'dark':'light');
                                setOpen(false);
                            }}
                            checked={isDark}
                            size={50}
                        />:<></>}
                   </div>
                    <MDBNavbarToggler
                        className={open?'toggler-icon open':'toggler-icon'}

                        onClick={() => {
                            setOpen(!open)
                        }}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </MDBNavbarToggler>
                    </div>
                    <MDBCollapse isOpen={open} navbar>
                        <MDBNavbarNav left>
                            <MDBNavItem active={location.pathname === Routes.ABOUT1}>
                                <MDBNavLink to={Routes.ABOUT1} link><div onClick={()=>{setOpen(false)}}>{t('ns1:aboutAppLabel')}</div></MDBNavLink>
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
                                                to={Routes.ACCOUNT} onClick={()=>setOpen(false)}>{t('ns1:profileHeading')}</NavLink></MDBDropdownItem>
                                            <MDBDropdownItem><MDBIcon icon="sign-out-alt"/> <a
                                                onClick={()=>{props.onLogOut();setOpen(false)}}>{t('ns1:logoutLabel')}</a></MDBDropdownItem>
                                        </MDBDropdownMenu>
                                    </MDBDropdown>
                                </MDBNavItem>
                            ) : (
                                <>
                                    <MDBNavItem active={location.pathname === Routes.LOGIN} className='my-auto'>
                                        <MDBNavLink to={Routes.LOGIN} link><div onClick={()=>{setOpen(false)}}>{t('ns1:loginHeading')}</div></MDBNavLink>
                                    </MDBNavItem>
                                    <MDBNavItem active={location.pathname === Routes.SIGNUP} className='my-auto'>

                                        <MDBNavLink to={Routes.SIGNUP} link><div onClick={()=>{setOpen(false)}}>{t('ns1:signupHeading')}</div></MDBNavLink>
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
                                                    i18n.changeLanguage(language).then(()=>{});
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
                            {!collapsed?   <MDBNavItem className="my-auto">
                                <DarkModeToggle
                                    onChange={()=>{
                                        setIsDark(!isDark);
                                        props.setTheme(!isDark? 'dark':'light');
                                        setOpen(false);
                                    }}
                                    checked={isDark}
                                    size={50}
                                />
                            </MDBNavItem>:<></>}

                        </MDBNavbarNav>
                    </MDBCollapse>
                </MDBContainer>
            </MDBNavbar>
        </header>
    )
}


export default connect(null, mapDispatchToProps)(AppHeader);
