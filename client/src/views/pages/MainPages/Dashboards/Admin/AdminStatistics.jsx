import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import Select from "react-select";
import { fetchTeams } from "../../../../../services";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { userProfile } from "../../../../../imgs";
import EmployeesVacationUtilizationBar from "./EmployeesVacationUtilization";
import { fetchEmployees, fetchUserProfilePic } from "../../../../../services";
import EmployeesWorkingHours from "./EmployeesWorkingHours";
import CreateEmployeeEvent from "../../../Employees/PersonalEvents/CreateEmployeeEvent";
import { GrLinkNext } from "react-icons/gr";
export default function AdminStatistics() {
  // states
  const [selectedTeam, setSelectedTeam] = useState("");
  const [userProfileImage, setUserProfileImage] = useState("");
  const [favoriteEmployees, setFavoriteEmployees] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const [progress, setProgress] = useState(0);
  const username = useSelector((state) => state.auth.user?.fullName);
  const uid = useSelector((state) => state.auth?.user.uid);
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
  const { data: profileImg } = useQuery({
    queryKey: ["user-profile-pic"],
    queryFn: () => fetchUserProfilePic(uid),
    enabled: !!uid,
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
    if (profileImg) {
      setUserProfileImage(profileImg);
    } else {
      setUserProfileImage(userProfile);
    }
  }, [selectedTeam, employees]);

  const handleSelect = (option) => {
    setSelectedTeam(option.label);
    queryClient.invalidateQueries(["employees"]);
  };

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

  return (
    <div className="admin-dashboard">
      <div className="user-profile-container">
        <img
          className="user-profile"
          src={userProfileImage || userProfile}
          alt="Profile"
        />
        <span className="status online" />
      </div>
      <div className="dashboard-header">
        <div className="header-content">
          <h1 className="greeting">
            {greeting}, {username ? ` ${username} ` : "User"}
          </h1>
          <div className="newSelect">
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

      <div className="dashboard-statistics">
        {/* Members Card */}
        <div className="data-container">
          <h3 className="h3">Members</h3>
            <div className="members-card">
              {employees &&
                filteredEmployees?.map((employee) => (
                  <div key={employee._id} className="profile-img">
                    <Link to={`/profile/${employee._id}`} className="avatar">
                      <img
                        loading="lazy"
                        src={employee.imageUrl}
                        alt={employee.fullName}
                        className="employee-image"
                      />
                    </Link>
                    <span className="employee-fullname">
                      <Link to={`/profile/${employee._id}`}>
                        {employee.fullName}
                      </Link>
                    </span>
                  </div>
                ))}
            </div>
        </div>

        {/* Team Satisfaction Card */}
        <div className="data-container">
          <h3 className="h3">Team Satisfaction</h3>
          <div className="progress-circle">
            <CircularProgressbar
              value={percentage}
              text={`${Math.round(percentage)}%`}
              styles={buildStyles({
                textColor: "black",
                pathColor: "#ffb28d",
                trailColor: "#cfccca",
                strokeLinecap: "round",
                pathTransitionDuration: 0.5,
                strokeWidth: 6,
              })}
            />
          </div>
        </div>

        {/* Utilization of Vacation Days */}
        <div className="data-container vacation-card">
          <h3 className="h3">Utilization of Vacation Days</h3>
          <div className="vacation-bar">
            <EmployeesVacationUtilizationBar percentage={56.5} />
          </div>
          <div className="vacation-info">
            <h5>At this stage of the year, it is</h5>
            <h5>recommended to use at least 76%</h5>
          </div>
        </div>

        {/* Employees Over 100% Hours */}
        <div className="data-container members-hours-card">
          <h3 className="h3">Employees Over 100% Hours</h3>
            <EmployeesWorkingHours employees={employees} />
        </div>

        {/* Conversations 1:1 */}
        <div className="data-container">
          <h3 className="h3">Conversations 1:1</h3>
          <div className="progress-circle">
            <CircularProgressbar
              value={percentage}
              text={"5/8"}
              styles={buildStyles({
                textColor: "black",
                pathColor: "rgb(20 117 119)",
                trailColor: "#cfccca",
                strokeLinecap: "round",
                pathTransitionDuration: 0.5,
                strokeWidth: 6,
              })}
            />
          </div>
        </div>

        {/* Upcoming Birthdays */}
        <div className="data-container birthday-card">
          <div className="card-header">
            <h3 className="card-title">Upcoming Birthdays</h3>
            <span className="next-button" onClick={handleSeeAllClick}>
            <GrLinkNext />
            </span>
          </div>
          <ul className="birthday-list">
            {employeesFormattedBirthdays().map((employee, index) => (
              <li key={index} className="birthday-item">
                <span className="birthday-date">
                  {new Date(employee.birthdayThisYear).toLocaleDateString(
                    "en-GB",
                    {
                      day: "2-digit",
                      month: "2-digit",
                    }
                  )}
                </span>
                <span className="employee-fullName">{employee.fullName}</span>
                <div className="employee-interesting-fact">
                  {employee.interestingFact}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <CreateEmployeeEvent />
    </div>
  );
}