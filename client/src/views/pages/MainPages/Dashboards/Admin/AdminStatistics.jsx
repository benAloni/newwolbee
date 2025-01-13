import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import Select from "react-select";
import { fetchTeams } from "../../../../../services";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { userProfile } from "../../../../../imgs";
import HelfBar from "./HelfBar";
import { fetchUserProfilePic } from "../../../../../services";
import {
  fetchEmployees,
  fetchEmployeesProfilePics,
} from "../../../../../services";
import EmployeesWorkingHours from "./EmployeesWorkingHours";
import { format } from "date-fns"; 
import "./scrollBarMainEmployee.css";
import PopUp from "../../../Employees/PopUp";

export default function AdminStatistics() {
  // states
  const [selectedTeam, setSelectedTeam] = useState("");
  const [userProfileImage, setUserProfileImage] = useState("");
  const [values, setValues] = useState([]);
  const [allEmployees, setAllEmployees] = useState([]);
  const [favoriteEmployees, setFavoriteEmployees] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const [progress, setProgress] = useState(0);
  const username = useSelector((state) => state.auth.user?.fullName);
  const user = useSelector((state) => state.auth?.user.uid);
  const [greeting, setGreeting] = useState("");
  const [filteredEmployees, setFilteredEmployees] = useState([]);

  const queryClient = useQueryClient();

  useEffect(() => {
    const today = new Date();
    const hours = today.getHours(); // Get the current hour (0-23)

    let dayPeriod = "";

    if (hours < 12) {
      dayPeriod = "Good Morning"; // Before 12 AM - Morning
    } else if (hours < 18) {
      dayPeriod = "Good Afternoon"; // Between 12 PM and 6 PM - Afternoon
    } else {
      dayPeriod = "Good Evening"; // After 6 PM - Evening
    }

    setGreeting(dayPeriod); // Set the greeting message
  }, []);

  const { data: employees } = useQuery({
    queryKey: ["employees"],
    queryFn: fetchEmployees,
  });

  const { data: teams } = useQuery({
    queryKey: ["teams"],
    queryFn: fetchTeams,
  });

  useEffect(() => {
    if (employees) {
      const filteredTeam = selectedTeam
        ? employees.filter((employee) => employee.team === selectedTeam)
        : employees;

      setFilteredEmployees(filteredTeam);
    }
  }, [selectedTeam, employees]);

  const handleSelect = (option) => {
    setSelectedTeam(option.label);
    queryClient.invalidateQueries(["employees"]);
  };

  // ___________________

  // __________________

  const sortEmployeesByBirthday = (employees) => {
    const currentDate = new Date();
    return employees
      .map((employee) => {
        const date = new Date(employee.dateOfBirth);
        const birthdayThisYear = new Date(
          currentDate.getFullYear(),
          date.getMonth(),
          date.getDate() - 1
        );
        return { ...employee, birthdayThisYear };
      })
      .sort((a, b) => a.birthdayThisYear - b.birthdayThisYear);
  };

  const sortedEmployees = employees ? sortEmployeesByBirthday(employees) : [];

  const employeesFormattedBirthdays = () => {
    return sortedEmployees.slice(startIndex, startIndex + 3);
  };

  const handleSeeAllClick = () => {
    if (startIndex + 3 >= sortedEmployees.length) {
      setStartIndex(0);
    } else {
      setStartIndex(startIndex + 3);
    }
  };

  // ________________

  const toggleFavoriteEmployee = (e, employeeId) => {
    e.preventDefault();
    const updatedFavoriteEmployees = [...favoriteEmployees];

    if (updatedFavoriteEmployees.includes(employeeId)) {
      updatedFavoriteEmployees.splice(
        updatedFavoriteEmployees.indexOf(employeeId),
        1
      );
    } else {
      updatedFavoriteEmployees.push(employeeId);
    }

    setFavoriteEmployees(updatedFavoriteEmployees);
  };

  // ________________

  useEffect(() => {
    const targetPercentage = 60;
    const duration = 2000;
    const interval = 10;
    const step = targetPercentage / (duration / interval);

    const animation = setInterval(() => {
      setPercentage((prev) => {
        if (prev + step >= targetPercentage) {
          clearInterval(animation);
          return targetPercentage;
        }
        return prev + step;
      });
    }, interval);

    return () => clearInterval(animation);
  }, []);

  // ________________

  useEffect(() => {
    const targetValue = 100;
    const animationDuration = 2000;
    const intervalTime = 10;
    const increment = targetValue / (animationDuration / intervalTime);

    const animationInterval = setInterval(() => {
      setProgress((previousValue) => {
        if (previousValue + increment >= targetValue) {
          clearInterval(animationInterval);
          return targetValue;
        }
        return previousValue + increment;
      });
    }, intervalTime);

    return () => clearInterval(animationInterval);
  }, []);
  // _______________

  const today = new Date();
  const f = new Intl.DateTimeFormat("en-us", {
    dayPeriod: "long",
  });

  // _______________
  // css

  const styles = {
    card: {
      width: "368px",
      height: "300px",
      backgroundColor: "#fffef8",
      margin: "20px",
      borderRadius: "2.5%",
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
    },
    title: {
      fontSize: "22px",
      fontWeight: "700",
      // fontFamily: "Outfit Light",
      marginLeft: "70px",
      marginTop: "25px",
      textAlign: "center", // מרכז את הטקסט
    },

    seeAllButton: {
      fontSize: "16px",
      color: "black",
      background: "none",
      border: "none",
      cursor: "pointer",
      marginTop: "25px",
    },
    birthdayList: {
      listStyle: "none",
      padding: "0",
      margin: "0",
      marginTop: "10px",
      marginLeft: "15px",
    },
    birthdayItem: {
      fontSize: "18px",
      // fontFamily: "Outfit Light",
      marginBottom: "15px",
    },
    date: {
      marginRight: "10px",
      fontWeight: "bold",
      // fontFamily: "Outfit Light",
    },
    name: {
      fontWeight: "bold",
      // fontFamily: "Outfit Light",
    },
    hobby: {
      marginTop: "4px",
      fontSize: "14px",
      // fontFamily: "Outfit Light",
      color: "#555",
      fontWeight: "bold", // Makes the text bold
    },
  };

  return (
    <div
      className="newHrS"
      style={{
        marginLeft: "195px",
        height: "100%",
        background:
          "linear-gradient(to bottom right, #ffcc80, rgb(28 105 123 / 3%))",
        position: "fixed",
        width: "100%",
        marginBottom: "80px",
      }}
    >
      <div
        className="newHeader"
        style={{ marginTop: "20px", fontWeight: "1000", height: "100px" }}
      >
        <div className="newUser" style={{ marginLeft: "1130px" }}>
          <span> {username ? `Hey ${username}! ` : "Admin"}</span>
          <span className="user-img me-1">
            <img
              style={{ width: "30px", height: "30px", marginLeft: "5px" }}
              src={userProfileImage || userProfile}
              alt="Profile"
              onError={() =>
                console.error("Error loading image:", userProfileImage)
              }
            />

            <span className="status online" />
          </span>
        </div>
        <div className="newHrS" style={{ display: "flex" }}>
          <div>
            <h1
              className="nH1"
              style={{
                textAlign: "left",
                top: "50px",
                marginLeft: "65px",
                fontWeight: "850",
                fontSize: "40px",
              }}
            >
              {greeting}
            </h1>
          </div>
          <div
            className="newSelect"
            style={{
              padding: "0px",
              position: "relative",
              top: "5px",
              borderRadius: "10px",
              width: "500px",
              height: "50px",
              textAlign: "center",
              margin: "0 auto",
              left: "340px",
              bottom: "0px",
            }}
          >
            <Select
              options={teams?.map((team) => ({
                value: team._id,
                label: team.name,
              }))}
              onChange={handleSelect}
              placeholder="Select a team"
              className="w-50 m-3"
            />
          </div>
        </div>
      </div>
      <div style={{ height: "80vh", overflowY: "auto", padding: "10px" }}>
        <div className="newContent" style={{ marginLeft: "50px" }}>
          <div
            className="newRow1"
            style={{ display: "flex", flexWrap: "wrap" }}
          >
            {/* Members Card */}
            <div
              className="newCard"
              style={{
                width: "480px",
                margin: "20px",
                backgroundColor: "rgba(255, 254, 248, 0.8)", // שקיפות של 80% לקוביה
                borderRadius: "2.5%",
                maxHeight: "340px",
              }}
            >
              <h3
                className="titelH3"
                style={{
                  marginLeft: "-15px",
                  marginTop: "22px",
                  fontWeight: "700",
                  textAlign: "center", // מרכז את הכותרת
                }}
              >
                Members
              </h3>

              <br />
              <div
                className="scrollableContent"
                style={{
                  maxHeight: "220px",
                  overflowY: "auto",
                  padding: "10px",
                }}
              >
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: "15px",
                    marginTop: "20px",
                  }}
                >
                  {/* Render Employees */}
                  {employees &&
                    filteredEmployees?.map((employee) => (
                      <div
                        key={employee._id}
                        className="profile-img"
                        style={{
                          textAlign: "center",
                          borderRadius: "10px",
                          padding: "20px",
                          backgroundColor: "#fffef8",
                        }}
                      >
                        <Link
                          to={`/profile/${employee._id}`}
                          className="avatar"
                        >
                          <img
                            loading="lazy"
                            src={employee.imageUrl}
                            alt={employee.fullName}
                            style={{
                              width: "80px",
                              height: "80px",
                              borderRadius: "50%",
                              marginBottom: "8px",
                            }}
                          />
                        </Link>
                        <h4
                          className="user-name"
                          style={{
                            fontSize: "12px",
                            margin: "0",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          <Link
                            to={`/profile/${employee._id}`}
                            style={{ textDecoration: "none", color: "inherit" }}
                          >
                            <br />
                            <br />
                            {employee.fullName}
                          </Link>
                        </h4>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            {/* Team Satisfaction Card */}
            <div
              className="newCard"
              style={{
                width: "300px",
                height: "300px",
                margin: "20px",
                backgroundColor: "rgba(255, 254, 248, 0.8)", // שקיפות של 80% לקוביה
                borderRadius: "2.5%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center", // מרכוז של התוכן בגרף
                justifyContent: "center", // מרכוז של התוכן בגרף
                textAlign: "center", // מרכוז הכותרת
              }}
            >
              <h3
                className="titelH3"
                style={{ marginTop: "-15px", fontWeight: "700" }}
              >
                Team Satisfaction
              </h3>
              <div
                style={{
                  width: "180px", // הגדלה של העיגול
                  height: "180px", // הגדלה של העיגול
                  marginTop: "20px",
                }}
              >
                <CircularProgressbar
                  value={percentage}
                  text={`${Math.round(percentage)}%`}
                  styles={buildStyles({
                    textColor: "black",
                    pathColor: "#ffb28d",
                    trailColor: "#cfccca",
                    strokeLinecap: "round",
                    pathTransitionDuration: 0.5,
                    strokeWidth: 6, // הדקתי את הקו של העיגול
                  })}
                />
              </div>
            </div>

            {/* Utilization of Vacation Days */}
            <div
              className="newCard"
              style={{
                width: "368px",
                margin: "20px",
                backgroundColor: "rgba(255, 254, 248, 0.8)", // שקיפות של 80% לקוביה
                borderRadius: "2.5%",
                textAlign: "center", // מרכז את הכותרת
              }}
            >
              <h3
                className="titelH3"
                style={{
                  marginLeft: "15px",
                  marginTop: "25px",
                  fontWeight: "700",
                  textAlign: "center", // מרכז את הכותרת
                }}
              >
                Utilization of Vacation Days
              </h3>

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  marginTop: "20px",
                }}
              >
                {/* מרכז את הגרף */}
                <HelfBar />
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  marginTop: "20px",
                }}
              >
                <h5 style={{ textAlign: "center", opacity: 0.8 }}>
                  At this stage of the year, it is
                </h5>
                <h5 style={{ textAlign: "center", opacity: 0.8 }}>
                  recommended to use at least 76%
                </h5>
              </div>
            </div>
          </div>

          <div style={{ height: "270px", display: "flex" }}>
            {/* Employees Over 100% Hours Card */}
            <div
              className="newCard"
              style={{
                width: "480px",
                height: "300px",
                margin: "20px",
                backgroundColor: "rgba(255, 254, 248, 0.8)", // שקיפות של 80% לקוביה
                borderRadius: "2.5%",
              }}
            >
              <h3
                className="titelH3"
                style={{
                  marginLeft: "15px",
                  marginTop: "25px",
                  fontWeight: "700",
                  textAlign: "center", // מרכז את הכותרת
                }}
              >
                Employees Over 100% Hours
              </h3>

              <EmployeesWorkingHours employees={employees}></EmployeesWorkingHours>
            </div>

            {/* Conversations 1:1 Card */}
            <div
              className="newCard"
              style={{
                width: "300px",
                height: "300px",
                margin: "20px",
                backgroundColor: "rgba(255, 254, 248, 0.8)", // שקיפות של 80% לקוביה
                borderRadius: "2.5%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center", // מרכוז של התוכן בגרף
                justifyContent: "center", // מרכוז של התוכן בגרף
                textAlign: "center", // מרכוז הכותרת
              }}
            >
              <h3
                className="titelH3"
                style={{ marginTop: "-15px", fontWeight: "700" }}
              >
                Conversations 1:1
              </h3>
              <div
                style={{
                  width: "180px", // הגדלה של העיגול
                  height: "180px", // הגדלה של העיגול
                  marginTop: "20px",
                }}
              >
                <CircularProgressbar
                  value={percentage}
                  text={"5/8"}
                  styles={buildStyles({
                    textColor: "black",
                    pathColor: "rgb(20 117 119)",
                    trailColor: "#cfccca",
                    strokeLinecap: "round",
                    pathTransitionDuration: 0.5,
                    strokeWidth: 6, // הדקתי את הקו של העיגול
                  })}
                />
              </div>
            </div>

            {/* Upcoming Birthdays Card */}
            <div style={styles.card}>
              <div style={styles.header}>
                <h3 style={styles.title}>Upcoming Birthdays</h3>

                <button style={styles.seeAllButton} onClick={handleSeeAllClick}>
                  {"next >"}
                </button>

                <br />
                <br />
              </div>
              <ul style={styles.birthdayList}>
                {employeesFormattedBirthdays().map((employee, index) => (
                  <li key={index} style={styles.birthdayItem}>
                    <span style={styles.date}>
                      {new Date(employee.birthdayThisYear).toLocaleDateString(
                        "en-GB",
                        {
                          day: "2-digit",
                          month: "2-digit",
                        }
                      )}
                    </span>
                    <span style={styles.name}>{employee.fullName}</span>
                    <div style={styles.hobby}>{employee.interestingFact}</div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <PopUp></PopUp>
    </div>
  );
}
