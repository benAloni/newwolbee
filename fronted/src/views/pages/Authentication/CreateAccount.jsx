import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios, { AxiosError } from "axios";
import { auth } from "../../../firebase/firebaseConfig";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Applogo } from "../../../routes/ImagePath";
import { FirebaseError } from "firebase/app";

const schema = yup.object({
  fullName: yup.string().required("Full Name is required").trim(),
  id: yup.string().required("ID is required").trim(),
});

const CreateAccount = () => {
  const [networkError, setNetworkError] = useState("");
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    register,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const token = await auth.currentUser.getIdToken();

      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URI}/create-account`,
        {
          fullName: data.fullName,
          civilId: data.id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(data.fullName);
      
      const refreshedToken = await auth.currentUser.getIdTokenResult(true);
      if (response.status === 201) {
        if (refreshedToken.claims.role === "manager") {
          navigate("/adminDashboard");
        } else {
          navigate("/hrDashboard");
        }
      } 
    } catch (error) {
      if (error instanceof FirebaseError) {
        if (error.code === "auth/network-request-failed") {
          setNetworkError(
            "Network error. Please check your internet connection and try again."
          );
        }
        console.error("Error signing up or adding document: ", error);
      }
    }
  };

  return (
    <div
      className="account-page"
      style={{
        background: "linear-gradient(to right, white, #FFC502, #FFEA00)",
      }}
    >
      <div className="main-wrapper">
        <div className="account-content">
          <div className="container">
            {/* Account Logo */}
            <div className="account-logo">
              <Link to="#">
                <img src={Applogo} alt="Dreamguy's Technologies" />
              </Link>
            </div>
            {/* /Account Logo */}
            <div className="account-box">
              <div className="account-wrapper">
                <h3 className="account-title">Register</h3>
                <p className="account-subtitle">
                  Please fill in your details in order to set your account{" "}
                </p>
                {/* Account Form */}
                <div>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="input-block mb-3">
                      {networkError && (
                        <span className="text-danger">
                          {/* network error */}
                          {networkError}
                        </span>
                      )}
                      <label className="col-form-label">Full Name</label>
                      <input
                        type="text"
                        name="fullName"
                        id="fullName"
                        {...register("fullName")}
                        className={`form-control ${
                          errors?.fullName ? "error-input" : ""
                        }`}
                        autoComplete="off"
                      />
                      <label className="col-form-label">ID</label>
                      <input
                        type="text"
                        name="id"
                        id="id"
                        {...register("id")}
                        className={`form-control ${
                          errors?.id ? "error-input" : ""
                        }`}
                        autoComplete="off"
                      />
                      <span className="text-danger">{errors?.id?.message}</span>
                    </div>

                    <div
                      className="input-block text-center"
                      style={{
                        background:
                          "linear-gradient(to right, white, #FFC502, #FFEA00)",
                      }}
                    >
                      <button
                        disabled={isSubmitting}
                        type="submit"
                        className="btn btn-primary account-btn"
                      >
                        {isSubmitting ? "Loading..." : "Register"}
                      </button>
                    </div>
                  </form>

                  {/* /Account Form */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;
