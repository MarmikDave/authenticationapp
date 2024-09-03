
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import SignUp from "./SignUp";
import Login from "./Login";
import AuthContext from "../context/AuthContext";
import "../App.css";

function HomePage() {
  const [showSignUp, setShowSignUp] = useState(false);
  const [showLogin, setShowLogin] = useState(true); // Default to show login
  const { isLoggedIn, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignUpClick = () => {
    setShowSignUp(true);
    setShowLogin(false);
  };

  const handleLoginClick = () => {
    setShowLogin(true);
    setShowSignUp(false);
  };

  return (
    <div className="login-wrap">
      <div className="login-html">
        <input
          id="tab-1"
          type="radio"
          name="tab"
          className="sign-in"
          checked={showLogin}
          onChange={() => handleLoginClick()}
        />
        <label htmlFor="tab-1" className="tab">
          Sign In
        </label>
        <input
          id="tab-2"
          type="radio"
          name="tab"
          className="sign-up"
          checked={showSignUp}
          onChange={() => handleSignUpClick()}
        />
        <label htmlFor="tab-2" className="tab">
          Sign Up
        </label>

        <div className="login-form">
          {showLogin && <Login />}
          {showSignUp && <SignUp />}
        </div>

        {/* Conditionally render buttons based on login status */}
        {isLoggedIn && (
          <div className="button-container">
            <button
              className="gradient-button"
              onClick={() => navigate("/dashboard")}
            >
              Dashboard
            </button>
            <button
              className="gradient-button"
              onClick={() => logout(navigate)}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default HomePage;
