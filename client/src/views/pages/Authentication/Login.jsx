import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Applogo } from "../../../routes/ImagePath";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup.js";
import { signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import { auth, googleAuthProvider } from "../../../firebase/firebaseConfig";
import { FirebaseError } from "firebase/app";

const schema = yup.object().shape({
  email: yup.string().email("Please enter a valid email address").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").max(20, "Password must be at most 20 characters").required("Password is required"),
});

const Login = () => {
  const [passwordEye, setPasswordEye] = useState(true);
  const [checkUser, setCheckUser] = useState("");
  const navigate = useNavigate();

  const { handleSubmit, formState: { errors, isSubmitting }, register } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
      const user = userCredential.user;
      const tokenData = await user.getIdTokenResult();
      if (tokenData.claims.role === "manager") {
        navigate("/manager-dashboard");
      } else if (tokenData.claims.role === "otherUser") {
        navigate("/hr-dashboard");
      } else {
        navigate("/create-account");
      }
    } catch (error) {
      if (error instanceof FirebaseError) {
        setCheckUser("Email or password is incorrect");
      } else {
        console.error("Error signing in: ", error);
      }
    }
  };

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleAuthProvider);
      const user = result.user;
      const tokenData = await user.getIdTokenResult();
      if (tokenData.claims.role === "manager") {
        navigate("/manager-dashboard");
      } else if (tokenData.claims.role === "otherUser") {
        navigate("/hr-dashboard");
      } else {
        navigate("/create-account");
      }
    } catch (error) {
      console.error("Error signing in: ", error);
    }
  };

  return (
    <div className="account-page">
     
      <button
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          padding: "10px 16px",
          fontSize: "16px",
          cursor: "pointer",
          borderRadius: "6px",
          transition: "background-color 0.3s ease, transform 0.2s",
        }}
        onClick={() => navigate("/questionnaire")}
      >
        Employee Questionnaire
      </button>

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
                <h3 className="account-title">Login</h3>

                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="input-block mb-4">
                    {checkUser && <span className="text-danger">{checkUser}</span>}
                    <label className="label">Email Address</label>
                    <input
                      type="email"
                      {...register("email")}
                      placeholder="Enter your email..."
                      className={`form-control ${errors?.email ? "error-input" : ""}`}
                    />
                    <span className="text-danger">{errors.email?.message}</span>
                  </div>

                  <div className="input-block mb-4">
                    <div className="row">
                      <div className="col">
                        <label className="col-form-label">Password</label>
                      </div>
                      <div className="col-auto">
                        <Link className="forgot-pass-link" to="/forgot-password">Forgot password?</Link>
                      </div>
                    </div>
                    <div style={{ position: "relative", color: "black" }}>
                      <input
                        type={passwordEye ? "password" : "text"}
                        {...register("password")}
                        placeholder="Enter your password..."
                        className={`form-control ${errors?.password ? "error-input" : ""}`}
                      />
                      <span
                        style={{
                          position: "absolute",
                          right: "5%",
                          top: "30%",
                          cursor: "pointer",
                        }}
                        onClick={() => setPasswordEye(!passwordEye)}
                        className={`fa-solid ${passwordEye ? "fa-eye-slash" : "fa-eye"}`}
                      />
                    </div>
                    <span className="text-danger">{errors.password?.message}</span>
                  </div>

                  <div className="input-block text-center">
                    <button disabled={isSubmitting} type="submit" className="btn btn-primary account-btn">
                      {isSubmitting ? "Loading..." : "Login"}
                    </button>
                  </div>
                </form>

                <div className="account-footer">
                  <div className="d-flex align-items-center justify-content-center my-4">
                    <div className="flex-grow-1 border-top"></div>
                    <div className="mx-2 text-dark">or</div>
                    <div className="flex-grow-1 border-top"></div>
                  </div>
                  <button onClick={signInWithGoogle} className="signin-with-google-btn">
                    <img src="https://img.icons8.com/ios-filled/50/1A1A1A/google-logo.png" alt="google-logo" style={{ width: "26px", height: "26px" }} />
                    Sign in with Google
                  </button>
                  <p className="text-dark">
                    Don't have an account yet? <Link style={{ color: "rgb(14, 60, 188)" }} to="/register">Register</Link>
                  </p>
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
