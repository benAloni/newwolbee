import React, { useEffect, useRef, useState } from "react";
import Modal from "react-modal";
import DatePicker from "react-datepicker";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
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
import { useForm, Controller } from "react-hook-form";
import {
  addEmployee,
  fetchTeams,
  uploadEmployeeImage,
} from "../../../services";
import { userProfile } from "../../../imgs";
import { useSelector } from "react-redux";

const AddEmployeeModal = ({ onEmployeeAdded }) => {
  const defaultValues = {
    dateOfBirth: null,
    startDay: null,
    anniversary: null,
    spouseDob: null,
  };
  const [childrenCount, setChildrenCount] = useState(0);
  const [selectedMaritalStatus, setSelectedMaritalStatus] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);
  const [employeeProfileImage, setEmployeeProfileImage] = useState(null);
  const genderOptions = [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
    { value: "Other", label: "Other" },
  ];
  const [relationOptions, setRelationOptions] = useState([
    { value: "Mother", label: "Mother" },
    { value: "Father", label: "Father" },
    { value: "Spouse", label: "Spouse" },
    { value: "Son", label: "Son" },
    { value: "Daughter", label: "Daughter" },
    { value: "GrandFather", label: "GrandFather" },
    { value: "GrandMother", label: "GrandMother" },
    { value: "Uncle", label: "Uncle" },
    { value: "Aunt", label: "Aunt" },
    { value: "Friend", label: "Friend" },
  ]);
  const [selectedContactRelation, setSelectedContactRelation] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    control,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues });
  const uid = useSelector((state) => state.auth?.user.uid);
  const employeeId = watch("employeeId");
  const contactRef = useRef();
  const maritalStatusRef = useRef();
  const resetForm = () => {
    reset();
    setSelectedOption(null);
    setChildrenCount(0);
    contactRef.current.clearValue();
    setSelectedImage(userProfile);
  };

  const { data: teams } = useQuery({
    queryKey: ["teams"],
    queryFn: fetchTeams,
  });

  const onSubmit = async (data) => {
    try {
      const uploadedEmployeeProfileImage = await uploadEmployeeImage();
      let formData;
      formData = {
        ...data,
        maritalStatus: selectedMaritalStatus,
        contactRelationType: selectedContactRelation,
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

  const convertToISOString = (date) => {
    return date
      ? new Date(date.getTime() - date.getTimezoneOffset() * 60000)
      : "";
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
                        maxLength={9}
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
                        maxLength={9}
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
                      maxLength={10}
                    />
                    {errors.phone && (
                      <div className="text-danger">{errors.phone}</div>
                    )}
                  </div>
                  <div className="input-block mb-3 col-sm-6">
                    <label className="col-form-label">
                      Company Email <span className="text-danger">*</span>
                    </label>
                    <input
                      className={`form-control ${
                        errors.companyEmail ? "border-danger" : ""
                      }`}
                      type="email"
                      name="companyEmail"
                      {...register("companyEmail")}
                      placeholder="Employee's email"
                    />
                    {errors.companyEmail && (
                      <div className="text-danger">{errors.companyEmail}</div>
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
                    <Controller
                      name="team"
                      control={control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          options={teams?.map((team) => ({
                            value: team.name,
                            label: team.name,
                          }))}
                          value={selectedOption}
                          onChange={(selected) => {
                            setSelectedOption(selected);
                            field.onChange(selected);
                          }}
                          isClearable
                          placeholder="Select a team"
                        />
                      )}
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
                      {
                        <Controller
                          control={control}
                          name="dateOfBirth"
                          render={({ field }) => (
                            <DatePicker
                              className={`form-control ${
                                errors.dateOfBirth ? "border-danger" : ""
                              }`}
                              placeholderText="Select date"
                              onChange={(date) =>
                                field.onChange(convertToISOString(date))
                              }
                              selected={field.value}
                              dateFormat="dd/MM/yyyy"
                            />
                          )}
                        />
                      }
                      {errors.dateOfBirth && (
                        <div className="text-danger">{errors.dateOfBirth}</div>
                      )}
                    </div>
                  </div>
                  <div className="input-block mb-3 col-sm-6">
                    <label className="col-form-label">
                      Religion <span className="text-danger">*</span>
                    </label>
                    <Controller
                      name="religion"
                      control={control}
                      render={({ field }) => (
                        <Select
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
                          {...field}
                          value={selectedOption}
                          onChange={(selected) => {
                            setSelectedOption(selected);
                            field.onChange(selected);
                          }}
                          placeholder="Select a religion"
                          isClearable
                        />
                      )}
                    />
                  </div>
                  <div className="input-block mb-3 col-sm-6">
                    <label className="col-form-label">
                      Ethnicity <span className="text-danger">*</span>
                    </label>
                    <Controller
                      name="ethnicity"
                      control={control}
                      render={({ field }) => (
                        <Select
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
                          {...field}
                          value={selectedOption}
                          onChange={(selected) => {
                            setSelectedOption(selected);
                            field.onChange(selected);
                          }}
                          placeholder="Select ethnicity"
                          isClearable
                        />
                      )}
                    />
                  </div>
                  <div className="input-block mb-3 col-sm-6">
                    <label className="col-form-label">
                      City Of Residence <span className="text-danger">*</span>
                    </label>
                    <input
                      className={`form-control ${
                        errors.address ? "border-danger" : ""
                      }`}
                      type="cityOfResidence"
                      name="address"
                      {...register("cityOfResidence")}
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
                    <Controller
                      name="gender"
                      control={control}
                      render={({ field }) => (
                        <Select
                          options={genderOptions}
                          {...field}
                          value={selectedOption}
                          onChange={(selected) => {
                            setSelectedOption(selected);
                            field.onChange(selected);
                          }}
                          isClearable
                        />
                      )}
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

                      <label className="col-form-label">
                        Spouse's Gender <span className="text-danger"> *</span>
                      </label>
                      <div className="row mb-3">
                        <div className="col-sm-12">
                          <Controller
                            name="spouseGender"
                            control={control}
                            render={({ field }) => (
                              <Select
                                options={genderOptions}
                                onChange={(selectedOption) =>
                                  field.onChange(selectedOption?.value || "")
                                }
                                isClearable
                              />
                            )}
                          />
                        </div>
                      </div>

                      <label className="col-form-label">
                        Spouse's Date of Birth{" "}
                        <span className="text-danger"> *</span>
                      </label>
                      <div className="row mb-3">
                        <div className="col-sm-12">
                          <div className="cal-icon">
                            <Controller
                              control={control}
                              name="spouseDob"
                              render={({ field }) => (
                                <DatePicker
                                  placeholderText="Select date"
                                  onChange={(date) =>
                                    field.onChange(convertToISOString(date))
                                  }
                                  selected={watch("spouseDob")}
                                  dateFormat="dd/MM/yyyy"
                                  className={`form-control ${
                                    errors.startDay ? "border-danger" : ""
                                  }`}
                                />
                              )}
                            />
                            {errors?.spouseDob && (
                              <div className="text-danger">
                                {errors?.spouseDob?.message}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="input-block mb-3 col-sm-8">
                        <label className="col-form-label">
                          Wedding Anniversary
                        </label>
                        <span className="text-danger"> *</span>
                        <div className="cal-icon">
                          <Controller
                            control={control}
                            name="anniversary"
                            render={({ field }) => (
                              <DatePicker
                                placeholderText="Select date"
                                onChange={(date) =>
                                  field.onChange(convertToISOString(date))
                                }
                                selected={field.value}
                                dateFormat="dd/MM/yyyy"
                                className={`form-control ${
                                  errors.startDay ? "border-danger" : ""
                                }`}
                              />
                            )}
                          />
                          {errors.anniversary && (
                            <div className="text-danger">
                              {errors.anniversary}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

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
                          name={`children[${index}].childFullName`}
                          {...register(`children[${index}].childFullName`, {
                            required: true,
                          })}
                          placeholder="Child's Full Name"
                        />
                      </div>
                      {/* Child's Gender */}
                      <div className="input-block col-md-4">
                        <label className="col-form-label">
                          Child's Relation type{" "}
                          <span className="text-danger"> *</span>
                        </label>
                        <Select
                          options={[
                            { value: "Son", label: "Son" },
                            { value: "Daughter", label: "Daughter" },
                            { value: "Son", label: "Son" },
                            { value: "Half Son", label: "Half Son" },
                            { value: "Step Son", label: "Step Son" },
                            { value: "Half Daughter", label: "Half Daughter" },
                            { value: "Step Daughter", label: "Step Daughter" },
                          ]}
                          placeholder="Select relation type of child"
                          onChange={(selectedOption) =>
                            setValue(
                              `children[${index}].childRelationType`,
                              selectedOption?.value
                            )
                          }
                          isClearable
                          name={`children[${index}].childRelationType`}
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
                            selected={watch(`children[${index}].childDob`)}
                            onChange={(date) =>
                              setValue(`children[${index}].childDob`, date)
                            }
                            className={`form-control ${
                              errors?.children?.[index]?.childDob
                                ? "border-danger"
                                : ""
                            }`}
                            dateFormat="dd-MM-yyyy"
                            name={`children[${index}].childDob`}
                          />
                          {errors?.children?.[index]?.childDob && (
                            <div className="text-danger">
                              {errors?.children?.[index]?.childDob.message}
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
                      <Controller
                        control={control}
                        name="startDay"
                        render={({ field }) => (
                          <DatePicker
                            placeholderText="Select date"
                            onChange={(e) => field.onChange(e)}
                            selected={field.value}
                            dateFormat="dd/MM/yyyy"
                            className={`form-control ${
                              errors.startDay ? "border-danger" : ""
                            }`}
                          />
                        )}
                      />
                      {errors.startDay && (
                        <div className="text-danger">{errors.startDay}</div>
                      )}
                    </div>
                  </div>

                  <div className="input-block mb-3 col-sm-8">
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
                      Favorite Singers <span className="text-danger">*</span>
                    </label>
                    <input
                      className={`form-control`}
                      type="text"
                      name="favoriteSingers"
                      {...register("favoriteSingers")}
                      placeholder={`favorite singers`}
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
                        <h5 className="mb-3">Emergency Contact Details</h5>
                      </div>
                      <div className="row mb-3">
                        <div className="col-sm-4">
                          <label className="col-form-label">
                            Full Name <span className="text-danger">*</span>
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
                          <CreatableSelect
                            ref={contactRef}
                            options={relationOptions}
                            value={selectedContactRelation}
                            placeholder="Select relationship type"
                            onChange={(selectedOption) =>
                              setSelectedContactRelation(selectedOption)
                            }
                            onCreateOption={(inputValue) => {
                              if (!inputValue) return;

                              const newOption = {
                                value: inputValue,
                                label: inputValue,
                              };
                              setRelationOptions((prev) => [
                                ...prev,
                                inputValue,
                              ]);
                              setSelectedContactRelation(newOption);
                            }}
                            isClearable
                            name="contactRelationType"
                          />
                        </div>
                        <div className="col-sm-4">
                          <label className="col-form-label">
                            Gender <span className="text-danger">*</span>
                          </label>
                          <Controller
                            name="contactGender"
                            control={control}
                            render={({ field }) => (
                              <Select
                                options={genderOptions}
                                {...field}
                                value={selectedOption}
                                onChange={(selected) => {
                                  setSelectedOption(selected);
                                  field.onChange(selected);
                                }}
                                placeholder="Select gender"
                                isClearable
                              />
                            )}
                          />
                        </div>
                        <div className="col-sm-4">
                          <label className="col-form-label">
                            Phone Number <span className="text-danger">*</span>
                          </label>
                          <input
                            className={`form-control`}
                            type="text"
                            name="contactPhoneNumber"
                            {...register("contactPhoneNumber")}
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
