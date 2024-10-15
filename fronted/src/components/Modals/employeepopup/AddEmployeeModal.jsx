import React, { useEffect, useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import Select from "react-select";
import { useSelector } from "react-redux";
import MainPageEdit from "./MainPageEdit";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { auth } from "../../../firebase/firebaseConfig";

const AddEmployeeModal = (props) => {
  const user = useSelector((state) => state.auth.user);
  const queryClient = useQueryClient();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [employeeData, setEmployeeData] = useState({
    fullName: "",
    employeeOfManagerId: "",
    employeeId: "",
    role: "",
    team: "",
    dateOfBirth: "",
    address: "",
    gender: "",
    maritalStatus: "",
    children: 0,
    startDay: "",
    anniversary: "",
    latestActivity: [""],
    interestingFact: "",
    closestPersonalEvent: [""],
    singers: "",
    foodAndDrinks: [{ food1: "", food2: "", drink: "" }],
    restaurants: [{ restaurant1: "", restaurant2: "" }],
    hobbies: [{ hobby1: "", hobby2: "", hobby3: "" }],
    topInsights: [""],
    latestInfo: [""],
    vacation: [
      { destination: "", purposeOfTrip: "", startDate: "", endDate: "" },
    ],
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const customStyles = (error) => ({
    control: (provided) => ({
      ...provided,
      borderColor: error ? "red" : provided.borderColor,
    }),
  });

  const handleInputChange = (e, index, field) => {
    const { name, value } = e.target;

    if (name === "foodAndDrinks") {
      setEmployeeData((prevData) => {
        const updatedfoodAndDrinks = [...prevData.foodAndDrinks];
        updatedfoodAndDrinks[index] = {
          ...updatedfoodAndDrinks[index],
          [field]: value,
        };
        return {
          ...prevData,
          foodAndDrinks: updatedfoodAndDrinks,
        };
      });
    } else if (name === "restaurants") {
      setEmployeeData((prevData) => {
        const updatedRestaurants = [...prevData.restaurants];
        updatedRestaurants[index] = {
          ...updatedRestaurants[index],
          [field]: value,
        };
        return {
          ...prevData,
          restaurants: updatedRestaurants,
        };
      });
    } else if (name === "hobbies") {
      setEmployeeData((prevData) => {
        const updatedhobbies = [...prevData.hobbies];
        updatedhobbies[index] = {
          ...updatedhobbies[index],
          [field]: value,
        };
        return {
          ...prevData,
          hobbies: updatedhobbies,
        };
      });
    } else {
      setEmployeeData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const selectTeam = (selectedOption, actionMeta) => {
    const { name } = actionMeta;
    setEmployeeData((prevData) => ({
      ...prevData,
      [name]: selectedOption ? selectedOption.value : "",
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const selectDate = (date, name) => {
    setEmployeeData((prevData) => ({
      ...prevData,
      [name]: date ? date.toISOString() : "",
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const addEmployeeMutation = useMutation({
    mutationFn: async (employeeData) => {
      try {
        setIsSubmitting(true); 
        const token = await auth.currentUser.getIdToken();
        const response = await axios.post(
         `http://localhost:5000/api/addEmployee`,
          employeeData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        return response.data;
      } catch (error) {
        console.error("Error adding employee:", error);       
      } finally {
        setIsSubmitting(false); 
      }
    },
    onSuccess: () => {
      setSuccessMessage("Employee added successfully!");
      queryClient.invalidateQueries(["employees"]);
      addNotificationMutation.mutate(employeeData);
    },
    onError: (error) => {
      console.error("Error adding employee:", error);
      setSuccessMessage(
        error.message || "An error occurred. Please try again."
      );
    },
  });

  // Mutation for adding a notification
  const addNotificationMutation = useMutation({
    mutationFn: async (eventData) => {
      const response = await axios.post(
        "https://newwolbee-l7cc.onrender.com/api/addAllNotifications",
        { notificationsData: [eventData] },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["employees"]);
    },
    onError: (error) => {
      console.error("Error adding notification:", error);
    },
  });

  return (
    <>
      <div id="add_employee" className="modal custom-modal fade" role="dialog">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add Employee</h5>
              {successMessage && (
                <div className="alert alert-success mt-3">{successMessage}</div>
              )}
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
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  addEmployeeMutation.mutate(employeeData);
                }}
              >
                {" "}
                <div className="row">
                  <div className="input-block mb-3">
                    <label className="col-form-label">
                      Full Name <span className="text-danger">*</span>
                    </label>
                    <input
                      className={`form-control ${
                        errors.fullName ? "border-danger" : ""
                      }`}
                      type="text"
                      name="fullName"
                      value={employeeData.fullName}
                      onChange={handleInputChange}
                      placeholder="Employee's full name"
                    />
                    {errors.fullName && (
                      <div className="text-danger">{errors.fullName}</div>
                    )}
                  </div>

                  <div className="col-sm-6">
                    <div className="input-block mb-3">
                      <label className="col-form-label">
                        Employee ID <span className="text-danger">*</span>
                      </label>
                      <input
                        className={`form-control ${
                          errors.employeeId ? "border-danger" : ""
                        }`}
                        type="text"
                        name="employeeId"
                        value={employeeData.employeeId}
                        onChange={handleInputChange}
                        placeholder="Employee Id"
                      />
                      {errors.employeeId && (
                        <div className="text-danger">{errors.employeeId}</div>
                      )}
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="input-block mb-3">
                      <label className="col-form-label">
                        Employee Of Manager ID{" "}
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        className={`form-control ${
                          errors.employeeOfManagerId ? "border-danger" : ""
                        }`}
                        type="text"
                        name="employeeOfManagerId"
                        value={employeeData.employeeOfManagerId}
                        onChange={handleInputChange}
                        placeholder="Employee's Manager Id"
                      />
                      {errors.employeeOfManagerId && (
                        <div className="text-danger">
                          {errors.employeeOfManagerId}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="col-sm-6">
                    <div className="input-block mb-3">
                      <label className="col-form-label">
                        Role <span className="text-danger">*</span>
                      </label>
                      <input
                        className={`form-control ${
                          errors.role ? "border-danger" : ""
                        }`}
                        type="text"
                        name="role"
                        value={employeeData.role}
                        onChange={handleInputChange}
                        placeholder="Employee's role"
                      />
                      {errors.role && (
                        <div className="text-danger">{errors.role}</div>
                      )}
                    </div>
                  </div>

                  <div className="input-block mb-3 col-sm-6">
                    <label className="col-form-label">
                      Team <span className="text-danger">*</span>
                    </label>
                    <Select
                      styles={customStyles(errors.team)}
                      options={[
                        {
                          value: "",
                          label: "Select A Team",
                          isDisabled: true,
                        },
                        { value: "UI/UX", label: "UI/UX" },
                        { value: "BackEnd", label: "BackEnd" },
                        { value: "DevOps", label: "DevOps" },
                        { value: "DataScience", label: "Data Science" },
                        { value: "FrontEnd", label: "FrontEnd" },
                      ]}
                      placeholder="Select A Team"
                      onChange={(selectedOption) =>
                        selectTeam(selectedOption, { name: "team" })
                      }
                      isClearable
                      name="team"
                    />
                    {errors.team && (
                      <div className="text-danger">{errors.team}</div>
                    )}
                  </div>

                  <div className="input-block mb-3 col-sm-6">
                    <label className="col-form-label">
                      Date of birth <span className="text-danger">*</span>
                    </label>
                    <div className="cal-icon">
                      <DatePicker
                        selected={employeeData.dateOfBirth}
                        onChange={(date) => selectDate(date, "dateOfBirth")}
                        className={`form-control ${
                          errors.dateOfBirth ? "border-danger" : ""
                        }`}
                        dateFormat="dd-MM-yyyy"
                        name="dateOfBirth"
                      />
                      {errors.dateOfBirth && (
                        <div className="text-danger">{errors.dateOfBirth}</div>
                      )}
                    </div>
                  </div>

                  <div className="input-block mb-3 col-sm-6">
                    <label className="col-form-label">
                      Address <span className="text-danger">*</span>
                    </label>
                    <input
                      className={`form-control ${
                        errors.address ? "border-danger" : ""
                      }`}
                      type="text"
                      onChange={handleInputChange}
                      name="address"
                      placeholder="Employee's address"
                    />
                    {errors.address && (
                      <div className="text-danger">{errors.address}</div>
                    )}
                  </div>
                  <div className="input-block mb-3 col-sm-6">
                    <label className="col-form-label">
                      Gender <span className="text-danger">*</span>
                    </label>
                    <Select
                      options={[
                        {
                          value: "",
                          label: "Select A Gender",
                          isDisabled: true,
                        },
                        { value: "male", label: "Male" },
                        { value: "female", label: "Female" },
                        { value: "other", label: "Other" },
                      ]}
                      placeholder="Select A Gender"
                      onChange={(selectedOption) =>
                        selectTeam(selectedOption, { name: "gender" })
                      }
                      isClearable
                      name="gender"
                    />
                  </div>
                  <div className="input-block mb-3 col-sm-6">
                    <label className="col-form-label">
                      Marital Status <span className="text-danger">*</span>
                    </label>
                    <Select
                      options={[
                        {
                          value: "",
                          label: "Select A Marital Status",
                          isDisabled: true,
                        },
                        { value: "single", label: "Single" },
                        { value: "married", label: "Married" },
                        { value: "widowed", label: "Widowed" },
                        { value: "divorced", label: "Divorced" },
                        { value: "separated ", label: "Separated " },
                      ]}
                      placeholder="Select A Marital Status"
                      onChange={(selectedOption) =>
                        selectTeam(selectedOption, { name: "maritalStatus" })
                      }
                      isClearable
                      name="maritalStatus"
                    />
                  </div>

                  <div className="input-block mb-3 col-sm-6">
                    <label className="col-form-label">
                       Children<span className="text-danger">* If true insert number of children. Otherwise write no.</span>
                    </label>
                    <input
                      className={"form-control"}
                      type="text"
                      name="children"
                      onChange={handleInputChange}
                      placeholder="Employee's nubmer of children"
                    />
                  </div>

                  <div className="input-block mb-3 col-sm-6">
                    <label className="col-form-label">
                      Start Day <span className="text-danger">*</span>
                    </label>
                    <div className="cal-icon">
                      <DatePicker
                        selected={employeeData.startDay}
                        onChange={(date) => selectDate(date, "startDay")}
                        className={`form-control ${
                          errors.startDay ? "border-danger" : ""
                        }`}
                        dateFormat="dd-MM-yyyy"
                        name="startDay"
                      />
                      {errors.startDay && (
                        <div className="text-danger">{errors.startDay}</div>
                      )}
                    </div>
                  </div>

                  <div className="input-block mb-3 col-sm-6">
                    <label className="col-form-label">
                      Anniversary <span className="text-danger">*</span>
                    </label>
                    <div className="cal-icon">
                      <DatePicker
                        selected={employeeData.anniversary}
                        onChange={(date) => selectDate(date, "anniversary")}
                        className={`form-control ${
                          errors.anniversary ? "border-danger" : ""
                        }`}
                        dateFormat="dd-MM-yyyy"
                        name="anniversary"
                      />
                      {errors.anniversary && (
                        <div className="text-danger">{errors.anniversary}</div>
                      )}
                    </div>
                  </div>

                  <div className="input-block mb-3 col-sm-6">
                    <label className="col-form-label">
                      Interesting Fact <span className="text-danger">*</span>
                    </label>
                    <input
                      className={`form-control`}
                      type="text"
                      name="interestingFact"
                      onChange={handleInputChange}
                      placeholder="Interesting Fact"
                    />
                  </div>

                  <div className="input-block mb-3 col-sm-6">
                    <label className="col-form-label">
                      Favorite Singers <span className="text-danger">*</span>
                    </label>
                    <div className="col-sm-12 row mb-3">
                      <input
                        className={`form-control`}
                        type="text"
                        name="singers"
                        onChange={handleInputChange}
                        placeholder={`Singers`}
                      />
                    </div>
                  </div>

                  <div className="col-sm-12">
                    <div className="input-block mb-3">
                      <label className="col-form-label">
                        Food and drinks <span className="text-danger">*</span>
                      </label>
                      {employeeData.foodAndDrinks.map((item, index) => (
                        <div className="row mb-3" key={index}>
                          <div className="col-sm-4">
                            <input
                              className={`form-control`}
                              type="text"
                              name="foodAndDrinks"
                              value={item.food1}
                              onChange={(e) =>
                                handleInputChange(e, index, "food1")
                              }
                              placeholder="Food 1"
                            />
                          </div>
                          <div className="col-sm-4">
                            <input
                              className={`form-control`}
                              type="text"
                              name="foodAndDrinks"
                              value={item.food2}
                              onChange={(e) =>
                                handleInputChange(e, index, "food2")
                              }
                              placeholder="Food 2"
                            />
                          </div>
                          <div className="col-sm-4">
                            <input
                              className={`form-control`}
                              type="text"
                              name="foodAndDrinks"
                              value={item.drink}
                              onChange={(e) =>
                                handleInputChange(e, index, "drink")
                              }
                              placeholder="Drink"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="col-sm-12">
                    <div className="input-block mb-3">
                      <label className="col-form-label">
                        Favorite Restaurants{" "}
                        <span className="text-danger">*</span>
                      </label>
                      {employeeData.restaurants.map((item, index) => (
                        <div className="row mb-3" key={index}>
                          <div className="col-sm-6">
                            <input
                              className="form-control"
                              type="text"
                              name="restaurants"
                              value={item.restaurant1}
                              onChange={(e) =>
                                handleInputChange(e, index, "restaurant1")
                              }
                              placeholder="Restaurant 1"
                            />
                          </div>
                          <div className="col-sm-6">
                            <input
                              className="form-control"
                              type="text"
                              name="restaurants"
                              value={item.restaurant2}
                              onChange={(e) =>
                                handleInputChange(e, index, "restaurant2")
                              }
                              placeholder="Restaurant 2"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="col-sm-12">
                    <div className="input-block mb-3">
                      <label className="col-form-label">
                        Favorite Hobbies <span className="text-danger">*</span>
                      </label>
                      {employeeData.hobbies.map((item, index) => (
                        <div className="row mb-3" key={index}>
                          <div className="col-sm-4">
                            <input
                              className="form-control"
                              type="text"
                              name="hobbies"
                              value={item.hobby1 || ""}
                              onChange={(e) =>
                                handleInputChange(e, index, "hobby1")
                              }
                              placeholder="Hobby 1"
                            />
                          </div>
                          <div className="col-sm-4">
                            <input
                              className="form-control"
                              type="text"
                              name="hobbies"
                              value={item.hobby2 || ""}
                              onChange={(e) =>
                                handleInputChange(e, index, "hobby2")
                              }
                              placeholder="Hobby 2"
                            />
                          </div>
                          <div className="col-sm-4">
                            <input
                              className="form-control"
                              type="text"
                              name="hobbies"
                              value={item.hobby3 || ""}
                              onChange={(e) =>
                                handleInputChange(e, index, "hobby3")
                              }
                              placeholder="Hobby 3"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="submit-section">
                  <button
                    className="btn btn-primary submit-btn"
                    aria-label="Close"
                    type="submit"
                    style={{
                      width: "339px",
                      height: "60px",
                      borderRadius: "5px",
                      backgroundColor: "black",
                      border: "none",
                    }}
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <MainPageEdit />
    </>
  );
};

export default AddEmployeeModal;
