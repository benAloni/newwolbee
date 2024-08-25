import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Applogo } from "../../../Routes/ImagePath";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup.js";
import { resetFunctionwithlogin } from "../../../components/ResetFunction";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, googleAuthProvider } from "../../../firebase/firebaseConfig";
import { FirebaseError } from "firebase/app";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email address")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(20, "Password must be at most 20 characters")
    .required("Password is required"),
});

const Login = () => {
  const [passwordEye, setPasswordEye] = useState(true);
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

  //signInWithEmailAndPassword
  const onSubmit = async (data) => { 
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const user = userCredential.user;
      const tokenData = await user.getIdTokenResult();
      if (
        tokenData.claims.role !== null ||
        tokenData.claims.role === undefined
      ) {
        if (tokenData.claims.role === "manager") {
          navigate("/hrDashboard");
        } else if (tokenData.claims.role === "otherUser") {
          navigate("/myDashboard");
        } else {
          navigate("/fill-info");
        }
      }
    } catch (error) {
      if (error instanceof FirebaseError) {
        if (error.code === "auth/invalid-credential") {
          setCheckUser("Email or passwords are incorrect");
        } else {
          setNetworkError("An error occurred with Firebase: " + error.message);
        }
      } else {
        console.error("Error signing up or adding document: ", error);
      }
    }
  };

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleAuthProvider);
      const user = result.user;
      const tokenData = await user.getIdTokenResult();
      if (
        tokenData.claims.role !== null ||
        tokenData.claims.role === undefined
      ) {
        if (tokenData.claims.role === "manager") {
          navigate("/hrDashboard");
        } else if (tokenData.claims.role === "otherUser") {
          navigate("/myDashboard");
        } else {
          navigate("/fill-info");
        }
      }
    } catch (error) {
      console.error("Error signing up or adding document: ", error);
    }
  };

  resetFunctionwithlogin();

  return (
    <div>
      <div
        className="account-page"
        style={{
          background: "linear-gradient(to right, white, #FFC502, #FFEA00)",
        }}
      >
        <div className="main-wrapper">
          <div className="account-content">
            {/* <Link to="/job-list" className="btn btn-primary apply-btn"> */}
            {/* Apply Job */}
            {/* </Link> */}
            <div className="container">
              {/* Account Logo */}
              <div className="account-logo">
                <Link to="#">
                  <img
                    src={Applogo}
                    alt="Dreamguy's Technologies"
                    style={{ width: "200px" }}
                  />
                </Link>
              </div>
              {/* /Account Logo */}
              <div className="account-box">
                <div className="account-wrapper">
                  <h3 className="account-title">Login</h3>
                  <p className="account-subtitle">Access to our dashboard</p>
                  {/* Account Form */}
                  <div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="input-block mb-4">
                        <div className="input-block mb-4">
                          {checkUser && (
                            <span className="text-danger">{checkUser}</span>
                          )}
                        </div>
                        <label className="col-form-label">Email Address</label>
                        <input
                          id="email"
                          name="email" // Not strictly necessary, but good practice
                          type="email"
                          {...register("email")}
                          placeholder="Enter your email..."
                          className={`form-control ${
                            errors?.email ? "error-input" : ""
                          }`}
                        />

                        <span className="text-danger">
                          {" "}
                          {errors.email?.message}{" "}
                        </span>
                      </div>
                      <div className="input-block mb-4">
                        <div className="row">
                          <div className="col">
                            <label className="col-form-label">Password</label>
                          </div>
                          <div className="col-auto">
                            <Link className="text-muted" to="/forgot-password">
                              Forgot password?
                            </Link>
                          </div>
                        </div>
                        <div style={{ position: "relative" }}>
                          <input
                            type={passwordEye ? "password" : "text"}
                            id="password"
                            {...register("password")}
                            placeholder="Enter your password..."
                            className={`form-control ${
                              errors?.password ? "error-input" : ""
                            }`}
                            // autoComplete="off"
                          />
                          <span
                            style={{
                              position: "absolute",
                              right: "5%",
                              top: "30%",
                            }}
                            onClick={() => setPasswordEye(!passwordEye)}
                            className={`fa-solid ${
                              passwordEye ? "fa-eye-slash" : "fa-eye"
                            } `}
                          />
                        </div>
                        <span className="text-danger">
                          {" "}
                          {errors.password?.message}{" "}
                        </span>
                      </div>
                      <div className="input-block text-center">
                        <button
                          disabled={isSubmitting}
                          type="submit"
                          className="btn btn-primary account-btn"
                        >
                          {isSubmitting ? "Loading..." : "Login"}
                        </button>
                      </div>
                    </form>
                    <div className="account-footer">
                      <div className="d-flex align-items-center justify-content-center my-4">
                        <div className="flex-grow-1 border-top"></div>
                        <div className="mx-2 text-muted">or</div>
                        <div className="flex-grow-1 border-top"></div>
                      </div>
                      <div className="col s12 m6 offset-m3 center-align">
                        <div className="col-md-12">
                          <button
                            onClick={signInWithGoogle}
                            className="btn btn-lg btn-google btn-block btn-outline"
                            href="#"
                          >
                            <img
                              src="https://img.icons8.com/color/16/000000/google-logo.png"
                              alt="Google logo"
                              style={{ width: "26px", height: "26px" }}
                            />{" "}
                            Sign in with Google
                          </button>
                        </div>
                      </div>
                      <br />
                      <p>
                        Don't have an account yet?{" "}
                        <Link to="/register">Register</Link>
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
    </div>
  );
};

export default Login;
