import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHostels } from "../reduxSlices/hostelSlice";
import Header from "../atom/header";
import HostelCard from "../molecules/hostelCard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/ownerHome.css";

const BASE_URL = "https://hostelhunt-backend-6.onrender.com";

export const HostelOwnerHomePage = () => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [hostelForm, setHostelForm] = useState({
    name: "",
    location: "",
    imageurl: "",
    capacity: "",
    rent: "",
    deposit: "",
  });

  const { hostelData, loading, error } = useSelector((state) => state.Hostel);
  const authUser = useSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(fetchHostels());
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setHostelForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!authUser || !authUser.id) {
      toast.error("You must be logged in as a hostel owner to add a hostel.");
      return;
    }

    try {
      const formattedHostel = {
        ...hostelForm,
        capacity: parseInt(hostelForm.capacity, 10),
        rent: parseFloat(hostelForm.rent),
        deposit: parseFloat(hostelForm.deposit),
        owner: { id: authUser.id },
      };

      const response = await fetch(`${BASE_URL}/hostel`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formattedHostel),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Unable to add hostel");
      }

      toast.success("Hostel added successfully");
      setShowModal(false);
      setHostelForm({
        name: "",
        location: "",
        imageurl: "",
        capacity: "",
        rent: "",
        deposit: "",
      });
      dispatch(fetchHostels());
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="owner-home">
      <Header />
      <ToastContainer position="top-right" autoClose={2000} />

      <div className="dashboard-header">
        <div>
          <h1>🏠 My Hostels</h1>
          <p>Manage all your hostels from one place.</p>
        </div>

        <button className="add-hostel-btn" onClick={() => setShowModal(true)}>
          + Add Hostel
        </button>
      </div>

      {loading && (
        <div className="loading">
          <h3>Loading Hostels...</h3>
        </div>
      )}

      {error && (
        <div className="error-box">
          <h3>{error}</h3>
        </div>
      )}

      {!loading && hostelData?.length === 0 && (
        <div className="empty-state">
          <h2>No Hostels Found</h2>
          <p>Click "Add Hostel" to create your first hostel.</p>
        </div>
      )}

      <div className="hostel-grid">
        {hostelData?.map((hostel) => (
          <HostelCard
            key={hostel.id}
            hostel={hostel}
            handleclickOfCard={(selectedHostel) => console.log(selectedHostel)}
          />
        ))}
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <div className="modal-header">
              <h2>Add New Hostel</h2>
              <button className="close-btn" onClick={() => setShowModal(false)}>
                ✕
              </button>
            </div>

            <form className="hostel-form" onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Hostel Name"
                value={hostelForm.name}
                onChange={handleInputChange}
                required
              />

              <input
                type="text"
                name="location"
                placeholder="Location"
                value={hostelForm.location}
                onChange={handleInputChange}
                required
              />

              <input
                type="text"
                name="imageurl"
                placeholder="Image URL"
                value={hostelForm.imageurl}
                onChange={handleInputChange}
                required
              />

              <input
                type="number"
                name="capacity"
                placeholder="Capacity"
                value={hostelForm.capacity}
                onChange={handleInputChange}
                required
              />

              <input
                type="number"
                name="rent"
                placeholder="Monthly Rent"
                value={hostelForm.rent}
                onChange={handleInputChange}
                required
              />

              <input
                type="number"
                name="deposit"
                placeholder="Deposit"
                value={hostelForm.deposit}
                onChange={handleInputChange}
                required
              />

              <div className="modal-buttons">
                <button type="button" className="cancel-btn" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="save-btn">
                  Add Hostel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default HostelOwnerHomePage;