import React from "react";
import "./Login.css";
import Logo from "../../assets/Logo.png";

export default function Login() {
  return (
    <div className="container" style={{ justifyContent: "center" }}>
      <div className="card intro-card">
        <div className="top-wave" />
        <div className="content">
          <div className="icon-container">
            <img src={Logo} alt="Logo" className="icon" />
          </div>
          <form>
            <label>Email</label>
            <input type="email" placeholder="Enter your email" />

            <label>Password</label>
            <input type="password" placeholder="Enter your password" />

            <div className="forgot-password">Forgot Password?</div>
          </form>
        </div>
        <button className="btn-outline">LOGIN</button>
      </div>
    </div>
  );
}
