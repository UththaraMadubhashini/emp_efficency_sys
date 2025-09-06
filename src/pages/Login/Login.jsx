import React, { useState } from "react";
import "./Login.css";
import Logo from "../../assets/Logo.png";
import { auth, rtdb } from "../../firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { ref, get } from "firebase/database";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);

      // Fetch role from DB
      const roleRef = ref(rtdb, "users/" + userCred.user.uid + "/role");
      const snapshot = await get(roleRef);
      const userRole = snapshot.exists() ? snapshot.val() : "employee";

      alert(`✅ Logged in as ${userRole}`);

      if (userRole === "admin") {
        window.location.href = "/admin";
      } else {
        window.location.href = "/employee";
      }
    } catch (err) {
      setError("❌ Invalid email or password");
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <div className="login-container">
      <div className="login-card intro-card">
        <div className="login-top-wave" />
        <div className="login-content">
          <div className="login-icon-container">
            <img src={Logo} alt="Logo" className="login-icon" />
          </div>

          <form onSubmit={handleLogin}>
            <label className="login-label" htmlFor="email">Email</label>
            <input
              className="login-input"
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label className="login-label" htmlFor="password">Password</label>
            <input
              className="login-input"
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {error && <p style={{ color: "red", fontSize: "14px" }}>{error}</p>}

            <button className="login-btn-outline" type="submit" disabled={loading}>
              {loading ? "Logging in..." : "LOGIN"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
