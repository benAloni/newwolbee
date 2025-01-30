import { React, useId } from "react";
import { Link } from "react-router-dom";
import EditPersonalInfoModal from "../../../../components/Modals/EditPersonalInfoModal";
import AddFamilyMember from "./AddFamilyMember";
import { ListItem, ProjectDetails } from "../ProfileContent";

const EditEmployeeProfile = ({ selectedEmployee }) => {
  const personalInfoData = [
    { id: 1, title: "ID", text: selectedEmployee?.employeeId },
    { id: 2, title: "Date of birth", text: new Date (selectedEmployee?.dateOfBirth).toLocaleDateString("en-GB") },
    { id: 3, title: "Passport No.", text: selectedEmployee?.passportNumber },
    { id: 4, title: "Passport exp.date", text: new Date (selectedEmployee?.passportExpDate).toLocaleDateString("en-GB") },
    { id: 5, title: "Ethnicity", text: selectedEmployee?.ethnicity },
    { id: 6, title: "Religion", text: selectedEmployee?.religion },
    { id: 7, title: "Marital status", text: selectedEmployee?.maritalStatus },
    {
      id: 8,
      title: "Employment status of spouse",
      text: selectedEmployee?.spouseInfo?.employmentStatus,
    },
    {
      id: 9,
      title: "No. of children",
      text: selectedEmployee?.childrenInfo?.length,
    },
  ].filter((item) => item.text !== undefined && item.text !== null);

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
  const familyInfoData = [
    selectedEmployee?.spouseInfo
      ? {
          id: 1, //add spouse Id or _id
          name: selectedEmployee.spouseInfo.fullName,
          relationship: "Spouse",
          dob: selectedEmployee.spouseInfo.dateOfBirth
            ? new Date(
                selectedEmployee.spouseInfo.dateOfBirth
              ).toLocaleDateString("en-GB")
            : "N/A",
        }
      : null,
    ...(selectedEmployee?.childrenInfo || []).map((child, index) => ({
      id: index + 2, //add child Id or _id
      name: child.fullName,
      relationship: "Child",
      dob: new Date(child.dateOfBirth).toLocaleDateString("en-GB"),
    })),
  ].filter(Boolean);

  const primaryContactData = [
    selectedEmployee?.emergencyContact
      ? {
          id: 15,
          name: selectedEmployee.emergencyContact.fullName,
          relationship: selectedEmployee.emergencyContact.relationshipType,
          phone: selectedEmployee.emergencyContact.phone || " - ",
        }
      : null,
  ].filter(Boolean);

  const secondaryContactData = [
    { id: 1, title: "Name", text: "Karen Wills" },
    { id: 2, title: "Relationship", text: "Brother" },
    { id: 3, title: "Phone", text: "9876543210, 9876543210" },
  ];
  const bankInfoData = [
    { id: 1, title: "Bank name", text: "ICICI Bank" },
    { id: 2, title: "Bank account No.", text: "159843014641" },
    { id: 3, title: "IFSC Code", text: "ICI24504" },
    { id: 4, title: "PAN No", text: "TC000Y56" },
  ];

  const educationData = [
    {
      id: 1,
      name: "International College of Arts and Science (UG)",
      description: "Bsc Computer Science",
      time: "2020 - 2023",
    },
    {
      id: 2,
      name: "International College of Arts and Science (PG)",
      description: "Msc Computer Science",
      time: "2021 - 2023",
    },
    // Add more education info data as needed
  ];
  return (
    <>
      <div className="tab-content">
        <div id="emp_profile" className="pro-overview tab-pane fade">
          <div className="row">
            <div className="col-md-6 d-flex">
              <div className="card profile-box flex-fill">
                <div className="card-body">
                  <h3 className="card-title">
                    Personal Information{" "}
                    <Link
                      to="#"
                      className="edit-icon"
                      data-bs-toggle="modal"
                      data-bs-target="#personal_info_modal"
                      title="Edit or add personal info"
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
            {/* <div className="col-md-6 d-flex">
              <div className="card profile-box flex-fill">
                <div className="card-body">
                  <h3 className="card-title">Bank information</h3>
                  <ul className="personal-info">
                    {bankInfoData.map((item, index) => (
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
            </div> */}
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
                      title="Add a family member"
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
                          <th />
                        </tr>
                      </thead>
                      <tbody>
                        {familyInfoData.map((item) => (
                          <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>{item.relationship}</td>
                            <td>{item.dob}</td>
                            <td className="text-end">
                              <div className="dropdown dropdown-action">
                                <Link
                                  aria-expanded="false"
                                  data-bs-toggle="dropdown"
                                  className="action-icon dropdown-toggle"
                                  to="#"
                                  title="Edit family member"
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
            {/* <div className="col-md-6 d-flex">
              <div className="card profile-box flex-fill">
                <div className="card-body">
                  <h3 className="card-title">
                    Education Information{" "}
                    <Link
                      to="#"
                      className="edit-icon"
                      data-bs-toggle="modal"
                      data-bs-target="#education_info"
                    >
                      <i className="fa fa-pencil" />
                    </Link>
                  </h3>
                  <div className="experience-box">
                    <ul className="experience-list">
                      {educationData.map((item) => (
                        <li key={item.id}>
                          <div className="experience-user">
                            <div className="before-circle" />
                          </div>
                          <div className="experience-content">
                            <div className="timeline-content">
                              <Link to="/" className="name">
                                {item.name}
                              </Link>
                              <div>{item.description}</div>
                              <span className="time">{item.time}</span>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div> */}

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
                      title="Edit or add experience"
                    >
                      <i className="fa fa-pencil " />
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
          <div className="col-md-6 d-flex">
            <div className="card profile-box flex-fill">
              <div className="card-body">
                <h3 className="card-title">
                  Emergency Contact{" "}
                  <Link
                    to="#"
                    className="edit-icon"
                    data-bs-toggle="modal"
                    data-bs-target="#emergency_contact_modal"
                    title="Add emergency contact"
                  >
                    <i className="fa fa-pencil" />
                  </Link>
                </h3>
                <div className="table-responsive">
                  <table className="table table-nowrap">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Relationship</th>
                        <th>Phone</th>
                        <th />
                      </tr>
                    </thead>
                    <tbody>
                      {primaryContactData.map((contact) => (
                        <tr key={contact.id}>
                          <td>{contact.name}</td>
                          <td>{contact.relationship}</td>
                          <td>{contact.phone}</td>
                          <td className="text-end">
                            <div className="dropdown dropdown-action">
                              <Link
                                aria-expanded="false"
                                data-bs-toggle="dropdown"
                                className="action-icon dropdown-toggle"
                                to="#"
                                  title="Edit emergency contact"
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
        <ProjectDetails selectedEmployee={selectedEmployee} />
        {/* Bank Statutory Tab */}

        {/* Bank Statutory Tab */}
        {/*  Bank Tab */}
      </div>
      {/* Model Popup*/}
      <EditPersonalInfoModal selectedEmployee={selectedEmployee} />
      <AddFamilyMember selectedEmployee={selectedEmployee} />
    </>
  );
};

export default EditEmployeeProfile;
