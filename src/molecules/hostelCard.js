import React from "react";
import "../styles/hostelCard.css";
import image1 from "../Images/h1.jpg";

const HostelCard = ({ hostel, handleclickOfCard }) => {
  const googleMapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    hostel.location || ""
  )}`;

  return (
    <div
      className="hostel-card"
      onClick={() => handleclickOfCard && handleclickOfCard(hostel)}
    >
      <div className="hostel-card-img">
        <img
          src={hostel.imageurl || image1}
          alt={hostel.name}
          className="hostel-image"
        />

        <div className="rent-badge">
          ₹{hostel.rent}/month
        </div>
      </div>

      <div className="hostel-card-info">
        <h2 className="hostel-title">{hostel.name}</h2>

        <div className="hostel-detail">
          <span>📍</span>
          <span>{hostel.location}</span>
        </div>

        <div className="hostel-detail">
          <span>🛏</span>
          <span>{hostel.capacity} Beds</span>
        </div>

        <div className="hostel-detail">
          <span>💰</span>
          <span>Deposit ₹{hostel.deposit}</span>
        </div>

        <div className="hostel-detail">
          <span>👤</span>
          <span>{hostel?.owner?.name || "Owner"}</span>
        </div>

        <div className="hostel-detail">
          <span>📞</span>
          <span>{hostel?.owner?.contactInfo || "N/A"}</span>
        </div>

        <div className="card-buttons">
          <a
            href={googleMapsLink}
            target="_blank"
            rel="noopener noreferrer"
            className="location-btn"
            onClick={(e) => e.stopPropagation()}
          >
            📍 Maps
          </a>

          <button
            className="book-button"
            onClick={(e) => {
              e.stopPropagation();
              handleclickOfCard && handleclickOfCard(hostel);
            }}
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default HostelCard;