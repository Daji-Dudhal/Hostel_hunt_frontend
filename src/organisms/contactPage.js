import React, { useState } from "react";
import Header from "../atom/header";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // For toast styling
import "../styles/contactpage.css";

export const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [statusMessage, setStatusMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setStatusMessage(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatusMessage(null);

    try {
      const response = await fetch("https://hostelhunt-backend-6.onrender.com/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        const statusCode = response.status;
        const message = errorText || "Unable to send message. Please try again later.";

        if (statusCode === 404) {
          setStatusMessage({
            type: "error",
            text: "Contact endpoint not found on backend. Please deploy the backend with the /contact route.",
          });
        } else {
          setStatusMessage({ type: "error", text: message });
        }

        toast.error(message);
        return;
      }

      toast.success("Your message has been sent successfully!");
      setStatusMessage({
        type: "success",
        text: "Message sent. If it still fails, check whether your backend deployment includes /contact.",
      });
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      const message =
        error.message ||
        "Something went wrong. If the backend is not deployed or the endpoint is missing, this request may fail.";
      setStatusMessage({ type: "error", text: message });
      toast.error(message);
    }
  };

  return (
    <>
      <ToastContainer />
      <Header />
      <div className="contact-page">
        <h1 className="contact-title">Contact Us</h1>
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className="input-field"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              className="input-field"
              required
            />
            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              className="text-area"
              required
            ></textarea>
            <button type="submit" className="submit-button">
              Send Message
            </button>

            {statusMessage && (
              <div className={`status-message ${statusMessage.type}`}>
                {statusMessage.text}
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  );
};
