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
          navigate("/manager-dashboard");
        } else {
          navigate("/hr-dashboard");
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
                <h3 className="account-title">Set account</h3>
                <p className="text-black">
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
                      <label className="label">Full Name</label>
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
                      <label className="label">ID</label>
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

                    <div className="input-block text-center">
                      <button
                        disabled={isSubmitting}
                        type="submit"
                        className="btn btn-primary account-btn"
                      >
                        {isSubmitting ? "Loading..." : "Create account"}
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
