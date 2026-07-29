import React, { useState } from "react";

const StudentLogin = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    console.log("Student Login");
    console.log("Name:", name);
    console.log("Password:", password);

    // Call your login API here
  };

  return (
    <div className="login-container">
      <h2>Student Login</h2>

      <form className="login-form" onSubmit={handleLogin}>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Enter your Username"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="password"
          id="password"
          name="password"
          placeholder="Enter your Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" className="login-btn">
          Login
        </button>
      </form>
    </div>
  );
};

export default StudentLogin;