import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Select from "react-select";
import { useSelector } from "react-redux";
import AddEmployeeModal from "../../../components/Modals/employeepopup/AddEmployeeModal";
import Breadcrumbs from "../../../components/Breadcrumbs";
import EmployeeListFilter from "../../../components/EmployeeListFilter";
import {
  fetchEmployees,
  fetchEmployeesProfilePics,
  fetchTeams,
} from "../../../services";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { userProfile } from "../../../imgs";
import { Loading } from "../../../layout";
import DeleteEmployeeModal from "../../../components/Modals/DeleteEmployeeModal";

const AllEmployees = () => {
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [favoriteEmployees, setFavoriteEmployees] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState("");
  const [userRole, setUserRole] = useState(null);
  const [employeeToDelete, setEmployeeToDelete] = useState(false);
  const queryClient = useQueryClient();
  const user = useSelector((state) => state.auth.user);
  const uid = useSelector((state) => state.auth?.user.uid);

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

  const getEmployees = async () => {
    let employeesWithProfilePics;
    try {
      const employees = await fetchEmployees();

      employeesWithProfilePics = await Promise.all(
        employees?.map(async (employee) => {
          const profilePicUrl = await fetchEmployeesProfilePics(
            uid,
            employee.employeeId
          );
          return {
            ...employee,
            id: employee._id,
            employeeId: employee.employeeId,
            avatar: profilePicUrl || userProfile,
          };
        })
      );
      queryClient.setQueryData(["employees", uid], employeesWithProfilePics);
      return employeesWithProfilePics;
    } catch (error) {
      console.log("Error getting employees :", error);
    }
  };
  const { data: employees, isLoading } = useQuery({
    queryKey: ["employees"],
    queryFn: getEmployees,
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
          {isLoading && <Loading />}
          <Breadcrumbs
            maintitle="Employees Page"
            modal="#add_employee"
            name="Add Employee"
          />
          {userRole === "otherUser" && <EmployeeListFilter />}
          {userRole === "manager" && (
            <div className="d-flex justify-content-center text-center">
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
                      to={{
                        pathname: `/profile/${employee._id}`,
                      }}
                      className="avatar"
                      onClick={(event) =>
                        toggleFavoriteEmployee(event, employee._id)
                      }
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
                      <img
                        loading="lazy"
                        src={employee.avatar}
                        alt={employee.fullName}
                      />
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
                        onClick={() => setEmployeeToDelete(employee)}
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
            {filteredEmployees.length === 0 && (
              <div className="mt-5">
                <p className=" d-flex justify-content-center text-center">
                  You got no current employees in this department
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      <AddEmployeeModal
        onEmployeeAdded={() => queryClient.invalidateQueries(["employees"])}
      />
      <DeleteEmployeeModal employee={employeeToDelete}/>
    </div>
  );
};

export default AllEmployees;
