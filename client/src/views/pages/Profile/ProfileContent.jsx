import React, { useState, useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { TiPin } from "react-icons/ti";

import EditInsightsActivity from "./EditInsightsNActivities";

export const ProjectDetails = ({ selectedEmployee }) => {
  const [popupEdit, setPopupEdit] = useState(0);
  // const [showAllData, setShowAllData] = useState({});
  const [importanceLevels, setImportanceLevels] = useState({
    management: "High",
    turnover: "Medium",
    workLifeBalance: "Low",
    managerialAttention: "High",
    professionalism: "Low",
  });

  // console.log(selectedEmployee);
  // useEffect(() => {

  //   if (selectedEmployee) {
  //     setShowAllData(selectedEmployee);
  //     console.log(selectedEmployee);
  //   }
  // }, [selectedEmployee]); // Update when `selectedEmployee` changes

  // const topInsights = showAllData.topInsights || [];
  // const latestInsights = showAllData.latestInsights || [];

  // if (!selectedEmployee) {
  //   return <div></div>;
  // }
  // selectedEmployee.latestInsights.map((val) => {
  //   return console.log(val.Info1);
  // });

  const getValue = (importance) => {
    switch (importance) {
      case "High":
        return 100; // מלא
      case "Medium":
        return 50; // חצי מלא
      case "Low":
        return 25; // רבע מלא
      default:
        return 0; // ריק
    }
  };

  const circleContainerStyle = {
    width: "120px",
    margin: "10px",
    position: "relative",
    transition: "transform 0.3s ease",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    borderRadius: "50%",
    overflow: "hidden",
  };

  const circleTextStyle = {
    fontSize: "12px",
    color: "#333",
    textAlign: "center",
    fontWeight: "bold",
    height: "20px",
    marginTop: "30px",
  };

  const wrapperStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "20px",
  };

  const experienceData = [
    {
      id: 1,
      name: "Compensation",
      time: "21/08/2023",
    },
    {
      id: 2,
      name: "Development plan",
      time: "10/01/2024",
    },
    {
      id: 3,
      name: "Personal interview",
      time: "17/04/2024",
    },
  ];

  const titleStyle = {
    textAlign: "center",
    marginTop: "0",
  };

  const paragraphStyle = {
    position: "relative",
    paddingLeft: "35px",
    marginBottom: "10px",
    fontSize: "16px",
  };

  const pinIconSize = 24;

  const getColor = (importance) => {
    switch (importance) {
      case "High":
        return "#FF0000";
      case "Medium":
        return "#FFA500";
      case "Low":
        return "#008000";
      default:
        return "#000000";
    }
  };

  const containerStyle = {
    display: "flex",
    gap: "15px",
  };

  const boxStyle = {
    backgroundColor: "#DCDCDC",
    width: "380px",
    height: "400px",
    padding: "20px",
    marginBottom: "20px",
    border: "solid black 0.3px",
    borderRadius: "10px",
  };

  const openModal1 = () => {
    setPopupEdit(1);
  };
  const openModal2 = () => {
    setPopupEdit(2);
  };
  const openModal3 = () => {
    setPopupEdit(3);
  };

  const closeModal = () => {
    setPopupEdit(0);
  };

  // Example function to handle updates
  // const handleUpdate = (updatedData) => {
  //   setShowAllData((prevData) => ({
  //     ...prevData,
  //     ...updatedData, // Apply updates to the state
  //   }));
  // };

  return (
    <div className="tab-content">
      {popupEdit >= 1 && (
        <EditInsightsActivity
          isOpen={popupEdit}
          closeModal={closeModal}
          selectedEmployee={selectedEmployee}
          // handleUpdate={handleUpdate}
          // showAllData={showAllData}
        />
      )}

      <div className="pro-overview tab-pane fade show active" id="emp_assets">
        <div style={containerStyle}>
          <div style={boxStyle}>
            <button
              onClick={openModal1}
              className="edit-icon"
              style={{
                width: "auto",
                display: "inline-flex",
                padding: "5px 10px",
              }}
            >
              <i className="fa-solid fa-pencil" />
            </button>

            <h3 style={titleStyle}>Top Insights</h3>
            <hr />
            <div style={{ marginLeft: "15px" }}>
              {selectedEmployee?.topInsights && 
                [...new Set(selectedEmployee?.topInsights)].map(
                  (insight, index) => (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        flexDirection: "column", // Stack insights vertically
                        marginBottom: "20px", // Space between each insight
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          marginBottom: "10px",
                        }}
                      >
                        <TiPin
                          style={{
                            color: "#FF902F",
                            marginRight: "10px", // Space between the icon and text
                            flexShrink: 0, // Prevent the icon from shrinking
                          }}
                          size={pinIconSize}
                        />
                        <div style={{ wordBreak: "break-word" }}>{insight}</div>
                      </div>
                    </div>
                  )
                )}
            </div>
          </div>
          <div style={boxStyle}>
            <button
              onClick={openModal2}
              className="edit-icon"
              style={{
                width: "auto",
                display: "inline-flex",
                padding: "5px 10px",
              }}
            >
              <i className="fa-solid fa-pencil" />
            </button>
            <h3 style={titleStyle}>Latest Insights</h3>
            <hr />
            <div style={{ marginLeft: "15px" }}>
              { selectedEmployee?.latestInsights &&
              [...new Set(selectedEmployee?.latestInsights)].map(
                (insight, index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      marginBottom: "20px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "10px",
                      }}
                    >
                      <TiPin
                        style={{
                          color: "#FF902F",
                          marginRight: "10px",
                          flexShrink: 0,
                        }}
                        size={pinIconSize}
                      />
                      <div style={{ wordBreak: "break-word" }}>{insight}</div>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>

          <div className="col-md-6 d-flex" style={{ width: "450px" }}>
            <div className="card profile-box flex-fill">
              <div className="card-body">
                <button
                  onClick={openModal3}
                  className="edit-icon"
                  style={{
                    width: "auto",
                    display: "inline-flex",
                    padding: "5px 10px",
                  }}
                >
                  <i className="fa-solid fa-pencil" />
                </button>
                <h3 style={{ fontWeight: "bold", fontSize: "24px" }}>
                  Latest Activities
                </h3>
                <hr />
                <div className="experience-box">
                  <div style={{ marginLeft: "15px" }}>
                    { selectedEmployee?.latestActivity &&
                    selectedEmployee?.latestActivity.map((val, index) => {
                      const entries = Object.entries(val);
                      return entries.map(([key, value], i) => {
                        const isDate =
                          typeof value === "string" &&
                          !isNaN(Date.parse(value));
                        const formattedValue = isDate
                          ? new Date(value).toLocaleDateString("en-GB")
                          : value;

                        return (
                          <div
                            key={`${index}-${i}`}
                            style={{
                              marginBottom: i % 2 === 1 ? "20px" : "0",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                marginRight: "10px",
                              }}
                            >
                              <div
                                style={{
                                  width: "8px",
                                  height: "8px",
                                  borderRadius: "50%",
                                  backgroundColor: "#000",
                                }}
                              ></div>
                              {i % 2 === 0 && i < entries.length - 1 && (
                                <div
                                  style={{
                                    width: "2px",
                                    height: "20px",
                                    backgroundColor: "#000",
                                  }}
                                ></div>
                              )}
                            </div>
                            <div>
                              {i % 2 === 0 ? (
                                <div style={{ fontWeight: "bold" }}>
                                  {formattedValue}
                                </div>
                              ) : (
                                <div>{formattedValue}</div>
                              )}
                            </div>
                          </div>
                        );
                      });
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style={wrapperStyle}>
          <div style={{ textAlign: "center" }}>
            <h4 style={circleTextStyle}>Management</h4>
            <div style={circleContainerStyle}>
              <CircularProgressbar
                value={getValue(importanceLevels.management)}
                text={`${importanceLevels.management}`}
                styles={buildStyles({
                  textSize: "20px",
                  textColor: getColor(importanceLevels.management),
                  pathColor: getColor(importanceLevels.management),
                  trailColor: "#d6d6d6",
                  pathTransitionDuration: 0.5,
                })}
              />
            </div>
          </div>
          <div style={{ textAlign: "center" }}>
            <h4 style={circleTextStyle}>Turnover</h4>
            <div style={circleContainerStyle}>
              <CircularProgressbar
                value={getValue(importanceLevels.turnover)}
                text={`${importanceLevels.turnover}`}
                styles={buildStyles({
                  textSize: "20px",
                  textColor: getColor(importanceLevels.turnover),
                  pathColor: getColor(importanceLevels.turnover),
                  trailColor: "#d6d6d6",
                  pathTransitionDuration: 0.5,
                })}
              />
            </div>
          </div>
          <div style={{ textAlign: "center" }}>
            <h4 style={circleTextStyle}>Work-Life</h4>
            <div style={circleContainerStyle}>
              <CircularProgressbar
                value={getValue(importanceLevels.workLifeBalance)}
                text={`${importanceLevels.workLifeBalance}`}
                styles={buildStyles({
                  textSize: "20px",
                  textColor: getColor(importanceLevels.workLifeBalance),
                  pathColor: getColor(importanceLevels.workLifeBalance),
                  trailColor: "#d6d6d6",
                  pathTransitionDuration: 0.5,
                })}
              />
            </div>
          </div>
          <div style={{ textAlign: "center" }}>
            <h4 style={circleTextStyle}>Managerial</h4>
            <div style={circleContainerStyle}>
              <CircularProgressbar
                value={getValue(importanceLevels.managerialAttention)}
                text={`${importanceLevels.managerialAttention}`}
                styles={buildStyles({
                  textSize: "20px",
                  textColor: getColor(importanceLevels.managerialAttention),
                  pathColor: getColor(importanceLevels.managerialAttention),
                  trailColor: "#d6d6d6",
                  pathTransitionDuration: 0.5,
                })}
              />
            </div>
          </div>
          <div style={{ textAlign: "center" }}>
            <h4 style={circleTextStyle}>Professional</h4>
            <div style={circleContainerStyle}>
              <CircularProgressbar
                value={getValue(importanceLevels.professionalism)}
                text={`${importanceLevels.professionalism}`}
                styles={buildStyles({
                  textSize: "20px",
                  textColor: getColor(importanceLevels.professionalism),
                  pathColor: getColor(importanceLevels.professionalism),
                  trailColor: "#d6d6d6",
                  pathTransitionDuration: 0.5,
                })}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ListItem = ({ title, text }) => (
  <li>
    <div className="title">{title}</div>
    <div className="text">{text}</div>
  </li>
);

export default ProjectDetails;
