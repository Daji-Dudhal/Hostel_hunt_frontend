import React, { useState } from "react";
import "../styles/auth.css";

const HostelOwnerLogin = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Hostel Owner Login", { name, password });
  };

  return (
    <div className="auth-shell auth-shell--compact">
      <div className="auth-card auth-card--compact">
        <div className="auth-card__content">
          <div className="auth-card__header">
            <p className="eyebrow">Hostel partner access</p>
            <h2>Hostel Owner Login</h2>
            <p>Manage your property and respond to bookings faster.</p>
          </div>

          <form className="auth-form" onSubmit={handleLogin}>
            <label className="form-field">
              <span>Username</span>
              <input
                type="text"
                name="name"
                id="name"
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
                name="password"
                id="password"
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

export default HostelOwnerLogin;