import React, { useState } from 'react';
import "./LoginScreen.css";
import netflixLogo from "../../images/Netflix_logo.svg";
import SignUpScreen from "./SignUpScreen";


const LoginScreen = () => {
    const [signIn, setSignIn] = useState(false);


    return (
        <div className='loginScreen'>
            <div className='loginScreen-Background'>
                <img className='loginScreen-logo'
                    src={netflixLogo} alt='netflix-bg' />

                <button onClick={() => setSignIn(true)} className='signIn-button'>Sign In</button>

            </div>

            <div className='loginScreen-Gradient'></div>

            <div className='loginScreen-body'>
                {signIn ? (
                    <SignUpScreen />
                ) :
                    (
                        <>
                            <h1>
                                Unlimited films, TV Programmes and more..
                            </h1>
                            <h2>
                                Watch anywhere, Cancel at any time.
                            </h2>
                            <h3>
                                Ready to watch? Enter your email to create or restart your membership.
                            </h3>

                            <div className='loginScreen-input'>
                                <form>
                                    <input type='email' placeholder='Email Address' />
                                    <button onClick={() => setSignIn(true)}
                                        className='loginScreen-Getstarted'>GET STARTED</button>
                                </form>
                            </div>
                        </>
                    )
                }



            </div>
        </div>
    )
}

export default LoginScreen
