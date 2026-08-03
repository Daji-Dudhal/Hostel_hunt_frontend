import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHostels } from "../reduxSlices/hostelSlice";
import Header from "../atom/header";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DeleteHostelCard from "../molecules/deleteHostelCard";

const BASE_URL = "https://hostelhunt-backend-6.onrender.com";

export const AdminHomePage = () => {
  const dispatch = useDispatch();

  const [hostelDetails, setHostelDetails] = useState(null);

  const { hostelData, loading, error } = useSelector(
    (state) => state.Hostel
  );

  useEffect(() => {
    dispatch(fetchHostels());
  }, [dispatch]);

  const handleDeleteClick = async (id) => {
    try {
      // Fetch hostel details
      const response = await fetch(`${BASE_URL}/hostel/${id}`);

      if (!response.ok) {
        throw new Error("Failed to fetch hostel details");
      }

      const data = await response.json();
      setHostelDetails(data);

      const confirmDelete = window.confirm(
        "Are you sure you want to delete this hostel?"
      );

      if (!confirmDelete) {
        toast.info("Hostel deletion cancelled.");
        return;
      }

      // Delete hostel
      const deleteResponse = await fetch(`${BASE_URL}/hostel/${id}`, {
        method: "DELETE",
      });

      if (!deleteResponse.ok) {
        throw new Error("Failed to delete hostel");
      }

      toast.success("Hostel deleted successfully!");

      // Refresh hostel list
      dispatch(fetchHostels());
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div>
      <Header />
      <ToastContainer />

      {loading && <p>Loading...</p>}

      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && hostelData?.length === 0 && (
        <p>No hostels available.</p>
      )}

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
        }}
      >
        {hostelData?.map((hostel) => (
          <DeleteHostelCard
            key={hostel.id}
            hostel={hostel}
            handleclickOfCard={() => {}}
            handleDeleteClick={() => handleDeleteClick(hostel.id)}
          />
        ))}
      </div>

      {hostelDetails && (
        <div>
          <h2>Hostel Details</h2>
          <pre>{JSON.stringify(hostelDetails, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};