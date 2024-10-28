import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Select from "react-select";
import { useSelector } from "react-redux";
import { auth } from "../../../firebase/firebaseConfig";
import AddEmployeeModal from "../../../components/Modals/employeepopup/AddEmployeeModal";
import Breadcrumbs from "../../../components/Breadcrumbs";
import DeleteModal from "../../../components/Modals/DeleteModal";
import EmployeeListFilter from "../../../components/EmployeeListFilter";
import lisa from "../../../imgs/avatar_1.JPG";
import tom from "../../../imgs/avatar_2.JPG";
import david from "../../../imgs/avatar_3.JPG";
import nicole from "../../../imgs/avatar_4.JPG";
import brad from "../../../imgs/avatar_5.JPG";
import john from "../../../imgs/avatar_6.JPG";
import mark from "../../../imgs/avatar_7.JPG";
import josh from "../../../imgs/avatar_8.JPG";
import justin from "../../../imgs/avatar_9.JPG";
import selena from "../../../imgs/avatar_10.JPG";
import emma from "../../../imgs/avatar_11.JPG";
import sofia from "../../../imgs/avatar_12.JPG";
import { fetchEmployees, fetchTeams } from "../../../services";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import PopUp from "./PopUp";

const AllEmployees = () => {
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [favoriteEmployees, setFavoriteEmployees] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState("");
  const [userRole, setUserRole] = useState(null);
  const [addEmployeeModalOpen, setAddEmployeeModalOpen] = useState(false);
  const queryClient = useQueryClient();
  const user = useSelector((state) => state.auth.user);

  // need to add loading
  useEffect(() => {
    if (user && user.role) {
      if (user.role === "manager") {
        setUserRole("manager");
      } else {
        setUserRole("otherUser");
      }
    }
  }, [user]);
  const openModal = () => {
    setAddEmployeeModalOpen(true);
  };
  const closeModal = () => {
    setAddEmployeeModalOpen(false);
  };
  const avatars = [
    lisa,
    tom,
    david,
    nicole,
    john,
    mark,
    brad,
    selena,
    justin,
    josh,
    sofia,
    emma,
  ];

  const getEmployees = async () => {
    let employeesWithAvatars;
    try {
      const result = await fetchEmployees();
      employeesWithAvatars = await result?.map((employee, index) => ({
        ...employee,
        id: employee._id,
        avatar: avatars[index % avatars.length],
      }));
      return employeesWithAvatars;
    } catch (error) {
      console.log("Error getting employees :", error);
    }
  };

  const { data: employees } = useQuery({
    queryKey: ["employees"],
    queryFn: getEmployees,
  });

  const getTeams = async () => {
    try {
      const result = await fetchTeams();
      return result;
    } catch (error) {
      console.error("Error getting team :", error);
    }
  };
  const { data: teams } = useQuery({
    queryKey: ["teams"],
    queryFn: getTeams,
  });

  useEffect(() => {
    if (employees && selectedTeam) {
      const filteredTeam = employees.filter(
        (employee) => employee.team === selectedTeam
      );
      setFilteredEmployees(filteredTeam);
    } else {
      setFilteredEmployees(employees || []);
    }
  }, [selectedTeam, employees]);

  const handleSelect = (option) => {
    setSelectedTeam(option.label);
    queryClient.invalidateQueries(["employees"]);
  };
  const toggleFavorite = (e, employeeId) => {
    e.preventDefault();
    const updatedFavoriteEmployees = [...favoriteEmployees]; // העתקת רשימת העובדים המועדפים

    if (updatedFavoriteEmployees.includes(employeeId)) {
      updatedFavoriteEmployees.splice(
        updatedFavoriteEmployees.indexOf(employeeId),
        1
      ); // הסרת העובד מרשימת המועדפים
    } else {
      updatedFavoriteEmployees.push(employeeId); // הוספת העובד לרשימת המועדפים
    }

    setFavoriteEmployees(updatedFavoriteEmployees); // עדכון רשימת העובדים המועדפים
  };
  return (
    <div>
      <style>
        {`
          .favorite-star {
            position: absolute;
            top: -40px;
            left: -70px;
            font-size: 24px;
            color: grey;
            cursor: pointer;
          }

          .favorite-star.active {
            color: yellow;
          }
        `}
      </style>
      <div className="page-wrapper">
        <div className="content container-fluid">
          <Breadcrumbs
            maintitle="Employees Page"
            modal="#add_employee"
            name="Add Employee"
          />
          {userRole === "otherUser" && <EmployeeListFilter />}
          {userRole === "manager" && (
            <div className="d-flex justify-content-center">
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
          )}

          <div className="row">
            {filteredEmployees?.map((employee) => (
              <div
                key={employee._id}
                className="col-md-4 col-sm-6 col-12 col-lg-4 col-xl-3"
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "scale(1.05)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              >
                <div className="profile-widget">
                  <div className="profile-img">
                    <Link
                      to={`/profile/${employee._id}`}
                      className="avatar"
                      onClick={(event) => toggleFavorite(event, employee._id)}
                    >
                      <span
                        className={`favorite-star ${
                          favoriteEmployees.includes(employee._id)
                            ? "active"
                            : ""
                        }`}
                      >
                        &#9734;
                      </span>
                      {employee.avatar ? (
                        <img src={employee.avatar} alt={employee.fullName} />
                      ) : (
                        <p>No Avatar</p>
                      )}
                    </Link>
                  </div>
                  <div className="dropdown profile-action">
                    <Link
                      to="#"
                      className="action-icon dropdown-toggle"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <i className="material-icons">more_vert</i>
                    </Link>
                    <div className="dropdown-menu dropdown-menu-right">
                      <Link
                        className="dropdown-item"
                        to="#"
                        data-bs-toggle="modal"
                        data-bs-target="#edit_employee"
                      >
                        <i className="fa fa-pencil m-r-5" /> Edit
                      </Link>
                      <Link
                        className="dropdown-item"
                        to="#"
                        data-bs-toggle="modal"
                        data-bs-target="#delete"
                      >
                        <i className="fa-regular fa-trash-can m-r-5" /> Delete
                      </Link>
                    </div>
                  </div>
                  <h4 className="user-name m-t-10 mb-0 text-ellipsis">
                    <Link to={`/profile/${employee._id}`}>
                      {employee.fullName}
                    </Link>
                  </h4>
                  <div className="small text-muted">{employee.team}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <AddEmployeeModal
        isOpen={addEmployeeModalOpen}
        onClose={closeModal}
        onEmployeeAdded={() => queryClient.invalidateQueries(["employees"])}
      />
      <DeleteModal Name="מחק עובד" />
    </div>
  );
};

export default AllEmployees;
