import React, { useEffect, useRef, useState } from "react";
import Modal from "react-modal";
import DatePicker from "react-datepicker";
import Select from "react-select";
import MainPageEdit from "./MainPageEdit";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { app, storage } from "../../../firebase/firebaseConfig";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import {
  addEmployee,
  fetchTeams,
  uploadEmployeeImage,
} from "../../../services";
import { userProfile } from "../../../imgs";
import { useSelector } from "react-redux";

const AddEmployeeModal = ({ onClose, isOpen, onEmployeeAdded }) => {
  // const [addEmployeeModalOpen, setAddEmployeeModalOpen] = useState(false);
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedMaritalStatus, setSelectedMaritalStatus] = useState("");
  const [selectedTeam, setSelectedTeam] = useState("");

  const [employeeDates, setEmployeeDates] = useState({
    dateOfBirth: null,
    startDay: null,
    anniversary: null,
  });

  const [employeeProfileImage, setEmployeeProfileImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();
  const uid = useSelector((state) => state.auth?.user.uid);
  const employeeId = watch("employeeId");
  const genderRef = useRef();
  const maritalStatusRef = useRef();
  const teamRef = useRef();

  const resetForm = () => {
    reset();
    genderRef.current.clearValue();
    maritalStatusRef.current.clearValue();
    teamRef.current.clearValue();
    setSelectedImage(userProfile);
    setEmployeeDates("");
  };

  const { data: teams } = useQuery({
    queryKey: ["teams"],
    queryFn: fetchTeams,
  });

  const customStyles = (error) => ({
    control: (provided) => ({
      ...provided,
      borderColor: error ? "red" : provided.borderColor,
    }),
  });

  const onSubmit = async (data) => {
    const formData = {
      ...data,
      ...employeeDates,
      team: selectedTeam,
      gender: selectedGender,
      maritalStatus: selectedMaritalStatus,
      
    };
    try {
      const response = await addEmployee({
        employeeData: formData,
      });
      if (response.status === 200) {
        await uploadEmployeeImage();
        Swal.fire(
          "Success!",
          `${data.fullName} has been added successfully to our employees`,
          "success"
        );
        queryClient.invalidateQueries("employees");
        onEmployeeAdded();
        resetForm();
      }
    } catch (error) {
      if (error.message?.includes("already exists")) {
        Swal.fire(
          "Error!",
          `According to our employees records, an employee with the Id number : ${data.employeeId} you entered, already exists.`,
          "warning"
        );
      }
      console.log(error.message);
    }
  };

  const handleSelectedDate = (date, name) => {
    setEmployeeDates((prevData) => ({
      ...prevData,
      [name]: date ? date.toISOString() : "",
    }));
  };
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedImage(URL.createObjectURL(event.target.files[0]));
      setEmployeeProfileImage(event.target.files[0]);
    }
  };
  const uploadEmployeeImage = async () => {
    if (!employeeProfileImage || !employeeId) return;

    const storageRef = ref(
      storage,
      `/employeesProfilePics/${uid}/${employeeId}`
    );

    try {
      const snapshot = await uploadBytes(storageRef, employeeProfileImage);
      const url = await getDownloadURL(snapshot.ref);
      setEmployeeProfileImage(url);
      queryClient.invalidateQueries(["employees"]);
    } catch (error) {
      console.log("Error uploading image:", error.message);
    }
  };

  // // Mutation for adding a notification
  // const addNotificationMutation = useMutation({
  //   mutationFn: async (eventData) => {
  //     const response = await axios.post(
  //       `${process.env.REACT_APP_SERVER_URI}/addNotification`,
  //       { notificationsData: [eventData] },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${user.token}`,
  //         },
  //       }
  //     );
  //     return response.data;
  //   },
  //   onSuccess: () => {
  //     queryClient.invalidateQueries(["employees"]);
  //   },
  //   onError: (error) => {
  //     console.error("Error adding notification:", error);
  //   },
  // });

  return (
    <>
      <div id="add_employee" className="modal custom-modal fade" role="dialog">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add Employee</h5>
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
              <form onSubmit={handleSubmit(onSubmit)}>
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
                      {...register("fullName")}
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
                        {...register("employeeId")}
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
                        {...register("employeeOfManagerId")}
                        placeholder="Employee's manager Id"
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
                        {...register("role")}
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
                      ref={teamRef}
                      options={teams?.map((team) => ({
                        value: team.name,
                        label: team.name,
                      }))}
                      placeholder="Select a team"
                      onChange={(selectedOption) =>
                        setSelectedTeam(
                          selectedOption ? selectedOption.value : ""
                        )
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
                        selected={employeeDates.dateOfBirth}
                        onChange={(date) =>
                          handleSelectedDate(date, "dateOfBirth")
                        }
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
                      name="address"
                      {...register("address")}
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
                      ref={genderRef}
                      options={[
                        { value: "male", label: "Male" },
                        { value: "female", label: "Female" },
                        { value: "other", label: "Other" },
                      ]}
                      placeholder="Select A Gender"
                      onChange={(selectedOption) =>
                        setSelectedGender(
                          selectedOption ? selectedOption.value : ""
                        )
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
                      ref={maritalStatusRef}
                      options={[
                        { value: "single", label: "Single" },
                        { value: "married", label: "Married" },
                        { value: "widowed", label: "Widowed" },
                        { value: "divorced", label: "Divorced" },
                        { value: "separated ", label: "Separated " },
                      ]}
                      placeholder="Select A Marital Status"
                      onChange={(selectedOption) =>
                        setSelectedMaritalStatus(
                          selectedOption ? selectedOption.value : ""
                        )
                      }
                      isClearable
                      name="maritalStatus"
                    />
                  </div>
                  <div className="input-block mb-3 col-sm-6">
                    <label className="col-form-label">
                      Anniversary <span className="text-danger">*</span>
                    </label>
                    <div className="cal-icon">
                      <DatePicker
                        selected={employeeDates.anniversary}
                        onChange={(date) =>
                          handleSelectedDate(date, "anniversary")
                        }
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
                      Children
                      <span className="text-danger">
                        * If true insert number of children. Otherwise write no.
                      </span>
                    </label>
                    <input
                      className={"form-control"}
                      type="text"
                      name="children"
                      {...register("children")}
                      placeholder="Employee's nubmer of children"
                    />
                  </div>

                  <div className="input-block mb-3 col-sm-6">
                    <label className="col-form-label">
                      Start Day <span className="text-danger">*</span>
                    </label>
                    <div className="cal-icon">
                      <DatePicker
                        selected={employeeDates.startDay}
                        onChange={(date) =>
                          handleSelectedDate(date, "startDay")
                        }
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
                      Interesting Fact <span className="text-danger">*</span>
                    </label>
                    <input
                      className={`form-control`}
                      type="text"
                      name="interestingFact"
                      {...register("interestingFact")}
                      placeholder="Interesting fact"
                    />
                  </div>
                  <div className="input-block mb-3 col-sm-6">
                    <label className="col-form-label">
                      Favorite Singer <span className="text-danger">*</span>
                    </label>
                    <input
                      className={`form-control`}
                      type="text"
                      name="favoriteSinger"
                      {...register("favoriteSinger")}
                      placeholder={`favorite singer`}
                    />
                  </div>
                  <div className="input-block mb-3 col-sm-6">
                    <label className="col-form-label">
                      Phone Number <span className="text-danger">*</span>
                    </label>
                    <input
                      className={`form-control ${
                        errors.phone ? "border-danger" : ""
                      }`}
                      type="text"
                      name="phone"
                      {...register("phone")}
                      placeholder="Employee's phone"
                    />
                    {errors.phone && (
                      <div className="text-danger">{errors.phone}</div>
                    )}
                  </div>
                  <div className="col-sm-12">
                    <div className="input-block mb-3">
                      <label className="col-form-label">
                        Food and drinks <span className="text-danger">*</span>
                      </label>
                      <div className="row mb-3">
                        <div className="col-sm-4">
                          <input
                            className={`form-control`}
                            type="text"
                            name="favoriteFoods"
                            {...register("food1")}
                            placeholder="Food 1"
                          />
                        </div>
                        <div className="col-sm-4">
                          <input
                            className={`form-control`}
                            type="text"
                            name="favoriteFoods"
                            {...register("food2")}
                            placeholder="Food 2"
                          />
                        </div>
                        <div className="col-sm-4">
                          <input
                            className={`form-control`}
                            type="text"
                            name="favoriteDrink"
                            {...register("drink")}
                            placeholder="Drink"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-12">
                    <div className="input-block mb-3">
                      <label className="col-form-label">
                        Favorite Restaurants{" "}
                        <span className="text-danger">*</span>
                      </label>
                      <div className="row mb-3">
                        <div className="col-sm-6">
                          <input
                            className="form-control"
                            type="text"
                            name="favoriteRestaurants"
                            {...register("restaurant1")}
                            placeholder="Restaurant 1"
                          />
                        </div>
                        <div className="col-sm-6">
                          <input
                            className="form-control"
                            type="text"
                            name="favoriteRestaurants"
                            {...register("restaurant2")}
                            placeholder="Restaurant 2"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-12">
                    <div className="input-block mb-3">
                      <label className="col-form-label">
                        Favorite Hobbies <span className="text-danger">*</span>
                      </label>
                      <div className="row mb-3">
                        <div className="col-sm-4">
                          <input
                            className="form-control"
                            type="text"
                            name="hobbies"
                            {...register("hobby1")}
                            placeholder="Hobby 1"
                          />
                        </div>
                        <div className="col-sm-4">
                          <input
                            className="form-control"
                            type="text"
                            name="hobbies"
                            {...register("hobby2")}
                            placeholder="Hobby 2"
                          />
                        </div>
                        <div className="col-sm-4">
                          <input
                            className="form-control"
                            type="text"
                            name="hobbies"
                            {...register("hobby3")}
                            placeholder="Hobby 3"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="d-flex justify-content-center mt-5 mb-2 ">
                    <div
                      className="d-flex flex-column align-items-center text-center"
                      style={{
                        border: "2px solid rgb(71, 89, 114)",
                        padding: "25px",
                        borderRadius: "100%",
                        height: "10rem",
                        width: "fit-content",
                      }}
                    >
                      <input
                        type="file"
                        id="employee-profile-pic"
                        onChange={onImageChange}
                        hidden
                        data-bs-toggle="tooltip"
                        title="Add an employee image"
                      />
                      <label
                        htmlFor="employee-profile-pic"
                        style={{
                          backgroundImage: `url(${
                            selectedImage || userProfile
                          })`,
                          width: "120px",
                          height: "120px",
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                      />
                    </div>
                    {/* <button
                      onClick={uploadEmployeeImage}
                      className="btn btn-outline-info "
                      data-bs-toggle="tooltip"
                      title="Add an employee image"
                    >
                      Upload Employee Image
                    </button> */}
                  </div>
                </div>
                <div className="submit-section">
                  <button
                    disabled={isSubmitting}
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
                    {isSubmitting ? "Submitting..." : "Submit"}
                  </button>
                </div>
                {/* <Profile employeeId={data?.employeeId} /> */}
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
