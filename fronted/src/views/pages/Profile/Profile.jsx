import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import ProfileTab from "./ProfileTab";
import moment from "moment";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSelector } from "react-redux";

const Profile = () => {
  const user = useSelector((state) => state.auth?.user); // Safely access user
  const { employeeId } = useParams();
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const fetchEmployees = async () => {
    if (!user) return [];
    try {
      const response = await axios.get("http://localhost:5000/api/getEmployees", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching employees:", error);
      return [];
    }
  };

  const query = useQuery({
    queryKey: ['employees'],
    queryFn: fetchEmployees,
    enabled: !!user, // Only fetch when the user is available
    onSuccess: (data) => {
      console.log("Fetched employees:", data); // Debug log
      // Use the data to update state
      const employee = data.find((employee) => employee._id === employeeId);
      setSelectedEmployee(employee);
    },
    onError: (error) => {
      console.log("Error fetching employees:", error);
    },
  });

  const { isLoading, error, data } = query;

  useEffect(() => {
    console.log("User state:", user); // Debug log
    const employeesArrJson = localStorage.getItem('employeesArr');
    if (employeesArrJson) {
      const currentManagerEmployeesArr = JSON.parse(employeesArrJson);
      const employee = currentManagerEmployeesArr.find(emp => emp.id === employeeId);
      setSelectedEmployee(employee);
    }
  }, [employeeId, employees]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading employees</div>;
  if (!selectedEmployee) return <div>No employees have been added yet...</div>;

  const formattedDateOfBirth = moment(selectedEmployee.DataOfBirth, 'DD/MM/YYYY').format('MMMM Do, YYYY');

  return (
    <>
      <div className="page-wrapper">
        <div className="content container-fluid">
          <h1>{selectedEmployee.FullName} Profile</h1>
          <br />
          <br />
          <div className="card mb-0">
            <div className="card-body">
              <div className="row">
                <div className="col-md-12">
                  <div className="profile-view">
                    <div className="profile-img-wrap">
                      <div className="profile-img">
                        <Link to="#">
                          <img src={selectedEmployee.avatar} alt="UserImage" />
                        </Link>
                      </div>
                    </div>
                    <div className="profile-basic">
                      <div className="row">
                        <div className="col-md-5">
                          <div className="profile-info-left">
                            <h3 className="user-name m-t-0 mb-0">
                              {selectedEmployee.FullName}
                            </h3>
                            <h6 className="text-muted">{selectedEmployee.role}</h6>
                          </div>
                        </div>
                        <div className="col-md-7">
                          <ul className="personal-info">
                            <li>
                              <div className="title">Phone:</div>
                              <div className="text">
                                <Link to={`tel:050-1234567`}>
                                  050-1234567
                                </Link>
                              </div>
                            </li>
                            <li>
                              <div className="title">Mail:</div>
                              <div className="text">
                                <Link to={`mailto:${selectedEmployee.FullName}@gmail.com`}>
                                  {selectedEmployee.FullName + '@gmail.com'}
                                </Link>
                              </div>
                            </li>
                            <li>
                              <div className="title">Place of residence:</div>
                              <div className="text">{selectedEmployee.Address}</div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="pro-edit">
                      <Link
                        data-bs-target="#profile_info"
                        data-bs-toggle="modal"
                        className="edit-icon"
                        to="#"
                      >
                        <i className="fa-solid fa-pencil"></i>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card tab-box">
            <div className="row user-tabs">
              <div className="col-lg-12 col-md-12 col-sm-12 line-tabs">
                <ul className="nav nav-tabs nav-tabs-bottom">
                  <li className="nav-item">
                    <Link
                      to="#emp_assets"
                      data-bs-toggle="tab"
                      className="nav-link active"
                    >
                      | Insights |
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to="#emp_profile"
                      data-bs-toggle="tab"
                      className="nav-link"
                    >
                      | General info |
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to="#emp_projects"
                      data-bs-toggle="tab"
                      className="nav-link"
                    >
                      | Training and development |
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to="#bank_statutory"
                      data-bs-toggle="tab"
                      className="nav-link"
                    >
                      | Interviews |
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to="#bank_statutory"
                      data-bs-toggle="tab"
                      className="nav-link"
                    >
                      | Compensation and benefits |
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to="#bank_statutory"
                      data-bs-toggle="tab"
                      className="nav-link"
                    >
                      | Wellness and engagement |
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {/* Profile Info Tab */}
          <ProfileTab selectedEmployee={selectedEmployee} />
        </div>
      </div>
    </>
  );
};

export default Profile;
