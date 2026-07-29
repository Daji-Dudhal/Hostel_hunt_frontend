import React, { useState } from "react";

const HostelOwnerLogin = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    console.log("Hostel Owner Login");
    console.log("Name:", name);
    console.log("Password:", password);

    // TODO: Call your login API here
  };

  return (
    <div className="login-container">
      <h2>Hostel Owner Login</h2>

      <form className="login-form" onSubmit={handleLogin}>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Enter your Username"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="password"
          name="password"
          id="password"
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

export default HostelOwnerLogin;