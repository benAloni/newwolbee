/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Applogo } from "../../../routes/ImagePath";
import { emailrgx } from "./RegEx";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase/firebaseConfig";
import { FirebaseError } from "firebase/app";

const schema = yup.object({
  email: yup
    .string()
    .matches(emailrgx, "Email is required")
    .required("Email is required")
    .trim(),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(20, "Password must be at most 20 characters")
    .required("Password is required")
    .trim(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords do not match")
    .required("Please confirm your password")
    .trim(),
});

const Register = () => {
  const [passwordEye, setPasswordEye] = useState(true);
  const [confirmPasswordEye, setConfirmPasswordEye] = useState(true);
  const [checkUser, setCheckUser] = useState("");
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
      await createUserWithEmailAndPassword(auth, data.email, data.password);
      //navigate to create-account on order to force refresh the firebase token.
      navigate("/create-account");
    } catch (error) {
      if (error instanceof FirebaseError) {
        // console.log(error);
        switch (error.code) {
          case "auth/email-already-in-use":
            setCheckUser(
              "This email is already in use. Please use a different email."
            );
            break;
          case "auth/network-request-failed":
            setNetworkError(
              "Network error. Please check your internet connection and try again."
            );
            break;
          default:
            setCheckUser("An error occurred with Firebase: " + error.message);
            break;
        }
      } else {
        console.error("Error signing up or adding document: ", error);
        setNetworkError(
          "An unexpected error occurred. Please try again later."
        );
      }
    }
  };

  return (
    <div className="account-page">
      <div className="account-logo">
        <img
          src={Applogo}
          alt="Wolbee logo"
          style={{
            width: "50px",
            position: "absolute",
            top: "20px",
            left: "20px",
            zIndex: 10,
          }}
        />
      </div>
      <div className="main-wrapper">
        <div className="account-content">
          <div className="container">
            <div className="account-box">
              <div className="account-wrapper">
                <h3 className="account-title">Create an account</h3>
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
                      <label className="col-form-label">Email Address</label>
                      <input
                        id="email"
                        name="email" // Not strictly necessary, but good practice
                        type="email"
                        {...register("email")}
                        className={`form-control ${
                          errors?.email ? "error-input" : ""
                        }`}
                      />
                      <span className="text-danger">
                        {errors?.email?.message}
                      </span>
                      {checkUser && (
                        <span className="text-danger">
                          {/* check if email already exists in firebase & mongo */}
                          {checkUser}
                        </span>
                      )}
                    </div>

                    <div className="input-block mb-3">
                      <label className="col-form-label">Password</label>
                      <div
                        className="pass-group"
                        style={{ position: "relative", color:"black" }}
                      >
                        <input
                          type={passwordEye ? "password" : "text"}
                          id="password"
                          {...register("password")}
                          className={`form-control ${
                            errors?.password ? "error-input" : ""
                          }`}
                          autoComplete="off"
                        />
                        <span
                          style={{
                            position: "absolute",
                            right: "5%",
                            top: "30%",
                          }}
                          onClick={() => setPasswordEye(!passwordEye)}
                          className={`fa toggle-password ${
                            passwordEye ? "fa-eye-slash" : "fa-eye"
                          }`}
                        />
                      </div>
                      <span className="text-danger">
                        {errors?.password?.message}
                      </span>
                    </div>

                    <div className="input-block mb-3">
                      <label className="col-form-label">Confirm Password</label>
                      <div
                        className="pass-group"
                        style={{ position: "relative", color:"black" }}
                      >
                        <input
                          type={confirmPasswordEye ? "password" : "text"}
                          {...register("confirmPassword")}
                          className={`form-control ${
                            errors?.confirmPassword ? "error-input" : ""
                          }`}
                          autoComplete="off"
                        />
                        <span
                          style={{
                            position: "absolute",
                            right: "5%",
                            top: "30%",
                          }}
                          onClick={() =>
                            setConfirmPasswordEye(!confirmPasswordEye)
                          }
                          className={`fa toggle-password ${
                            confirmPasswordEye ? "fa-eye-slash" : "fa-eye"
                          }`}
                        />
                      </div>
                      <span className="text-danger">
                        {errors?.confirmPassword?.message}
                      </span>
                    </div>
                    <div className="input-block text-center">
                      <button
                        disabled={isSubmitting}
                        type="submit"
                        className="btn btn-primary account-btn"
                      >
                        {isSubmitting ? "Loading..." : "Register"}
                      </button>
                    </div>
                  </form>

                  <div className="account-footer">
                    <br />
                    <p className="text-dark">
                      Already have an account?{" "}
                      <Link style={{ color: "rgb(14, 60, 188)" }} to="/">
                        Login
                      </Link>
                    </p>
                  </div>
                </div>
                {/* /Account Form */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
