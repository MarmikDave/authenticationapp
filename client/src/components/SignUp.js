

import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== repeatPassword) {
      alert("Passwords do not match!");
      return;
    }
    try {
      console.log("Signing up user...");
      const response = await axios.post("http://localhost:3000/api/signup", {
        username,
        password,
        email,
      });

      console.log("User signed up successfully. Logging in...");
      const loginResponse = await axios.post("http://localhost:3000/api/login", {
        email,
        password,
      });

      login(loginResponse.data.token);

      console.log("User logged in successfully. Redirecting to dashboard...");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error during signup/login process:", error);
      if (error.response && error.response.data.error === "Email already exists") {
        alert("Email already exists. Please use a different email or try logging in.");
      } else {
        alert("Error during signup/login process. Please try again.");
      }
    }
  };
  return (
    <div className="sign-up-htm">
      <form onSubmit={handleSubmit}>
        <div className="group">
          <label htmlFor="user" className="label">
            Username
          </label>
          <input
            id="user"
            type="text"
            className="input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="group">
          <label htmlFor="pass" className="label">
            Password
          </label>
          <input
            id="pass"
            type="password"
            className="input"
            data-type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="group">
          <label htmlFor="pass" className="label">
            Repeat Password
          </label>
          <input
            id="repeat-pass"
            type="password"
            className="input"
            data-type="password"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
            required
          />
        </div>
        <div className="group">
          <label htmlFor="email" className="label">
            Email Address
          </label>
          <input
            id="email"
            type="text"
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="group">
          <input type="submit" className="button" value="Sign Up" />
        </div>
        <div className="hr"></div>
        <div className="foot-lnk">
          <label htmlFor="tab-1">Already Member?</label>
        </div>
      </form>
    </div>
  );
}


export default SignUp;