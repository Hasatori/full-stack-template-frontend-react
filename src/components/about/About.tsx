import React from 'react';
import './About.css'
import {MDBTypography} from "mdbreact";
import {Link} from 'react-router-dom';
import stack from '../../assets/images/common/react_plus_spring_boot.png'
import {AppProps} from "../../index";
import {connect} from "react-redux";
import {Routes} from "../../util/Constants";
import {Trans, useTranslation} from "react-i18next";

function About(appProps: AppProps) {
    const {t, i18n} = useTranslation();
    return (
        <section className='d-flex flex-column justify-content-center'>
            <section id='what-is-fullstack-template'>
                <h1 className="h1-responsive bold color-primary mb-5 text-center">   {t('ns1:whatIsFullStackTemplateHeading')}</h1>
                <MDBTypography className='text-long lead text-center'>
                    {t('ns1:whatIsFullStackTemplateParagraph')}
                </MDBTypography>
                <img src={stack} width='80%' className='center-image' loading={"lazy"}/>
            </section>
            <div className="divider"/>
            <section id="supported-functionalities">
                <h2 className="h2-responsive color-primary bold mb-4">{t('ns1:supportedFunctionalitiesHeading')}</h2>
                <p className="text-long">
                    <Trans
                        i18nKey="ns1:supportedFunctionalitiesParagraph"
                        components={{
                            loginLink: <Link to={Routes.LOGIN}/>,
                            signUpLink: <Link to={Routes.SIGNUP}/>
                        }}/>
                </p>
                <p>{t('ns1:supportedFunctionalitiesListHeading', {})}</p>
                <ul>
                    <li>{t('ns1:loginHeading')}</li>
                    <li>{t('ns1:signupHeading')}</li>
                    <li>{t('ns1:forgottenPasswordHeading')}</li>
                    <li>O2Auth Facebook, Google and Github</li>
                    <li>{t('ns1:manageProfileHeading')}
                        <ul>
                            <li>{t('ns1:profileDescription')}</li>
                            <li>{t('ns1:twoFactorAuthenticationLabel')}</li>
                            <li>{t('ns1:closeAccountHeading')}</li>
                        </ul>
                    </li>
                </ul>
            </section>
            <div className="divider"/>
            <section id="react">
                <h2 className="h2-responsive color-primary bold mb-4">React</h2>
                <Trans className="text-long"
                    i18nKey="ns1:reactParagraph"
                    components={{
                        githubLink: <a href="https://github.com/Hasatori/full-stack-template-frontend-react" target="_blank"/>,
                        p: <p className="text-long"/>
                    }}/>
            </section>
            <div className="divider"/>
            <section id='spring-boot'>
                <h2 className="h2-responsive color-primary bold mb-4">Spring boot</h2>
                <Trans className="text-long"
                    i18nKey="ns1:springBootParagraph"
                    components={{
                        githubLink: <a href="https://github.com/Hasatori/full-stack-template-backend-spring" target="_blank"/>,
                        p: <p className="text-long"/>
                    }}/>

            </section>
        </section>

    )
}

export default connect()(About)
