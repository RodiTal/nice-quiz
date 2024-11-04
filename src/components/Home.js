import React from "react";
import { Link } from "react-router-dom";
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
                    <li><Link className="play-btn" to="/quiz-instructions">Play</Link></li>
                </ul>
            </div>
            <div className="auth-btn-container">
                <Link className="auth-btns" id="login-btn" to="/login">Login</Link>
                <Link className="auth-btns" id="signup-btn" to="/register">Sign Up</Link>
            </div>
        </section>
      </div>
    );
};

export default  Home;

