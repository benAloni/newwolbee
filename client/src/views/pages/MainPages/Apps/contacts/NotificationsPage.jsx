import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Notifications from "../notifications/Notifications";

const NotificationsPage = () => {
  const [windowDimension, detectHW] = useState({
    winWidth: window.innerWidth,
    winHeight: window.innerHeight,
  });
  const detectSize = () => {
    detectHW({
      winWidth: window.innerWidth,
      winHeight: window.innerHeight,
    });
  };
  useEffect(() => {
    window.addEventListener("resize", detectSize);
    return () => {
      window.removeEventListener("resize", detectSize);
    };
  }, [windowDimension]);

  // const toggleMobileMenu = () => {
  //   setMenu(!menu);
  // };

  useEffect(() => {
    let firstload = localStorage.getItem("minheight");
    if (firstload === "false") {
      setTimeout(function () {
        window.location.reload(1);
        localStorage.removeItem("minheight");
      }, 1000);
    }
  });
  return (
    <>
      <div
        className="page-wrapper"
        style={{ minHeight: windowDimension.winHeight }}
      >
        <div className="chat-main-row">
          {/* Contact Wrapper */}
          <div className="chat-main-wrapper">
            <div className="col-lg-12 message-view">
              <div className="chat-window">
                <div
                  
                >
                  <div className="row align-items-center">
                    <div className="col-6">
                      <h4 className="page-title mb-0">Notifications</h4>
                    </div>
                    <div className="col-6">
                      <div className="navbar justify-content-end">
                        <div className="search-box m-t-0">
                          <div className="input-group input-group-sm">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Search"
                              style={{ width: "300px" }}
                            />
                            <span className="input-group-append">
                              <button className="btn" type="button">
                                <i className="fa fa-search" />
                              </button>
                            </span>
                          </div>
                        </div>
                        <ul className="nav float-end custom-menu"></ul>
                      </div>
                    </div>
                  </div>
                </div>
                <br />
               
                <Notifications />
              </div>
            </div>
          </div>         
        </div>
      </div>
    </>
  );
};

export default NotificationsPage;
