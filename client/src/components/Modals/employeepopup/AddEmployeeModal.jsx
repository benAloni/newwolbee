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

const AddEmployeeModal = ({ onEmployeeAdded }) => {
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedMaritalStatus, setSelectedMaritalStatus] = useState("");
  const [selectedTeam, setSelectedTeam] = useState("");
  const [selectedReligion, setSelectedReligion] = useState("");
  const [childrenCount, setChildrenCount] = useState(0);
  const [selectedEthnicity, setSelectedEthnicity] = useState("");
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
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();
  const uid = useSelector((state) => state.auth?.user.uid);
  const employeeId = watch("employeeId");
  const genderRef = useRef();
  const religionRef = useRef();
  const ethnicityRef = useRef();
  const maritalStatusRef = useRef();
  const teamRef = useRef();

  const resetForm = () => {
    reset();
    genderRef.current.clearValue();
    religionRef.current.clearValue();
    ethnicityRef.current.clearValue();
    maritalStatusRef.current.clearValue();
    teamRef.current.clearValue();
    setChildrenCount(0);
    setSelectedImage(userProfile);
    setEmployeeDates({
      dateOfBirth: null,
      startDay: null,
      anniversary: null,
    });
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
    try {
      const uploadedEmployeeProfileImage = await uploadEmployeeImage();
      let formData;
      formData = {
        ...data,
        ...employeeDates,
        team: selectedTeam,
        gender: selectedGender,
        religion: selectedReligion,
        ethnicity: selectedEthnicity,
        maritalStatus: selectedMaritalStatus,
        imageUrl: uploadedEmployeeProfileImage,
      };
      const response = await addEmployee({
        employeeData: formData,
      });
      if (response.status === 200) {
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

  const handleChildrenChange = (e) => {
    const count = parseInt(e.target.value) || 0;
    setChildrenCount(count);

    for (let i = 0; i < count; i++) {
      setValue(`children[${i}].fullName`, "");
      setValue(`children[${i}].gender`, "");
      setValue(`children[${i}].dateOfBirth`, null);
    }
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
      console.log("Uploaded image URL:", url);
      queryClient.invalidateQueries(["employees"]);
      return url;
    } catch (error) {
      console.log("Error uploading image:", error.message);
    }
  };

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
                  <div className="input-block mb-3 col-sm-6">
                    <label className="col-form-label">
                      Email <span className="text-danger">*</span>
                    </label>
                    <input
                      className={`form-control ${
                        errors.email ? "border-danger" : ""
                      }`}
                      type="email"
                      name="email"
                      {...register("email")}
                      placeholder="Employee's email"
                    />
                    {errors.email && (
                      <div className="text-danger">{errors.email}</div>
                    )}
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
                      Date Of Birth <span className="text-danger">*</span>
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
                      Religion <span className="text-danger">*</span>
                    </label>
                    <Select
                      ref={religionRef}
                      options={[
                        { value: "Jewish", label: "Jewish" },
                        { value: "Christian", label: "Christian" },
                        { value: "Druze", label: "Druze" },
                        { value: "Muslim", label: "Muslim" },
                        { value: "Hindu", label: "Hindu" },
                        { value: "Buddhist", label: "Buddhist" },
                        { value: "Atheist", label: "Atheist" },
                        { value: "Other", label: "Other" },
                      ]}
                      placeholder="Select religion"
                      onChange={(selectedOption) =>
                        setSelectedReligion(
                          selectedOption ? selectedOption.value : ""
                        )
                      }
                      isClearable
                      name="religion"
                    />
                  </div>
                  <div className="input-block mb-3 col-sm-6">
                    <label className="col-form-label">
                      Ethnicity <span className="text-danger">*</span>
                    </label>

                    <Select
                      ref={ethnicityRef}
                      options={[
                        { value: "Ethiopian", label: "Ethiopian" },
                        { value: "Druze", label: "Druze" },
                        { value: "Russian", label: "Russian" },
                        { value: "Ukrainian", label: "Ukrainian" },
                        { value: "Georgian", label: "Georgian" },
                        { value: "Belarusian", label: "Belarusian" },
                        { value: "Azerbaijani", label: "Azerbaijani" },
                        { value: "Romanian", label: "Romanian" },
                        { value: "Hungarian", label: "Hungarian" },
                        { value: "Italian", label: "Italian" },
                        { value: "Polish", label: "Polish" },
                        { value: "German", label: "German" },
                        { value: "Tripolitan", label: "Tripolitan" },
                        { value: "Syrian", label: "Syrian" },
                        { value: "Iraqi", label: "Iraqi" },
                        { value: "Persian", label: "Persian" },
                        { value: "Yemeni", label: "Yemeni" },
                        { value: "Moroccan", label: "Moroccan" },
                        { value: "Mexican", label: "Mexican" },
                        { value: "Hindu", label: "Hindu" },
                        { value: "Other", label: "Other" },
                      ]}
                      placeholder="Select ethnicity"
                      onChange={(selectedOption) =>
                        setSelectedEthnicity(
                          selectedOption ? selectedOption.value : ""
                        )
                      }
                      isClearable
                      name="ethnicity"
                    />
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
                      placeholder="Select a gender"
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
                        { value: "Single", label: "Single" },
                        { value: "Married", label: "Married" },
                        { value: "Widowed", label: "Widowed" },
                        { value: "Divorced", label: "Divorced" },
                        { value: "Separated ", label: "Separated " },
                      ]}
                      placeholder="Select marital status"
                      onChange={(selectedOption) =>
                        setSelectedMaritalStatus(
                          selectedOption ? selectedOption.value : ""
                        )
                      }
                      isClearable
                      name="maritalStatus"
                    />
                  </div>
                  {selectedMaritalStatus === "Married" && (
                    <div className="input-block mb-3">
                      <div className="col-12">
                        <h5 className="mb-3">Spouse Details</h5>
                      </div>
                      {/* Spouse's Full Name */}
                      <label className="col-form-label">
                        Spouse's Full Name
                        <span className="text-danger"> *</span>
                      </label>
                      <div className="row mb-3">
                        <div className="col-sm-12">
                          <input
                            className={"form-control"}
                            type="text"
                            name="spouseFullName"
                            {...register("spouseFullName")}
                            placeholder="Employee's Spouse Full Name"
                          />
                        </div>
                      </div>

                      {/* Spouse's Gender */}
                      <label className="col-form-label">
                        Spouse's Gender <span className="text-danger"> *</span>
                      </label>
                      <div className="row mb-3">
                        <div className="col-sm-12">
                          <Select
                            options={[
                              { value: "male", label: "Male" },
                              { value: "female", label: "Female" },
                              { value: "other", label: "Other" },
                            ]}
                            placeholder="Select spouse's gender"
                            onChange={(selectedOption) =>
                              setValue("genderOfSpouse", selectedOption?.value)
                            }
                            isClearable
                            name="spouseGender"
                          />
                        </div>
                      </div>

                      {/* Spouse's Date of Birth */}
                      <label className="col-form-label">
                        Spouse's Date of Birth{" "}
                        <span className="text-danger"> *</span>
                      </label>
                      <div className="row mb-3">
                        <div className="col-sm-12">
                          <div className="cal-icon">
                            <DatePicker
                              selected={watch("spouseDateOfBirth")}
                              onChange={(date) =>
                                setValue("spouseDateOfBirth", date)
                              }
                              className={`form-control ${
                                errors?.spouseDateOfBirth?.dateOfBirth
                                  ? "border-danger"
                                  : ""
                              }`}
                              dateFormat="dd-MM-yyyy"
                              name={"spouseDateOfBirth"}
                            />
                            {errors?.spouse?.dateOfBirth && (
                              <div className="text-danger">
                                {errors?.spouse?.dateOfBirth.message}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      {/* Spouse's Full Name */}
                      <label className="col-form-label">
                        Spouse's Nationality
                        <span className="text-danger"> *</span>
                      </label>
                      <div className="row mb-3">
                        <div className="col-sm-12">
                          <input
                            className={"form-control"}
                            type="text"
                            name="spouseNationality"
                            {...register("spouseNationality")}
                            placeholder="Spouse's Nationality"
                          />
                        </div>
                      </div>
                      {/* Spouse's Full Name */}
                      <label className="col-form-label">
                        Spouse's Employment Status
                        <span className="text-danger"> *</span>
                      </label>
                      <div className="row mb-3">
                        <div className="col-sm-12">
                          <input
                            className={"form-control"}
                            type="text"
                            name="spouseEmploymentStatus"
                            {...register("spouseEmploymentStatus")}
                            placeholder="Spouse's Employment Status"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="input-block mb-3 col-sm-6">
                    <label className="col-form-label">
                      Wedding Anniversary
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
                      No. Of Children
                      <span className="text-danger"> *</span>
                    </label>
                    <input
                      className={"form-control"}
                      type="text"
                      name="children"
                      {...register("children", {
                        onChange: handleChildrenChange,
                      })}
                      placeholder="Employee's number of children"
                    />
                  </div>
                  {Array.from({ length: childrenCount }).map((_, index) => (
                    <div key={index} className="row mb-4">
                      {/* Child Details Header */}
                      <div className="col-12">
                        <h5 className="mb-3">
                          {`${
                            index === 0
                              ? "First"
                              : index === 1
                              ? "Second"
                              : index === 2
                              ? "Third"
                              : `${index + 1}th`
                          } Child Details`}
                        </h5>
                      </div>
                      {/* Child's Full Name */}
                      <div className="input-block col-md-4">
                        <label className="col-form-label">
                          Child's Full Name{" "}
                          <span className="text-danger"> *</span>
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          name={`children[${index}].fullName`}
                          {...register(`children[${index}].fullName`, {
                            required: true,
                          })}
                          placeholder="Child's Full Name"
                        />
                      </div>
                      {/* Child's Gender */}
                      <div className="input-block col-md-4">
                        <label className="col-form-label">
                          Child's Gender <span className="text-danger"> *</span>
                        </label>
                        <Select
                          options={[
                            { value: "boy", label: "Boy" },
                            { value: "girl", label: "Girl" },
                            { value: "other", label: "Other" },
                          ]}
                          placeholder="Select child's gender"
                          onChange={(selectedOption) =>
                            setValue(
                              `children[${index}].gender`,
                              selectedOption?.value
                            )
                          }
                          isClearable
                          name={`children[${index}].gender`}
                        />
                      </div>
                      {/* Child's Date of Birth */}
                      <div className="input-block col-md-4">
                        <label className="col-form-label">
                          Child's Date of Birth{" "}
                          <span className="text-danger"> *</span>
                        </label>
                        <div className="cal-icon">
                          <DatePicker
                            selected={watch(`children[${index}].dateOfBirth`)}
                            onChange={(date) =>
                              setValue(`children[${index}].dateOfBirth`, date)
                            }
                            className={`form-control ${
                              errors?.children?.[index]?.dateOfBirth
                                ? "border-danger"
                                : ""
                            }`}
                            dateFormat="dd-MM-yyyy"
                            name={`children[${index}].dateOfBirth`}
                          />
                          {errors?.children?.[index]?.dateOfBirth && (
                            <div className="text-danger">
                              {errors?.children?.[index]?.dateOfBirth.message}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}                 
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
                  <div className="input-block mb-3 col-sm-8">
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
                  <div className="col-sm-12">
                    <div className="input-block mb-3">
                    <div className="col-12">
                        <h5 className="mb-3">Emergency Contact  Details</h5>
                      </div>                     
                      <div className="row mb-3">
                        <div className="col-sm-4">
                          <label className="col-form-label">
                            Full Name{" "}
                            <span className="text-danger">*</span>
                          </label>
                          <input
                            className={`form-control`}
                            type="text"
                            name="contactFullName"
                            {...register("contactFullName")}
                            placeholder="Contact's Full Name"
                          />
                        </div>
                        <div className="col-sm-4">
                          <label className="col-form-label">
                          Relationship Type{" "}
                            <span className="text-danger">*</span>
                          </label>
                          <input
                            className={`form-control`}
                            type="text"
                            name="contactRelationType"
                            {...register("contactRelationType")}
                            placeholder="Contact's Relation Type"
                          />
                        </div>
                        <div className="col-sm-4">
                          <label className="col-form-label">
                            Phone Number{" "}
                            <span className="text-danger">*</span>
                          </label>
                          <input
                            className={`form-control`}
                            type="text"
                            name="contactPhone"
                            {...register("contactPhone")}
                            placeholder="Contact's Phone Number"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="d-flex justify-content-center mt-5 mb-2 ">
                    <div
                      className="d-flex flex-column align-items-center text-center"
                      style={{
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
