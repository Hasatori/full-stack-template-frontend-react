import React from 'react';
import './About.css'
import {MDBCol, MDBRow} from "mdbreact";
import {Link} from 'react-router-dom';
import Scrollspy from 'react-scrollspy';
import stack from '../../assets/images/common/react_plus_spring_boot.png'
import {AppProps} from "../../index";
import {connect} from "react-redux";

function About(appProps:AppProps) {
    return (
        <MDBRow>
            <MDBCol sm='12' md="9">
                <section className='d-flex flex-column justify-content-center text-container'>
                    <section id='what-is-fullstack-template' >
                        <h1 className="h1-responsive text-center bold color-primary mb-5">What is fullstack
                            template? </h1>
                        <p className="text-long">
                            Fullstack template is a project that provides boilerplate app with all basic functionalities
                            implemented.
                            If you have an idea in mind but do not want to spend time implementing login, registration,
                            O2Auth
                            etc. then <strong>Fullstack template</strong> is for you.
                        </p>
                    </section>
                    <div className="divider"/>
                    <section id="stack">
                        <h2 className="h2-responsive color-primary bold mb-4">Stack</h2>
                        <img src={stack} width='80%' className='center-image' loading={"lazy"}/>
                        <p> Stack is based on React for frontend and Spring boot for backend REST api.</p>
                        <p>Source code for both is available on Github:</p>
                        <ul>
                            <li><a href="https://github.com/Hasatori/fullstack-boilerplate-react-frontend"
                                   target="_blank">REACT</a></li>
                            <li><a href="https://github.com/Hasatori/fullstack-boilerplate-spring-backend"
                                   target="_blank">SPRING BOOT</a></li>
                        </ul>
                        <p className="text-long">Template supports basic functionalities that are needed for amost any application.
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
                        <ul>
                            <li>Redux</li>
                            <li>Localization</li>
                            <li>Dark and light theme support</li>
                            <li>Notifications</li>
                        </ul>
                        <p className="text-long">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                    </section>
                    <div className="divider"/>
                    <section id='spring-boot'>
                        <h2 className="h2-responsive color-primary bold mb-4">Spring boot</h2>
                        <ul>
                            <li></li>
                            <li>Email sending</li>
                            <li>Localization</li>
                            <li>Dark and light theme support</li>
                            <li>Notifications</li>
                        </ul>
                        <p className="text-long">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                        <p className="text-long">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                        <p className="text-long">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>

                    </section>
                </section>
            </MDBCol>

            <MDBCol size="3" className='sm-display-none'>
                <Scrollspy items={['what-is-fullstack-template','stack', 'react', 'spring-boot']} offset={-50} currentClassName="is-active" className="side-nav">
                    <div className="side-nav-item"> <a href="#what-is-fullstack-template">What is</a></div>
                    <div className="side-nav-item"> <a href="#stack">Stack</a></div>
                    <div className="side-nav-item"><a href="#react">React</a></div>
                    <div className="side-nav-item"><a href="#spring-boot">Spring boot</a></div>
                </Scrollspy>
            </MDBCol>

        </MDBRow>

    )
}

export default connect()(About)
