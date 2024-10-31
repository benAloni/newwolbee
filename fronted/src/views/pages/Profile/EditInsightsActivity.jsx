import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import Modal from "react-modal";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useSelector } from "react-redux";
import "react-datepicker/dist/react-datepicker.css"; // Import the DatePicker CSS

Modal.setAppElement("#root"); // Make sure this matches your root element in the DOM

export default function EditInsightsActivity({
  isOpen,
  closeModal,
  selectedEmployee,
  handleUpdate,
  showAllData,
}) {
  const user = useSelector((state) => state.user.user);
  const [topInsights, setTopInsights] = useState({
    Insight1: "",
    Insight2: "",
    Insight3: "",
  });
  const [latestInfo, setLatestInfo] = useState({
    LatestInfo1: "",
    LatestInfo2: "",
    LatestInfo3: "",
  });
  const [latestActivity, setLatestActivity] = useState({
    LatestActivity1: "",
    date1: "",
    LatestActivity2: "",
    date2: "",
    LatestActivity3: "",
    date3: "",
  });

  const updateEmployeeInsightsActivityMutation = useMutation({
    mutationFn: async ({ Id, TopInsights, LatestInfo, LatestActivity }) => {
      const response = await axios.post(
        "http://localhost:5000/api/updateEmployeeInsightsActivity",
        { Id, TopInsights, LatestInfo, LatestActivity },
        {
          headers: {
            Authorization: `Bearer ${user.token}`, // Properly include the token in headers
          },
        }
      );
      return response.data;
    },
    onSuccess: (data) => {
      console.log("Employee updated successfully:", data);
      handleUpdate(data);
      closeModal(); // Close the modal after success
    },
    onError: (error) => {
      console.error("Error updating employee insights/activity:", error);
    },
  });
  // Utility function to parse date from "dd/MM/yyyy" to a Date object
  const parseDate = (dateStr) => {
    const [day, month, year] = dateStr.split("/");
    return new Date(`${year}-${month}-${day}`);
  };

  // Function to format Date object to "dd/MM/yyyy"
  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleChange = (event, key, setFunction) => {
    setFunction((prevState) => ({
      ...prevState,
      [key]: event.target.value,
    }));
  };

  const handleSave = () => {
    const updatedData = {
      Id: selectedEmployee._id,
      TopInsights: topInsights,
      LatestInfo: latestInfo,
      LatestActivity: latestActivity,
    };

    console.log("Saving insights:", updatedData);
    updateEmployeeInsightsActivityMutation.mutateAsync(updatedData); // Trigger the mutation to save the data
  };

  useEffect(() => {
    if (selectedEmployee) {
      // Assuming TopInsights, LatestInfo, and LatestActivity are arrays
      const topInsights = showAllData.TopInsights[0] || {};
      const latestInfo = showAllData.LatestInfo[0] || {};
      const latestActivity = showAllData.LatestActivity[0] || {};

      setTopInsights({
        Insight1: topInsights.Insight1 || "",
        Insight2: topInsights.Insight2 || "",
        Insight3: topInsights.Insight3 || "",
      });

      setLatestInfo({
        LatestInfo1: latestInfo.LatestInfo1 || "",
        LatestInfo2: latestInfo.LatestInfo2 || "",
        LatestInfo3: latestInfo.LatestInfo3 || "",
      });

      setLatestActivity({
        LatestActivity1: latestActivity.LatestActivity1 || "",
        date1: latestActivity.date1
          ? formatDate(parseDate(latestActivity.date1))
          : "",
        LatestActivity2: latestActivity.LatestActivity2 || "",
        date2: latestActivity.date2
          ? formatDate(parseDate(latestActivity.date2))
          : "",
        LatestActivity3: latestActivity.LatestActivity3 || "",
        date3: latestActivity.date3
          ? formatDate(parseDate(latestActivity.date3))
          : "",
      });
    }
  }, [selectedEmployee]);

  // Handling date change
  const handleDateChange = (date, field) => {
    setLatestActivity((prevState) => ({
      ...prevState,
      [field]: date ? formatDate(date) : "", // Convert Date object back to "dd/MM/yyyy"
    }));
  };

  return (
    <Modal
      isOpen={!!isOpen} // Ensure isOpen is a boolean
      onRequestClose={closeModal}
      contentLabel="Edit Insights Activity"
      style={customStyles}
    >
      {isOpen === 1 && (
        <>
          <h2 style={headerStyle}>Wolbee’s Top Insights</h2>
          <div style={containerStyle}>
            <input
              type="text"
              style={inputStyle}
              value={topInsights.Insight1}
              onChange={(e) => handleChange(e, "Insight1", setTopInsights)}
            />
            <input
              type="text"
              style={inputStyle}
              value={topInsights.Insight2}
              onChange={(e) => handleChange(e, "Insight2", setTopInsights)}
            />
            <input
              type="text"
              style={inputStyle}
              value={topInsights.Insight3}
              onChange={(e) => handleChange(e, "Insight3", setTopInsights)}
            />
          </div>
        </>
      )}

      {isOpen === 2 && (
        <>
          <h2 style={headerStyle}>Latest Insights</h2>
          <div style={containerStyle}>
            <input
              type="text"
              style={inputStyle}
              value={latestInfo.LatestInfo1}
              onChange={(e) => handleChange(e, "LatestInfo1", setLatestInfo)}
            />
            <input
              type="text"
              style={inputStyle}
              value={latestInfo.LatestInfo2}
              onChange={(e) => handleChange(e, "LatestInfo2", setLatestInfo)}
            />
            <input
              type="text"
              style={inputStyle}
              value={latestInfo.LatestInfo3}
              onChange={(e) => handleChange(e, "LatestInfo3", setLatestInfo)}
            />
          </div>
        </>
      )}

      {isOpen === 3 && (
        <>
          <h2 style={headerStyle}>Latest Activity</h2>
          <div style={containerStyle}>
            <div className="cal-icon">
              <DatePicker
                selected={
                  latestActivity.date1 ? parseDate(latestActivity.date1) : null
                }
                onChange={(date) => handleDateChange(date, "date1")}
                dateFormat="dd/MM/yyyy"
                className="form-control w-100"
              />
            </div>
            <input
              type="text"
              style={inputStyle}
              value={latestActivity.LatestActivity1}
              onChange={(e) =>
                handleChange(e, "LatestActivity1", setLatestActivity)
              }
            />
            <div className="cal-icon">
              <DatePicker
                selected={
                  latestActivity.date2 ? parseDate(latestActivity.date2) : null
                }
                onChange={(date) => handleDateChange(date, "date2")}
                dateFormat="dd/MM/yyyy"
                className="form-control w-100"
              />
            </div>
            <input
              type="text"
              style={inputStyle}
              value={latestActivity.LatestActivity2}
              onChange={(e) =>
                handleChange(e, "LatestActivity2", setLatestActivity)
              }
            />
            <div className="cal-icon">
              <DatePicker
                selected={
                  latestActivity.date3 ? parseDate(latestActivity.date3) : null
                }
                onChange={(date) => handleDateChange(date, "date3")}
                dateFormat="dd/MM/yyyy"
                className="form-control w-100"
              />
            </div>
            <input
              type="text"
              style={inputStyle}
              value={latestActivity.LatestActivity3}
              onChange={(e) =>
                handleChange(e, "LatestActivity3", setLatestActivity)
              }
            />
          </div>
        </>
      )}
      <div style={buttonContainerStyle}>
        <button
          onClick={handleSave}
          style={{
            backgroundColor: "#FFA500", // Orange background
            color: "black", // Black text
            border: "none",
            padding: "10px 20px",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "16px",
            transition: "background-color 0.3s",
            marginRight: "10px",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#e69500")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#FFA500")}
        >
          {updateEmployeeInsightsActivityMutation.isLoading
            ? "Saving..."
            : "Save"}
        </button>
        <button
          onClick={closeModal}
          style={{
            backgroundColor: "#ccc",
            color: "black",
            border: "none",
            padding: "10px 20px",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Cancel
        </button>
      </div>
    </Modal>
  );
}

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: "20px",
    borderRadius: "8px",
    maxWidth: "500px", // Set a max width for the modal
    width: "100%", // Full width
  },
};

const inputStyle = {
  padding: "12px",
  border: "1px solid #ccc",
  borderRadius: "4px",
  fontSize: "16px",
  width: "100%", // Full width of the container
};

const containerStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "12px",
};

const buttonContainerStyle = {
  display: "flex",
  justifyContent: "center", // Center buttons horizontally
  marginTop: "20px",
};

const headerStyle = {
  padding: "10px",
  margin: 0,
};
