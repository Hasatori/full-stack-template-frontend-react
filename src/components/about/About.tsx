import React from 'react';
import './About.css'
import {MDBTypography} from "mdbreact";
import {Link} from 'react-router-dom';
import stack from '../../assets/images/common/react_plus_spring_boot.png'
import {AppProps} from "../../index";
import {connect} from "react-redux";

function About(appProps: AppProps) {
    return (
        <section className='d-flex flex-column justify-content-center'>
            <section id='what-is-fullstack-template'>
                <h1 className="h1-responsive bold color-primary mb-5 text-center">What is full stack
                    template? </h1>
                <MDBTypography className='text-long lead text-center'>
                    Full stack is Spring/React based template webapp that provides set of functionalities needed
                    for any web app.
                </MDBTypography>
                <img src={stack} width='80%' className='center-image' loading={"lazy"}/>


            </section>
            <div className="divider"/>
            <section id="supported-functionalities">
                <h2 className="h2-responsive color-primary bold mb-4">Supported functionalities</h2>
                <p className="text-long">Template supports basic functionalities that are needed for almost any
                    web application.
                    You can try each functionality for yourself by interacting with this webapp.
                    You can either <Link to="/login">login</Link> using Facebook, Google or Github or you can
                    <Link to="/signUp"> sign up </Link>and login using email and password.</p>
                <p>Following functionalities are supported:</p>
                <ul>
                    <li>Login</li>
                    <li>Sign up</li>
                    <li>Forgotten password</li>
                    <li>O2Auth for Facebook, Google and Github</li>
                    <li>Profile management
                        <ul>
                            <li>Change profile image, email, username or password</li>
                            <li>Enable two factor authentication</li>
                            <li>Cancel your account</li>
                        </ul>
                    </li>
                </ul>
            </section>
            <div className="divider"/>
            <section id="react">
                <h2 className="h2-responsive color-primary bold mb-4">React</h2>
                <p>Frontend was written in React - popular Javascript framework for making SPAs. It is fully
                    integrated with <strong>Typescript</strong> and <strong>Redux</strong>.
                    It also provides <strong>localization</strong> and <strong>theme</strong> support.</p>
                <p>Much more information about this part and also whole source code can be found at <a
                    href="https://github.com/Hasatori/fullstack-boilerplate-react-frontend"
                    target="_blank">Github</a>.</p>
            </section>
            <div className="divider"/>
            <section id='spring-boot'>
                <h2 className="h2-responsive color-primary bold mb-4">Spring boot</h2>
                <p>Backend REST api was written in Spring using Spring boot. It uses double JWT token based
                    authentication, provides support for localization and also email sending.</p>
                <p>Much more information about this part and also whole source code can be found at <a
                    href="https://github.com/Hasatori/fullstack-boilerplate-spring-backend"
                    target="_blank">Github</a>.</p>

            </section>
        </section>

    )
}

export default connect()(About)
