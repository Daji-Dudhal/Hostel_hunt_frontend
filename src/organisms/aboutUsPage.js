import React from "react";
import Header from "../atom/header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/aboutuspage.css";
import dajiImage from "../Images/daji.jpg";

export const AboutUsPage = () => {
  const aboutUsStyles = {
    minHeight: "100vh",
    padding: "40px 20px",
    backgroundColor: "#f8f9fa",
    fontFamily: "'Roboto', sans-serif",
  };

  const sectionTitleStyles = {
    fontSize: "2.5rem",
    color: "#333",
    marginBottom: "20px",
    textAlign: "center",
  };

  const sectionTextStyles = {
    fontSize: "1rem",
    color: "#555",
    lineHeight: "1.8",
    textAlign: "center",
    maxWidth: "900px",
    margin: "0 auto 20px",
  };

  const teamContainerStyles = {
    display: "flex",
    justifyContent: "center",
    marginTop: "40px",
  };

  const teamMemberStyles = {
    width: "350px",
    textAlign: "center",
    backgroundColor: "#fff",
    borderRadius: "12px",
    padding: "25px",
    boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
    transition: "0.3s",
  };

  const teamMemberImageStyles = {
    width: "150px",
    height: "150px",
    borderRadius: "50%",
    objectFit: "cover",
    border: "4px solid #007bff",
    marginBottom: "20px",
  };

  const teamMemberNameStyles = {
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "10px",
  };

  const teamMemberRoleStyles = {
    fontSize: "1.1rem",
    color: "#007bff",
    marginBottom: "15px",
    fontWeight: "500",
  };

  const developerDescriptionStyles = {
    color: "#666",
    fontSize: "0.95rem",
    lineHeight: "1.7",
  };

  return (
    <>
      <ToastContainer />
      <Header />

      <div style={aboutUsStyles}>
        <h1 style={sectionTitleStyles}>About Hostel Hunt</h1>

        <p style={sectionTextStyles}>
          Hostel Hunt is a simple and user-friendly platform designed to help
          students and travelers find safe, affordable, and comfortable
          hostels. Our goal is to make hostel searching easy by providing
          accurate information in one place.
        </p>

        <p style={sectionTextStyles}>
          We are committed to providing a smooth and reliable experience so
          users can quickly discover the best accommodation that matches their
          needs and budget.
        </p>

        <h2 style={sectionTitleStyles}>Developer</h2>

        <div style={teamContainerStyles}>
          <div style={teamMemberStyles}>
            <img
  src={dajiImage}
  alt="Daji Rajaram Dudhal"
  style={teamMemberImageStyles}
/>

            <h3 style={teamMemberNameStyles}>Daji Rajaram Dudhal</h3>

            <p style={teamMemberRoleStyles}>
              Full Stack Java Developer
            </p>

            <p style={developerDescriptionStyles}>
              I am a Computer Engineering student with a passion for web
              development. I developed the Hostel Hunt project using modern web
              technologies to provide students with an easy way to search,
              explore, and book hostels. My aim is to build simple, useful, and
              user-friendly applications that solve real-world problems.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};