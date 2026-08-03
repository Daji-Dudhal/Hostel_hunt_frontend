import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../reduxSlices/authSlice";
import { useNavigate } from "react-router-dom";
import "../styles/auth.css";

const loginLabels = {
  student: "Student",
  admin: "Admin",
  hostelOwner: "Hostel Owner",
};

export const AuthPage = () => {
  const [selectedLoginType, setSelectedLoginType] = useState("student");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.auth);

  const handleLoginClick = async (e) => {
    e.preventDefault();

    try {
      const response = await dispatch(
        loginUser({ username, password, userType: selectedLoginType })
      ).unwrap();

      if (response) {
        if (selectedLoginType === "admin") {
          navigate("/adminhome");
        } else if (selectedLoginType === "student") {
          navigate("/home");
        } else if (selectedLoginType === "hostelOwner") {
          navigate("/hostelOwnerHome");
        }
      }
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  const handleSignUpClick = (e) => {
    e.preventDefault();
    navigate("/signup");
  };

  return (
    <div className="auth-shell">
      <div className="auth-hero">
        <div className="brand-mark">H</div>
        <h1>Hostel Hunt</h1>
        <p>
          Discover trusted stays, manage bookings, and keep your hostel business
          running smoothly in one place.
        </p>

        <ul className="benefits-list">
          <li>Verified hostel listings</li>
          <li>Fast access for students and owners</li>
          <li>Secure controls for administrators</li>
        </ul>
      </div>

      <div className="auth-card">
        <div className="auth-card__content">
          <div className="auth-card__header">
            <p className="eyebrow">Welcome back</p>
            <h2>{loginLabels[selectedLoginType]} Portal</h2>
            <p>Select your role and sign in to continue.</p>
          </div>

          <div className="role-switcher" role="tablist">
            {Object.entries(loginLabels).map(([key, label]) => (
              <button
                key={key}
                type="button"
                className={`role-pill ${selectedLoginType === key ? "active" : ""}`}
                onClick={() => setSelectedLoginType(key)}
              >
                {label}
              </button>
            ))}
          </div>

          <form className="auth-form" onSubmit={handleLoginClick}>
            <label className="form-field">
              <span>Username</span>
              <input
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </label>

            <label className="form-field">
              <span>Password</span>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>

            <button className="primary-btn" type="submit" disabled={loading}>
              {loading ? "Signing in..." : "Login"}
            </button>

            <div className="action-row">
              <button className="secondary-btn" type="button" onClick={handleSignUpClick}>
                Sign Up
              </button>
              <button
                className="ghost-btn"
                type="button"
                onClick={() => navigate("/reset")}
              >
                Reset
              </button>
            </div>

            {error && <p className="status-message error">{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};