import React from "react";
import { Link } from "react-router-dom";
import { Applogo } from "../../../routes/ImagePath";

const ForgotPassword = () => {
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
                <h3 className="account-title">Forgot Password?</h3>
                <p className="text-black">
                  Enter your email to get a password reset link
                </p>
                <form>
                  <div className="input-block">
                    <label>Email Address</label>
                    <input className="form-control" type="text" />
                  </div>
                  <div className="input-block text-center">
                    <button
                      className="btn btn-primary account-btn"
                      type="submit"
                    >
                      Reset Password
                    </button>
                  </div>
                  <div className="account-footer">
                    <p className="text-black">
                      Remember your password? <Link   style={{ color: "rgb(14, 60, 188)" }} to="/">Login</Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ForgotPassword;
