import React from "react";
import logo from "../assets/Img/logo-app.png";

const Home =  () =>  {
    return (
      <div id="home">
        <section>
            <div className="cube">
                <img src={logo} alt="app-logo"></img>
            </div>
            <h1>Quiz App</h1>
            <div className="play-btn-container">
                <ul>
                    <li><a className="play-btn"  href="play">Play</a></li>
                </ul>
            </div>
            <div className="auth-btn-container">
                <a className="auth-btns" id="login-btn" href="/login">Login</a>
                <a className="auth-btns" id="signup-btn" href="/register">Sign Up</a>
            </div>
        </section>
      </div>
    );
};

export default  Home;

