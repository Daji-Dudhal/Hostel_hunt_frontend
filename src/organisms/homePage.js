import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHostels } from "../reduxSlices/hostelSlice";
import HostelCard from "../molecules/hostelCard";
import Header from "../atom/header";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { hostelData, loading, error } = useSelector(
    (state) => state.Hostel
  );

  useEffect(() => {
    dispatch(fetchHostels("/hostel"));
  }, [dispatch]);

  const handleclickOfCard = (hostel) => {
    console.log("Selected Hostel:", hostel);

    toast.success("Hostel selected successfully!");

    // Navigate to hostel details page
    navigate(`/hostel/${hostel.id}`);

    // OR if you don't have a details page, simply remove the above line.
  };

  return (
    <div>
      <Header />
      <ToastContainer />

      {loading && <p>Loading...</p>}

      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          justifyContent: "center",
          padding: "20px",
        }}
      >
        {hostelData?.map((hostel) => (
          <HostelCard
            key={hostel.id}
            hostel={hostel}
            handleclickOfCard={() => handleclickOfCard(hostel)}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;