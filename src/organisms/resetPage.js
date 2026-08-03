import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ResetPage = () => {
  const [email, setEmail] = useState("");

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // TODO: Call your backend reset password API here

    toast.success("Password reset link sent to your email!");

    setEmail("");
  };

  const resetPageStyles = {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f5f7fa",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  };

  const formContainerStyles = {
    width: "100%",
    maxWidth: "450px",
    background: "#fff",
    padding: "35px",
    borderRadius: "12px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
  };

  const titleStyles = {
    textAlign: "center",
    marginBottom: "10px",
    color: "#2e7d32",
  };

  const subTitleStyles = {
    textAlign: "center",
    marginBottom: "25px",
    color: "#666",
    fontSize: "15px",
  };

  const inputStyles = {
    width: "100%",
    padding: "12px",
    marginBottom: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    fontSize: "16px",
    outline: "none",
    boxSizing: "border-box",
  };

  const buttonStyles = {
    width: "100%",
    padding: "12px",
    background: "#2e7d32",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    cursor: "pointer",
    transition: "0.3s",
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />

      <div style={resetPageStyles}>
        <div style={formContainerStyles}>
          <h2 style={titleStyles}>Reset Password</h2>

          <p style={subTitleStyles}>
            Enter your registered email address to receive a password reset link.
          </p>

          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={handleChange}
              style={inputStyles}
              required
            />

            <button
              type="submit"
              style={buttonStyles}
              onMouseOver={(e) =>
                (e.target.style.background = "#1b5e20")
              }
              onMouseOut={(e) =>
                (e.target.style.background = "#2e7d32")
              }
            >
              Send Reset Link
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ResetPage;