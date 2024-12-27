import React from "react";
import { Link } from "react-router-dom";
import { User } from "../../../../../routes/ImagePath";
import nicole from "../../../../../imgs/avatar_4.JPG";
import lisa from "../../../../../imgs/avatar_1.JPG";
import tom from "../../../../../imgs/avatar_2.JPG";
import david from "../../../../../imgs/avatar_3.JPG";
import brad from "../../../../../imgs/avatar_5.JPG";

const Statistics = () => {
  return (
    <div>
      <div className="row">
        <div className="col-md-6 text-center">
          <div className="card flex-fill">
            <div className="card-body" style={{ padding: "4rem" }}>
              <h4 className="card-title" style={{ fontSize: "2rem" }}>
                Budget Breakdown
              </h4>
              <div className="statistics">
                <div className="row">
                  <div className="col-md-6 col-6 text-center">
                    <div className="stats-box mb-4">
                      <p style={{ fontSize: "1.2rem" }}>Total Budget</p>
                      <h3 style={{ fontSize: "2rem" }}>2500$</h3>
                    </div>
                  </div>
                  <div className="col-md-6 col-6 text-center">
                    <div className="stats-box mb-4">
                      <p style={{ fontSize: "1.2rem" }}>Used Budget</p>
                      <h3 style={{ fontSize: "2rem" }}>870$</h3>
                    </div>
                  </div>
                </div>
              </div>
              <div className="progress mb-4">
                <div
                  className="progress-bar bg-purple"
                  role="progressbar"
                  style={{ width: "30%" }}
                  aria-valuenow={30}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  30%
                </div>
                <div
                  className="progress-bar bg-warning"
                  role="progressbar"
                  style={{ width: "22%" }}
                  aria-valuenow={18}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  22%
                </div>
                <div
                  className="progress-bar bg-success"
                  role="progressbar"
                  style={{ width: "24%" }}
                  aria-valuenow={12}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  24%
                </div>
                <div
                  className="progress-bar bg-danger"
                  role="progressbar"
                  style={{ width: "26%" }}
                  aria-valuenow={14}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  21%
                </div>
                <div
                  className="progress-bar bg-info"
                  role="progressbar"
                  style={{ width: "10%" }}
                  aria-valuenow={14}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  10%
                </div>
              </div>
              <div>
                <p style={{ fontSize: "1.1rem" }}>
                  <i className="far fa-dot-circle text-purple me-2" />
                  Company Events and Outings{" "}
                  <span className="float-end">260$</span>
                </p>
                <p style={{ fontSize: "1.1rem" }}>
                  <i className="far fa-dot-circle text-warning me-2" />
                  Birthday Presents <span className="float-end">170$</span>
                </p>
                <p style={{ fontSize: "1.1rem" }}>
                  <i className="far fa-dot-circle text-success me-2" />
                  Team Building Activities{" "}
                  <span className="float-end">180$</span>
                </p>
                <p style={{ fontSize: "1.1rem" }}>
                  <i className="far fa-dot-circle text-danger me-2" />
                  Personal Development <span className="float-end">170$</span>
                </p>
                <p className="mb-0" style={{ fontSize: "1.1rem" }}>
                  <i className="far fa-dot-circle text-info me-2" />
                  Employee of the Month Program{" "}
                  <span className="float-end">90$</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* _________________________________________________________________ */}
        <div className="col-md-6 text-center">
          <div className="card flex-fill dash-statistics">
            <div className="card-body">
              <h5 className="card-title">Employee Budget Allocation</h5>
              <div className="stats-list">
                <div className="stats-info d-flex align-items-center">
                  <img
                    src={nicole}
                    alt="Nicole"
                    className="me-2"
                    style={{
                      width: "50px",
                      height: "50px",
                      border: "none",
                      borderRadius: "100%",
                    }}
                  />
                  <div className="w-100">
                    <p>
                      Nicole{" "}
                      <strong>
                        80$ <small>/ 500$</small>
                      </strong>
                    </p>
                    <div className="progress">
                      <div
                        className="progress-bar bg-primary"
                        role="progressbar"
                        style={{ width: "16%" }}
                        aria-valuenow={16}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      />
                    </div>
                  </div>
                </div>
                <div className="stats-info d-flex align-items-center">
                  <img
                    src={brad}
                    alt="Brad"
                    className="me-2"
                    style={{
                      width: "50px",
                      height: "50px",
                      border: "none",
                      borderRadius: "100%",
                    }}
                  />
                  <div className="w-100">
                    <p>
                      Brad{" "}
                      <strong>
                        142$ <small>/ 350$</small>
                      </strong>
                    </p>
                    <div className="progress">
                      <div
                        className="progress-bar bg-warning"
                        role="progressbar"
                        style={{ width: "40%" }}
                        aria-valuenow={40}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      />
                    </div>
                  </div>
                </div>
                <div className="stats-info d-flex align-items-center">
                  <img
                    src={lisa}
                    alt="Lisa"
                    className="me-2"
                    style={{
                      width: "50px",
                      height: "50px",
                      border: "none",
                      borderRadius: "100%",
                    }}
                  />
                  <div className="w-100">
                    <p>
                      Lisa{" "}
                      <strong>
                        185$ <small>/ 300$</small>
                      </strong>
                    </p>
                    <div className="progress">
                      <div
                        className="progress-bar bg-success"
                        role="progressbar"
                        style={{ width: "61%" }}
                        aria-valuenow={61}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      />
                    </div>
                  </div>
                </div>
                <div className="stats-info d-flex align-items-center">
                  <img
                    src={tom}
                    alt="Tom"
                    className="me-2"
                    style={{
                      width: "50px",
                      height: "50px",
                      border: "none",
                      borderRadius: "100%",
                    }}
                  />
                  <div className="w-100">
                    <p>
                      Tom{" "}
                      <strong>
                        190$ <small>/ 700$</small>
                      </strong>
                    </p>
                    <div className="progress">
                      <div
                        className="progress-bar bg-danger"
                        role="progressbar"
                        style={{ width: "27%" }}
                        aria-valuenow={27}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      />
                    </div>
                  </div>
                </div>
                <div className="stats-info d-flex align-items-center">
                  <img
                    src={david}
                    alt="David"
                    className="me-2"
                    style={{
                      width: "50px",
                      height: "50px",
                      border: "none",
                      borderRadius: "100%",
                    }}
                  />
                  <div className="w-100">
                    <p>
                      David{" "}
                      <strong>
                        322$ <small>/ 400$</small>
                      </strong>
                    </p>
                    <div className="progress">
                      <div
                        className="progress-bar bg-info"
                        role="progressbar"
                        style={{ width: "80%" }}
                        aria-valuenow={80}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ______________________________________________________________________________ */}
      </div>
    </div>
  );
};

export default Statistics;
