import React, { useEffect, useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import Select from "react-select";
import { useSelector } from "react-redux";
import MainPageEdit from "./MainPageEdit";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const AllEmployeeAddPopup = (props) => {
  const user = useSelector((state) => state.user.user);
  const queryClient = useQueryClient(); // Initialize queryClient
  const [isSubmitting, setIsSubmitting] = useState(false); // Track form submission


  const [employeeData, setEmployeeData] = useState({
    FullName: "",
    EmployeeOfManagerId: "",
    EmployeeID: "",
    Role: "",
    Team: "",
    DataOfBirth: "",
    Address: "",
    MaritalStatus: "",
    NumOfChildren: 0,
    StartDay: "",
    Anniversary: "",
    LastestActivity: [''],
    InterestingFacts: "",
    ClosestPersonalEvent: [''],
    Singers: "",
    FoodAndDrinks: [{ Food1: "", Food2: "", Drink: "" }],
    Restaurants: [{ Restaurant1: "", Restaurant2: "" }],
    Hobbies: [{ Hobby1: "", Hobby2: "", Hobby3: "" }],
    TopInsights: [''],
    LatestInfo: [''],
    Vacation:[{name:"" , startDate:"" , endDate: ""}]
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

    if (name === "FoodAndDrinks") {
      setEmployeeData((prevData) => {
        const updatedFoodAndDrinks = [...prevData.FoodAndDrinks];
        updatedFoodAndDrinks[index] = {
          ...updatedFoodAndDrinks[index],
          [field]: value,
        };
        return {
          ...prevData,
          FoodAndDrinks: updatedFoodAndDrinks,
        };
      });
    } else if (name === "Restaurants") {
      setEmployeeData((prevData) => {
        const updatedRestaurants = [...prevData.Restaurants];
        updatedRestaurants[index] = {
          ...updatedRestaurants[index],
          [field]: value,
        };
        return {
          ...prevData,
          Restaurants: updatedRestaurants,
        };
      });
    } else if (name === "Hobbies") {
      setEmployeeData((prevData) => {
        const updatedHobbies = [...prevData.Hobbies];
        updatedHobbies[index] = {
          ...updatedHobbies[index],
          [field]: value,
        };
        return {
          ...prevData,
          Hobbies: updatedHobbies,
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
      console.log("Submitting employee data:", employeeData); // Log data being sent
  
      try {
        setIsSubmitting(true); // Disable the submit button when submission starts
        const response = await axios.post(
          "http://localhost:5000/api/addEmployees",
          employeeData,
          {
            headers: {
              Authorization: `Bearer ${user.token}`, // Ensure `user.token` is available
            },
          }
        );
        console.log("Response from server:", response.data); // Log server response
        return response.data;
      } catch (error) {
        console.error("Error adding employee:", error);
  
        // Check if the error response has a code 11000
        if (
          error.response &&
          error.response.status === 500 &&
          error.response.data.message.includes("11000")
        ) {
          throw new Error(
            "Duplicate entry detected. Please provide unique values for all required fields."
          );
        }
  
        throw error; // Ensure other errors are propagated
      } finally {
        setIsSubmitting(false); // Re-enable the submit button even if there's an error
      }
    },
    onSuccess: () => {
      setSuccessMessage("Employee added successfully!");
      queryClient.invalidateQueries(["employees"]);
      addNotificationMutation.mutate(employeeData);

    },
    onError: (error) => {
      console.error("Error adding employee:", error);
      setSuccessMessage(error.message || "An error occurred. Please try again.");
    },
  });

  // Mutation for adding a notification
const addNotificationMutation = useMutation({
  mutationFn: async (eventData) => {
    const response = await axios.post(
      "http://localhost:5000/api/addAllNotifications",
      { notificationsData: [eventData] }, // Wrap eventData in an array
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
                  <div className="alert alert-success mt-3">
                    {successMessage}
                  </div>
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
  >                <div className="row">
                  <div className="input-block mb-3">
                    <label className="col-form-label">
                      Full Name <span className="text-danger">*</span>
                    </label>
                    <input
                      className={`form-control ${
                        errors.FullName ? "border-danger" : ""
                      }`}
                      type="text"
                      name="FullName"
                      value={employeeData.FullName}
                      onChange={handleInputChange}
                      placeholder="Employee's Full Name"
                    />
                    {errors.FullName && (
                      <div className="text-danger">{errors.FullName}</div>
                    )}
                  </div>

                  <div className="col-sm-6">
                    <div className="input-block mb-3">
                      <label className="col-form-label">
                        Employee ID# <span className="text-danger">*</span>
                      </label>
                      <input
                        className={`form-control ${
                          errors.EmployeeID ? "border-danger" : ""
                        }`}
                        type="text"
                        name="EmployeeID"
                        value={employeeData.EmployeeID}
                        onChange={handleInputChange}
                        placeholder="Employee ID"
                      />
                      {errors.EmployeeID && (
                        <div className="text-danger">{errors.EmployeeID}</div>
                      )}
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="input-block mb-3">
                      <label className="col-form-label">
                      Employee Of Manager Id <span className="text-danger">*</span>
                      </label>
                      <input
                        className={`form-control ${
                          errors.EmployeeOfManagerId ? "border-danger" : ""
                        }`}
                        type="text"
                        name="EmployeeOfManagerId"
                        value={employeeData.EmployeeOfManagerId}
                        onChange={handleInputChange}
                        placeholder="Manager Id"
                      />
                      {errors.EmployeeOfManagerId && (
                        <div className="text-danger">{errors.EmployeeOfManagerId}</div>
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
                          errors.Role ? "border-danger" : ""
                        }`}
                        type="text"
                        name="Role"
                        value={employeeData.Role}
                        onChange={handleInputChange}
                        placeholder="Employee ID"
                      />
                      {errors.Role && (
                        <div className="text-danger">{errors.Role}</div>
                      )}
                    </div>
                  </div>

                  <div className="input-block mb-3 col-sm-6">
                    <label className="col-form-label">
                      Team <span className="text-danger">*</span>
                    </label>
                    <Select
                      styles={customStyles(errors.Team)}
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
                        selectTeam(selectedOption, { name: "Team" })
                      }
                      isClearable
                      name="Team"
                    />
                    {errors.Team && (
                      <div className="text-danger">{errors.Team}</div>
                    )}
                  </div>

                  <div className="input-block mb-3 col-sm-6">
                    <label className="col-form-label">
                      Date of birth <span className="text-danger">*</span>
                    </label>
                    <div className="cal-icon">
                      <DatePicker
                        selected={employeeData.DataOfBirth}
                        onChange={(date) => selectDate(date, "DataOfBirth")}
                        className={`form-control ${
                          errors.DataOfBirth ? "border-danger" : ""
                        }`}
                        dateFormat="dd-MM-yyyy"
                        name="DataOfBirth"
                      />
                      {errors.DataOfBirth && (
                        <div className="text-danger">{errors.DataOfBirth}</div>
                      )}
                    </div>
                  </div>

                  <div className="input-block mb-3 col-sm-6">
                    <label className="col-form-label">
                      Address <span className="text-danger">*</span>
                    </label>
                    <input
                      className={`form-control ${
                        errors.Address ? "border-danger" : ""
                      }`}
                      type="text"
                      onChange={handleInputChange}
                      name="Address"
                      placeholder="Address"
                    />
                    {errors.Address && (
                      <div className="text-danger">{errors.Address}</div>
                    )}
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
                      placeholder="Select A Role"
                      onChange={(selectedOption) =>
                        selectTeam(selectedOption, { name: "MaritalStatus" })
                      }
                      isClearable
                      name="MaritalStatus"
                    />
                  </div>

                  <div className="input-block mb-3 col-sm-6">
                    <label className="col-form-label">
                      Number Of Children<span className="text-danger">*</span>
                    </label>
                    <input
                      className={"form-control"}
                      type="number"
                      name="NumOfChildren"
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
                        selected={employeeData.StartDay}
                        onChange={(date) => selectDate(date, "StartDay")}
                        className={`form-control ${
                          errors.StartDay ? "border-danger" : ""
                        }`}
                        dateFormat="dd-MM-yyyy"
                        name="StartDay"
                      />
                      {errors.StartDay && (
                        <div className="text-danger">{errors.StartDay}</div>
                      )}
                    </div>
                  </div>

                  <div className="input-block mb-3 col-sm-6">
                    <label className="col-form-label">
                    Anniversary <span className="text-danger">*</span>
                    </label>
                    <div className="cal-icon">
                      <DatePicker
                        selected={employeeData.Anniversary}
                        onChange={(date) => selectDate(date, "Anniversary")}
                        className={`form-control ${
                          errors.Anniversary ? "border-danger" : ""
                        }`}
                        dateFormat="dd-MM-yyyy"
                        name="Anniversary"
                      />
                      {errors.Anniversary && (
                        <div className="text-danger">{errors.Anniversary}</div>
                      )}
                    </div>
                  </div>

                  <div className="input-block mb-3 col-sm-6">
                    <label className="col-form-label">
                      Interesting Facts <span className="text-danger">*</span>
                    </label>
                    <input
                      className={`form-control`}
                      type="text"
                      name="InterestingFacts"
                      onChange={handleInputChange}
                      placeholder="Interesting Facts"
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
                        name="Singers"
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
                      {employeeData.FoodAndDrinks.map((item, index) => (
                        <div className="row mb-3" key={index}>
                          <div className="col-sm-4">
                            <input
                              className={`form-control`}
                              type="text"
                              name="FoodAndDrinks"
                              value={item.Food1}
                              onChange={(e) =>
                                handleInputChange(e, index, "Food1")
                              }
                              placeholder="Food 1"
                            />
                          </div>
                          <div className="col-sm-4">
                            <input
                              className={`form-control`}
                              type="text"
                              name="FoodAndDrinks"
                              value={item.Food2}
                              onChange={(e) =>
                                handleInputChange(e, index, "Food2")
                              }
                              placeholder="Food 2"
                            />
                          </div>
                          <div className="col-sm-4">
                            <input
                              className={`form-control`}
                              type="text"
                              name="FoodAndDrinks"
                              value={item.Drink}
                              onChange={(e) =>
                                handleInputChange(e, index, "Drink")
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
                      {employeeData.Restaurants.map((item, index) => (
                        <div className="row mb-3" key={index}>
                          <div className="col-sm-6">
                            <input
                              className="form-control"
                              type="text"
                              name="Restaurants"
                              value={item.Restaurant1}
                              onChange={(e) =>
                                handleInputChange(e, index, "Restaurant1")
                              }
                              placeholder="Restaurant 1"
                            />
                          </div>
                          <div className="col-sm-6">
                            <input
                              className="form-control"
                              type="text"
                              name="Restaurants"
                              value={item.Restaurant2}
                              onChange={(e) =>
                                handleInputChange(e, index, "Restaurant2")
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
                      {employeeData.Hobbies.map((item, index) => (
                        <div className="row mb-3" key={index}>
                          <div className="col-sm-4">
                            <input
                              className="form-control"
                              type="text"
                              name="Hobbies"
                              value={item.Hobby1 || ""}
                              onChange={(e) =>
                                handleInputChange(e, index, "Hobby1")
                              }
                              placeholder="Hobby 1"
                            />
                          </div>
                          <div className="col-sm-4">
                            <input
                              className="form-control"
                              type="text"
                              name="Hobbies"
                              value={item.Hobby2 || ""}
                              onChange={(e) =>
                                handleInputChange(e, index, "Hobby2")
                              }
                              placeholder="Hobby 2"
                            />
                          </div>
                          <div className="col-sm-4">
                            <input
                              className="form-control"
                              type="text"
                              name="Hobbies"
                              value={item.Hobby3 || ""}
                              onChange={(e) =>
                                handleInputChange(e, index, "Hobby3")
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

export default AllEmployeeAddPopup;
