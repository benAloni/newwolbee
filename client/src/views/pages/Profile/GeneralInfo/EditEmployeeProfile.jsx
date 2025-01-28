
import React from "react";
import { Link } from "react-router-dom";
import EditPersonalInfoModal from "../../../../components/Modals/EditPersonalInfoModal";
import AddFamilyMember from "./AddFamilyMember";
import { ListItem, ProjectDetails } from "../ProfileContent";

const EditEmployeeProfile = ({selectedEmployee}) => {
  
  const personalInfoData = [
    { id: 1, title: "Passport No.", text: "9876543210" },
    { id: 2, title: "Passport Exp Date.", text: "9876543210" },
    { id: 3, title: "Tel", text: "9876543210" },
    { id: 4, title: "Nationality", text: "Indian" },
    { id: 5, title: "Religion", text: "Christian" },
    { id: 6, title: "Marital status", text: "Married" },
    { id: 7, title: "Employment of spouse", text: "No" },
    { id: 8, title: "No. of children", text: selectedEmployee?.numOfChildren },
  ];


  const experienceData = [
    {
      id: 1,
      name: "Web Designer at Zen Corporation",
      time: "Jan 2023 - Present (5 years 2 months)",
    },
    {
      id: 2,
      name: "Web Designer at Ron-tech",
      time: "Jan 2023 - Present (5 years 2 months)",
    },
    {
      id: 3,
      name: "Web Designer at Dalt Technology",
      time: "2023 2023 - Present (5 years 2 months)",
    },
  ];


  return (
    <>
      <div className="tab-content">
        <div
          id="emp_profile"
          className="pro-overview tab-pane fade"
        >
          <div className="row">
            <div className="col-md-6 d-flex">
              <div className="card profile-box flex-fill">
                <div className="card-body">
                  <h3 className="card-title">
                    Personal Information{" "}
                    <Link
                      to="#"
                      // img={selectedEmployee?.imgUrl}
                      className="edit-icon"
                      data-bs-toggle="modal"
                      data-bs-target="#personal_info_modal"
                    >
                      <i className="fa fa-pencil" />
                    </Link>
                  </h3>
                  <ul className="personal-info">
                    {personalInfoData.map((item, index) => (
                      <ListItem
                        id={item.id}
                        key={index}
                        title={item.title}
                        text={item.text}
                      />
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="row">

            <div className="col-md-6 d-flex">
              <div className="card profile-box flex-fill">
                <div className="card-body">
                  <h3 className="card-title">
                    Family Information{" "}
                    <Link
                      to="#"
                      className="edit-icon"
                      data-bs-toggle="modal"
                      data-bs-target="#family_info_modal"
                    >
                      <i className="fa fa-user-plus" />
                    </Link>
                  </h3>
                  <div className="table-responsive">
                    <table className="table table-nowrap">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Relationship</th>
                          <th>Date of Birth</th>
                          <th>Phone</th>
                          <th />
                        </tr>
                      </thead>
                      <tbody>
                        {selectedEmployee?.familyMembers.map((item) => (
                          <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>{item.relationship}</td>
                            <td>{new Date(item.dateOfBirth).toLocaleDateString()}</td>
                            <td>{item.phone}</td>
                            <td className="text-end">
                              <div className="dropdown dropdown-action">
                                <Link
                                  aria-expanded="false"
                                  data-bs-toggle="dropdown"
                                  className="action-icon dropdown-toggle"
                                  to="#"
                                >
                                  <i className="material-icons">more_vert</i>
                                </Link>
                                <div className="dropdown-menu dropdown-menu-right">
                                  <Link to="#" className="dropdown-item">
                                    <i className="fa fa-pencil m-r-5" /> Edit
                                  </Link>
                                  <Link to="#" className="dropdown-item">
                                    <i className="fa fa-trash m-r-5" /> Delete
                                  </Link>
                                </div>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">

            <div className="col-md-6 d-flex">
              <div className="card profile-box flex-fill">
                <div className="card-body">
                  <h3 className="card-title">
                    Experience{" "}
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
                      {experienceData.map((item) => (
                        <li key={item.id}>
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
          </div>
        </div>
        <ProjectDetails  selectedEmployee={selectedEmployee}/>
      </div>
      <EditPersonalInfoModal selectedEmployee={selectedEmployee} />
      <AddFamilyMember selectedEmployee={selectedEmployee} />
    </>
  );
};

export default EditEmployeeProfile;
