import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import ProfileTab from "./ProfileTab";
import moment from "moment";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useSelector } from "react-redux";
import { fetchEmployees } from "../../../services";
import { useLocation } from "react-router-dom";
import { userProfile } from "../../../imgs";

const Profile = () => {
  const user = useSelector((state)=> state.auth?.user)
  const uid = useSelector((state)=> state.auth?.user.uid)
  const { employeeId } = useParams();
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const location = useLocation()
  const queryClient= useQueryClient()
  const { employeeAvatar } = location.state || {};

  const { data: employees } = useQuery({
    queryKey: ["employees"],
    queryFn: fetchEmployees,
    enabled: !!user
  });

  useEffect(() => {
    if(user) {
      if (employees && employeeId) {
        const employee = employees.find((employee) => employee._id === employeeId);
        setSelectedEmployee(employee);
      }
    }         
  }, [employees, employeeId]);

  // const useEmployeeProfile = (uid, employeeCivilId) => {
  //   return useQuery({
  //     queryKey: ["employeeProfile", uid, employeeCivilId],
  //     queryFn: () => {
  //       const employees = queryClient.getQueryData(["employees", uid]);
  //       return employees?.find((employee) => employee.employeeId === employeeCivilId);
  //     },
  //     enabled: !!uid && !!employeeCivilId, // Only run if uid and employeeId are defined
  //   });
  // };

  return (
    <>
      <div className="page-wrapper">
        <div className="content container-fluid">
          <h1>{selectedEmployee?.fullName}'s Profile</h1>
          <br />
          <br />
          <div className="card mb-0">
            <div className="card-body">
              <div className="row">
                <div className="col-md-12">
                  <div className="profile-view">
                    <div className="profile-img-wrap">
                      <div className="profile-img">
                          <img src={employeeAvatar ? employeeAvatar: userProfile} alt="UserImage" />
                      </div>
                    </div>
                    <div className="profile-basic">
                      <div className="row">
                        <div className="col-md-5">
                          <div className="profile-info-left">
                            <h3 className="user-name m-t-0 mb-0">
                              {selectedEmployee?.fullName}
                            </h3>
                            <h6 className="text-muted">
                              {selectedEmployee?.role}
                            </h6>
                          </div>
                        </div>
                        <div className="col-md-7">
                          <ul className="personal-info">
                            <li>
                              <div className="title">Phone:</div>
                              <div className="text">
                                <Link to={`tel:050-1234567`}>050-1234567</Link>
                              </div>
                            </li>
                            <li>
                              <div className="title">Mail:</div>
                              <div className="text">
                                <Link
                                  to={`mailto:${selectedEmployee?.fullName}@gmail.com`}
                                >
                                  {selectedEmployee?.fullName + "@gmail.com"}
                                </Link>
                              </div>
                            </li>
                            <li>
                              <div className="title">Place of residence:</div>
                              <div className="text">
                                {selectedEmployee?.address}
                              </div>
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
