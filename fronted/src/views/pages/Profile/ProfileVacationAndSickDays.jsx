import React from "react";
import { Link } from "react-router-dom";

const ProfileVacationAndSickDays = ({ selectedEmployee }) => {

  return (
    <>
      <div className="tab-content">
        <div id="emp_freeDays" className="pro-overview tab-pane fade">
          <div className="row">
            <div className="col-md-6 d-flex">
              <div className="card profile-box flex-fill">
                <div className="card-body">
                  <h3 className="card-title">
                    SickDays{" "}
                    <Link
                      to="#"
                      className="edit-icon"
                      data-bs-toggle="modal"
                      data-bs-target="#experience_info"
                    >
                      <i className="fa fa-pencil" />
                    </Link>
                  </h3>
                  <div className="experience-box">
                    <ul className="experience-list">
                      {selectedEmployee?.sickDays?.map((item, index) => (
                        <li key={index}>
                          <div className="experience-user">
                            <div className="before-circle" />
                          </div>
                          <div className="experience-content">
                            <div className="timeline-content">
                              <Link to="/" className="name">
                                {item.name}
                              </Link>
                              <span className="time">{item.time}</span>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-6 d-flex">
              <div className="card profile-box flex-fill">
                <div className="card-body">
                  <h3 className="card-title">
                    Vacation
                    <Link
                      to="#"
                      className="edit-icon"
                      data-bs-toggle="modal"
                      data-bs-target="#experience_info"
                      aria-label="Edit Vacation"
                    >
                      <i className="fa fa-pencil" />
                    </Link>
                  </h3>
                  <div className="experience-box" style={{ maxHeight: "200px", overflowY: "auto" }}>
                    {selectedEmployee?.vacation?.length > 0 ? (
                      <ul className="experience-list">
                        {selectedEmployee.vacation.map((vacation) => (
                          <li key={vacation.id} className="experience-item">
                            <div className="experience-user">
                              <div className="before-circle" />
                            </div>
                            <div className="experience-content">
                              <div className="timeline-content">
                                <Link to="/" className="name">
                                  {vacation.destination}
                                </Link>
                                <div className="time-details">
                                  <span className="time">
                                    Start:{" "}
                                    {new Date(vacation.startDate).toLocaleDateString()}{" "}
                                    - End:{" "}
                                    {new Date(vacation.endDate).toLocaleDateString()}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p>No vacations available</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileVacationAndSickDays;
