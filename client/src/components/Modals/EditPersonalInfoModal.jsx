import React, { useState } from "react";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import Select from "react-select";
import { useSelector } from "react-redux";
import { useQueryClient } from "@tanstack/react-query";
import { userProfile } from "../../imgs";

const EditPersonalInfoModal = ({ selectedEmployee }) => {
  const [selectedDate1, setSelectedDate1] = useState(null);
  const [employeeProfileImage, setEmployeeProfileImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const queryClient = useQueryClient();
  const uid = useSelector((state) => state.auth?.user.uid);

  const cachedEmployees = queryClient.getQueryData(["employees", uid]);
  const cachedEmployee = cachedEmployees?.find(
    (emp) => emp.employeeId === selectedEmployee?.employeeId
  );
  const cachedEmployeeAvatar = cachedEmployee?.avatar;
  //need to add manager full name..
  const manager = cachedEmployees?.find(
    (employee) =>
      employee.employeeOfManagerId === selectedEmployee?.employeeOfManagerId
  );
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedImage(URL.createObjectURL(event.target.files[0]));
      setEmployeeProfileImage(event.target.files[0]);
    }
  };
  const resetForm = () => {
    setSelectedImage(cachedEmployeeAvatar ? cachedEmployeeAvatar : userProfile);
  };
  const handleDateChange1 = (date) => {
    setSelectedDate1(date);
  };
  const domain = [
    { value: 1, label: "Select Department" },
    { value: 2, label: "Web Development+" },
    { value: 3, label: "IT Management" },
    { value: 4, label: "Marketing" },
  ];
  const developer = [
    { value: 1, label: "Select Department" },
    { value: 2, label: "Web Development+" },
    { value: 3, label: "IT Management" },
    { value: 4, label: "Marketing" },
  ];
  const reporter = [
    { value: 2, label: "Wilmer Deluna" },
    { value: 3, label: "Lesley Grauer" },
    { value: 4, label: "Jeffery Lalor" },
  ];
  const maritalStatus = [
    { value: "single", label: "Single" },
    { value: "married", label: "Married" },
    { value: "widowed", label: "Widowed" },
    { value: "divorced", label: "Divorced" },
    { value: "separated ", label: "Separated " },
  ];
  const gender = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other" },
  ];
  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "#ff9b44" : "#fff",
      color: state.isFocused ? "#fff" : "#000",
      "&:hover": {
        backgroundColor: "#ff9b44",
      },
    }),
  };

  return (
    <>
      <div id="profile_info" className="modal custom-modal fade" role="dialog">
        <div
          className="modal-dialog modal-dialog-centered modal-lg"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Profile Information</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={resetForm}
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="row">
                  <div className="col-md-12">
                    <div className="profile-img-wrap edit-img">
                      <img
                        className="inline-block"
                        src={
                          selectedImage || cachedEmployeeAvatar || userProfile
                        }
                        alt="user"
                      />
                      <div className="fileupload btn">
                        <span className="btn-text">edit</span>
                        <input
                          className="upload"
                          type="file"
                          onChange={onImageChange}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-block mb-3 col-md-12">
                        <label className="col-form-label">Full Name</label>
                        <input
                          type="text"
                          className="form-control"
                          defaultValue={selectedEmployee?.fullName}
                        />
                      </div>
                      <div className="col-md-6">
                        <div className="input-block mb-3">
                          <label className="col-form-label">
                            Date Of Birth
                          </label>
                          <div>
                            <DatePicker
                              selected={selectedDate1}
                              onChange={handleDateChange1}
                              className="form-control floating datetimepicker"
                              type="date"
                              placeholderText={
                                selectedEmployee?.dateOfBirth
                                  ? new Date(selectedEmployee.dateOfBirth)
                                      .toISOString()
                                      .slice(0, 10)
                                  : "Select a date"
                              }
                              dateFormat="dd-MM-yyyy"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="input-block mb-3">
                          <label className="col-form-label">Gender</label>
                          <Select
                            options={gender}
                            placeholder={`${selectedEmployee?.gender}`}
                            styles={customStyles}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="input-block mb-3">
                      <label className="col-form-label">Address</label>
                      <input
                        type="text"
                        className="form-control"
                        defaultValue={selectedEmployee?.address}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="input-block mb-3">
                      <label className="col-form-label">State</label>
                      <input
                        type="text"
                        className="form-control"
                        defaultValue="-"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="input-block mb-3">
                      <label className="col-form-label">Country</label>
                      <input
                        type="text"
                        className="form-control"
                        defaultValue="-"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="input-block mb-3">
                      <label className="col-form-label">Pin Code</label>
                      <input
                        type="text"
                        className="form-control"
                        defaultValue="-"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="input-block mb-3">
                      <label className="col-form-label">Phone Number</label>
                      <input
                        type="text"
                        className="form-control"
                        defaultValue="-"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="input-block mb-3">
                      <label className="col-form-label">
                        Department <span className="text-danger">*</span>
                      </label>
                      <Select
                        options={domain}
                        placeholder="Select Department"
                        styles={customStyles}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="input-block mb-3">
                      <label className="col-form-label">
                        Designation <span className="text-danger">*</span>
                      </label>
                      <Select
                        options={developer}
                        placeholder="Select Department"
                        styles={customStyles}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="input-block mb-3">
                      <label className="col-form-label">
                        Reports To <span className="text-danger">*</span>
                      </label>
                      <div>
                        {manager ? (
                          <div>{manager.fullName}</div>
                        ) : (
                          <div>No manager found</div>
                        )}
                      </div>
                      {/* <Select
                        options={reporter}
                        placeholder="-"
                        styles={customStyles}
                      /> */}
                    </div>
                  </div>
                </div>
                <div className="submit-section">
                  <button
                    className="btn btn-primary submit-btn"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    type="reset"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div
        id="emergency_contact_modal"
        className="modal custom-modal fade"
        role="dialog"
      >
        <div
          className="modal-dialog modal-dialog-centered modal-lg"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Personal Information</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="card">
                  <div className="card-body">
                    <h3 className="card-title">Primary Contact</h3>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="input-block mb-3 mb-3">
                          <label className="col-form-label">
                            Name <span className="text-danger">*</span>
                          </label>
                          <input type="text" className="form-control" />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="input-block mb-3 mb-3">
                          <label className="col-form-label">
                            Relationship <span className="text-danger">*</span>
                          </label>
                          <input className="form-control" type="text" />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="input-block mb-3 mb-3">
                          <label className="col-form-label">
                            Phone <span className="text-danger">*</span>
                          </label>
                          <input className="form-control" type="text" />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="input-block mb-3 mb-3">
                          <label className="col-form-label">Phone 2</label>
                          <input className="form-control" type="text" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-body">
                    <h3 className="card-title">Primary Contact</h3>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="input-block mb-3 mb-3">
                          <label className="col-form-label">
                            Name <span className="text-danger">*</span>
                          </label>
                          <input type="text" className="form-control" />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="input-block mb-3 mb-3">
                          <label className="col-form-label">
                            Relationship <span className="text-danger">*</span>
                          </label>
                          <input className="form-control" type="text" />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="input-block mb-3 mb-3">
                          <label className="col-form-label">
                            Phone <span className="text-danger">*</span>
                          </label>
                          <input className="form-control" type="text" />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="input-block mb-3 mb-3">
                          <label className="col-form-label">Phone 2</label>
                          <input className="form-control" type="text" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="submit-section">
                  <button
                    className="btn btn-primary submit-btn"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    type="reset"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Personal Info Modal */}
      <div
        id="personal_info_modal"
        className="modal custom-modal fade"
        role="dialog"
      >
        <div
          className="modal-dialog modal-dialog-centered modal-lg"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Personal Information</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="row">
                  <div className="col-md-6">
                    <div className="input-block mb-3 mb-3">
                      <label className="col-form-label">Passport No.</label>
                      <input type="text" className="form-control" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="input-block mb-3 mb-3">
                      <label className="col-form-label">
                        Passport Expiry Date
                      </label>
                      <div className="cal-icon">
                        <DatePicker
                          selected={selectedDate1}
                          onChange={handleDateChange1}
                          className="form-control floating datetimepicker"
                          type="date"
                          placeholderText="04/10/2023"
                          dateFormat="dd-MM-yyyy"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="input-block mb-3 mb-3">
                      <label className="col-form-label">Tel No.</label>
                      <input className="form-control" type="text" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="input-block mb-3 mb-3">
                      <label className="col-form-label">
                        Nationality <span className="text-danger">*</span>
                      </label>
                      <input className="form-control" type="text" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="input-block mb-3 mb-3">
                      <label className="col-form-label">Religion</label>
                      <input className="form-control" type="text" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="input-block mb-3 mb-3">
                      <label className="col-form-label">
                        Marital status <span className="text-danger">*</span>
                      </label>
                      <Select
                        options={maritalStatus}
                        placeholder={`${selectedEmployee?.maritalStatus}`}
                        styles={customStyles}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="input-block mb-3 mb-3">
                      <label className="col-form-label">
                        Employment of spouse
                      </label>
                      <input className="form-control" type="text" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="input-block mb-3 mb-3">
                      <label className="col-form-label">No. of children </label>
                      <input className="form-control" type="text" />
                    </div>
                  </div>
                </div>
                <div className="submit-section">
                  <button
                    className="btn btn-primary submit-btn"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    type="reset"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* /Personal Info Modal */}

      {/* Education Modal */}
      <div
        id="education_info"
        className="modal custom-modal fade"
        role="dialog"
      >
        <div
          className="modal-dialog modal-dialog-centered modal-lg"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title"> Education Information</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-scroll">
                  <div className="card">
                    <div className="card-body">
                      <h3 className="card-title">
                        Education Information{" "}
                        <Link to="#" className="delete-icon">
                          <i className="fa-regular fa-trash-can" />
                        </Link>
                      </h3>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="input-block mb-3 mb-3 form-focus focused">
                            <input
                              type="text"
                              defaultValue="Oxford University"
                              className="form-control floating"
                            />
                            <label className="focus-label">Institution</label>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="input-block mb-3 mb-3 form-focus focused">
                            <input
                              type="text"
                              defaultValue="Computer Science"
                              className="form-control floating"
                            />
                            <label className="focus-label">Subject</label>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="input-block mb-3 mb-3 form-focus focused">
                            <div className="cal-icon">
                              <DatePicker
                                selected={selectedDate1}
                                onChange={handleDateChange1}
                                className="form-control floating datetimepicker"
                                type="date"
                                placeholderText="04/10/2023"
                                dateFormat="dd-MM-yyyy"
                              />
                            </div>
                            <label className="focus-label">Starting Date</label>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="input-block mb-3 mb-3 form-focus focused">
                            <div className="cal-icon">
                              <DatePicker
                                selected={selectedDate1}
                                onChange={handleDateChange1}
                                className="form-control floating datetimepicker"
                                type="date"
                                placeholderText="04/10/2023"
                                dateFormat="dd-MM-yyyy"
                              />
                            </div>
                            <label className="focus-label">Complete Date</label>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="input-block mb-3 mb-3 form-focus focused">
                            <input
                              type="text"
                              defaultValue="BE Computer Science"
                              className="form-control floating"
                            />
                            <label className="focus-label">Degree</label>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="input-block mb-3 mb-3 form-focus focused">
                            <input
                              type="text"
                              defaultValue="Grade A"
                              className="form-control floating"
                            />
                            <label className="focus-label">Grade</label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card">
                    <div className="card-body">
                      <h3 className="card-title">
                        Education Information
                        <Link to="#" className="delete-icon">
                          <i className="fa-regular fa-trash-can" />
                        </Link>
                      </h3>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="input-block mb-3 mb-3 form-focus focused">
                            <input
                              type="text"
                              defaultValue="Oxford University"
                              className="form-control floating"
                            />
                            <label className="focus-label">Institution</label>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="input-block mb-3 mb-3 form-focus focused">
                            <input
                              type="text"
                              defaultValue="Computer Science"
                              className="form-control floating"
                            />
                            <label className="focus-label">Subject</label>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="input-block mb-3 mb-3 form-focus focused">
                            <div className="cal-icon">
                              <DatePicker
                                selected={selectedDate1}
                                onChange={handleDateChange1}
                                className="form-control floating datetimepicker"
                                type="date"
                                placeholderText="04/10/2023"
                                dateFormat="dd-MM-yyyy"
                              />
                            </div>
                            <label className="focus-label">Starting Date</label>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="input-block mb-3 mb-3 form-focus focused">
                            <div className="cal-icon">
                              <DatePicker
                                selected={selectedDate1}
                                onChange={handleDateChange1}
                                className="form-control floating datetimepicker"
                                type="date"
                                dateFormat="dd-MM-yyyy"
                              />
                            </div>
                            <label className="focus-label">Complete Date</label>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="input-block mb-3 mb-3 form-focus focused">
                            <input
                              type="text"
                              defaultValue="BE Computer Science"
                              className="form-control floating"
                            />
                            <label className="focus-label">Degree</label>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="input-block mb-3 mb-3 form-focus focused">
                            <input
                              type="text"
                              defaultValue="Grade A"
                              className="form-control floating"
                            />
                            <label className="focus-label">Grade</label>
                          </div>
                        </div>
                      </div>
                      <div className="add-more">
                        <Link to="#">
                          <i className="fa-solid fa-plus-circle" /> Add More
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="submit-section">
                  <button
                    className="btn btn-primary submit-btn"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    type="reset"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* /Education Modal */}

      {/* Experience Modal */}
      <div
        id="experience_info"
        className="modal custom-modal fade"
        role="dialog"
      >
        <div
          className="modal-dialog modal-dialog-centered modal-lg"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Experience Information</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-scroll">
                  <div className="card">
                    <div className="card-body">
                      <h3 className="card-title">
                        Experience Information{" "}
                        <Link to="#" className="delete-icon">
                          <i className="fa-regular fa-trash-can" />
                        </Link>
                      </h3>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="input-block mb-3 mb-3 form-focus focused">
                            <input
                              type="text"
                              className="form-control floating"
                              defaultValue="Digital Devlopment Inc"
                            />
                            <label className="focus-label">Company Name</label>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="input-block mb-3 mb-3 form-focus focused">
                            <input
                              type="text"
                              className="form-control floating"
                              defaultValue="United States"
                            />
                            <label className="focus-label">Location</label>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="input-block mb-3 mb-3 form-focus focused">
                            <input
                              type="text"
                              className="form-control floating"
                              defaultValue="Web Developer"
                            />
                            <label className="focus-label">Job Position</label>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="input-block mb-3 mb-3 form-focus focused">
                            <div className="cal-icon">
                              <DatePicker
                                selected={selectedDate1}
                                onChange={handleDateChange1}
                                className="form-control floating datetimepicker"
                                type="date"
                                placeholderText="04/10/2023"
                                dateFormat="dd-MM-yyyy"
                              />
                            </div>
                            <label className="focus-label">Period From</label>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="input-block mb-3 mb-3 form-focus focused">
                            <div className="cal-icon">
                              <DatePicker
                                selected={selectedDate1}
                                onChange={handleDateChange1}
                                className="form-control floating datetimepicker"
                                type="date"
                                placeholderText="04/10/2023"
                                dateFormat="dd-MM-yyyy"
                              />
                            </div>
                            <label className="focus-label">Period To</label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card">
                    <div className="card-body">
                      <h3 className="card-title">
                        Experience Information{" "}
                        <Link to="#" className="delete-icon">
                          <i className="fa-regular fa-trash-can" />
                        </Link>
                      </h3>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="input-block mb-3 mb-3 form-focus focused">
                            <input
                              type="text"
                              className="form-control floating"
                              defaultValue="Digital Devlopment Inc"
                            />
                            <label className="focus-label">Company Name</label>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="input-block mb-3 mb-3 form-focus focused">
                            <input
                              type="text"
                              className="form-control floating"
                              defaultValue="United States"
                            />
                            <label className="focus-label">Location</label>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="input-block mb-3 mb-3 form-focus focused">
                            <DatePicker
                              selected={selectedDate1}
                              onChange={handleDateChange1}
                              className="form-control floating datetimepicker"
                              type="date"
                              placeholderText="04/10/2023"
                              dateFormat="dd-MM-yyyy"
                            />
                            <label className="focus-label">Job Position</label>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="input-block mb-3 mb-3 form-focus focused">
                            <div className="cal-icon">
                              <DatePicker
                                selected={selectedDate1}
                                onChange={handleDateChange1}
                                className="form-control floating datetimepicker"
                                type="date"
                                placeholderText="04/10/2023"
                                dateFormat="dd-MM-yyyy"
                              />
                            </div>
                            <label className="focus-label">Period From</label>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="input-block mb-3 mb-3 form-focus focused">
                            <div className="cal-icon">
                              <input
                                type="text"
                                className="form-control floating datetimepicker"
                                defaultValue="08/06/2018"
                              />
                            </div>
                            <label className="focus-label">Period To</label>
                          </div>
                        </div>
                      </div>
                      <div className="add-more">
                        <Link to="#">
                          <i className="fa-solid fa-plus-circle" /> Add More
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="submit-section">
                  <button
                    className="btn btn-primary submit-btn"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    type="reset"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* /Experience Modal */}
    </>
  );
};

export default EditPersonalInfoModal;
