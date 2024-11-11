import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import Modal from "react-modal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css"; // Import the DatePicker CSS
import { auth } from "../../../firebase/firebaseConfig";
import { useForm, Controller } from "react-hook-form";

Modal.setAppElement("#root");
export default function EditInsightsNActivity({
  isOpen,
  closeModal,
  selectedEmployee,
}) {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      topInsights: selectedEmployee?.topInsights || [],
      latestInsights: selectedEmployee?.latestInsights || [],
      latestActivity: selectedEmployee?.latestActivity || [],
  },
  });
  
  
  const queryClient = useQueryClient();
  const updateEmployeeInsightsMutation = useMutation({
    mutationFn: async (data) => {
      const token = await auth.currentUser.getIdToken();
      const response = await axios.put(
        "http://localhost:5000/api/updateEmployeeInsights",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["employees"]);
      closeModal();
    },
    onError: (error) => {
      console.error("Error updating employee insights/activity:", error);
    },
  });
  const onSubmit = async (data) => {
    const updatedData = {
      id: selectedEmployee._id,
      topInsights: data.topInsights,
      latestInsights: data.latestInsights,
      latestActivity: data.latestActivity.map((activity, index) => ({
        date: activity.date,
        activity: activity.activity,

      })),
    };
    console.log("Saving insights:", updatedData);
    await updateEmployeeInsightsMutation.mutateAsync(updatedData);
  };
  const parseDate = (dateStr) => {
    if (!dateStr) return null;
    const [day, month, year] = dateStr.split("/");
    return new Date(`${year}-${month}-${day}`);
  };

  // const formatDate = (date) => {
  //   if (!date) return "";
  //   const day = date.toString().padStart(2, "0");
  //   const month = (date.getMonth() + 1).toString().padStart(2, "0");
  //   const year = date.getFullYear();
  //   return `${day}/${month}/${year}`;
  // };

  return (
    <Modal
      isOpen={!!isOpen}
      onRequestClose={closeModal}
      contentLabel="Edit Insights Activity"
      style={customStyles}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        {isOpen === 1 && (
          <>
            <h2 style={headerStyle}>Top Insights</h2>
            <div style={containerStyle}>
              {selectedEmployee?.topInsights?.map((insight, index) => (
                <input
                  key={index}
                  type="text"
                  style={inputStyle}
                  placeholder={insight}
                  {...register(`topInsights.${index}`)}
                />
              ))}
            </div>
          </>
        )}

        {isOpen === 2 && (
          <>
            <h2 style={headerStyle}>Latest Insights</h2>
            <div style={containerStyle}>
              {selectedEmployee?.latestInsights?.map((insight, index) => (
                <input
                  key={index}
                  type="text"
                  style={inputStyle}
                  placeholder={insight}
                  {...register(`latestInsights.${index}`)}
                />
              ))}
            </div>
          </>
        )}
        {isOpen === 3 && (
          <>
            <h2 style={headerStyle}>Latest Activity</h2>
            <div style={containerStyle}>
              {selectedEmployee?.latestActivity?.map((value, index) => (
                <div key={index}>
                  <div className="cal-icon">
                    <label>Set Date</label>
                    <Controller
                      control={control}
                      name={`latestActivity.${index}.date`}
                      render={({ field }) => (
                        <DatePicker
                          selected={field.value} 
                          onChange={(date) =>
                            setValue(`latestActivity.${index}.date`, date)
                          }
                          dateFormat="dd/MM/yyyy"
                          className="form-control w-100"
                          
                        />
                      )}
                    />
                  </div>
                  <label>Set Activity</label>
                  <input
                    type="text"
                    style={inputStyle}
                    {...register(`latestActivity.${index}.activity`)}
                  />
                </div>
              ))}
            </div>
          </>
        )}
        <div style={buttonContainerStyle}>
          <button
            type="submit"
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
            {isSubmitting ? "Saving..." : "Save"}
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
      </form>
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
