import React, { useState } from "react";
import "../styles/auth.css";

const AdminLogin = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Admin Login", { name, password });
  };

  return (
    <div className="auth-shell auth-shell--compact">
      <div className="auth-card auth-card--compact">
        <div className="auth-card__content">
          <div className="auth-card__header">
            <p className="eyebrow">Admin access</p>
            <h2>Admin Login</h2>
            <p>Monitor operations and manage hostel activity.</p>
          </div>

          <form className="auth-form" onSubmit={handleLogin}>
            <label className="form-field">
              <span>Username</span>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your username"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </label>

            <label className="form-field">
              <span>Password</span>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>

            <button type="submit" className="primary-btn">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;