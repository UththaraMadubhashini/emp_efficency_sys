import React from "react";
import "./Login.css";
import Logo from "../../assets/Logo.png";

export default function Login() {
  return (
    <div className="login-container">
      <div className="login-card intro-card">
        <div className="login-top-wave" />
        <div className="login-content">
          <div className="login-icon-container">
            <img src={Logo} alt="Logo" className="login-icon" />
          </div>
          <form>
            <label className="login-label" htmlFor="email">Email</label>
            <input
              className="login-input"
              type="email"
              id="email"
              placeholder="Enter your email"
            />

            <label className="login-label" htmlFor="password">Password</label>
            <input
              className="login-input"
              type="password"
              id="password"
              placeholder="Enter your password"
            />

            <div className="login-forgot-password">Forgot Password?</div>
          </form>
        </div>
        <button className="login-btn-outline">LOGIN</button>
      </div>
    </div>
  );
}
