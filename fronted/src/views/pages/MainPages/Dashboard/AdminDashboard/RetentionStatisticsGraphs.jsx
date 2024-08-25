
import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
// import "../../../../../assets/css/index.css";


const linechartdata = [
    { y: "Jan", "Total Sales": 70, "Total Revenue": 90, "turnover": 40 },
    { y: "Feb", "Total Sales": 60, "Total Revenue": 65, "turnover": 55 },
    { y: "March", "Total Sales": 32, "Total Revenue": 40, "turnover": 65 },
    { y: "April", "Total Sales": 67, "Total Revenue": 65, "turnover": 75 },
    { y: "May", "Total Sales": 90, "Total Revenue": 40, "turnover": 90 },
    { y: "June", "Total Sales": 55, "Total Revenue": 65, "turnover": 85 },
    { y: "July", "Total Sales": 23, "Total Revenue": 50, "turnover": 87 },
  ];


const RetentionStatisticsGraphs = () => {
  return (
    <div className="row">

    {/* //--------------------- */}
    <div className="col-md-6 text-center">
          <div className="card flex-fill dash-statistics">
            <div className="card-body">
              <h5 className="card-title">Employee Statisfaction</h5>
              <div className="stats-list">
                <div className="stats-info">
                  <p>
                    Nicole{" "}
                    <strong>
                      65%
                    </strong>
                  </p>
                  <div className="progress">
                    <div
                      className="progress-bar bg-primary"
                      role="progressbar"
                      style={{ width: "65%" }}
                      aria-valuenow={65}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    />
                  </div>
                </div>
                <div className="stats-info">
                  <p>
                    Ben{" "}
                    <strong>
                      53%
                    </strong>
                  </p>
                  <div className="progress">
                    <div
                      className="progress-bar bg-warning"
                      role="progressbar"
                      style={{ width: "53%" }}
                      aria-valuenow={53}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    />
                  </div>
                </div>
                <div className="stats-info">
                  <p>
                    Brian{" "}
                    <strong>
                      75%
                    </strong>
                  </p>
                  <div className="progress">
                    <div
                      className="progress-bar bg-success"
                      role="progressbar"
                      style={{ width: "75%" }}
                      aria-valuenow={75}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    />
                  </div>
                </div>
                <div className="stats-info">
                  <p>
                    Issac{" "}
                    <strong>
                      73%
                    </strong>
                  </p>
                  <div className="progress">
                    <div
                      className="progress-bar bg-danger"
                      role="progressbar"
                      style={{ width: "73%" }}
                      aria-valuenow={73}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    />
                  </div>
                </div>
                <div className="stats-info">
                  <p>
                    Lior{" "}
                    <strong>
                      47%
                    </strong>
                  </p>
                  <div className="progress">
                    <div
                      className="progress-bar bg-info"
                      role="progressbar"
                      style={{ width: "47%" }}
                      aria-valuenow={47}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    {/* //----------------------------------- */}
                    <div className="col-md-6 text-center">
              <div className="card">
                <div className="card-body">
                  <h3 className="card-title">Managerial Effectiveness</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart
                      data={linechartdata}
                      margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
                    >
                      <CartesianGrid />
                      <XAxis dataKey="y" />
                      <YAxis />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="Total Sales"
                        stroke="#ff9b44"
                        fill="#00c5fb"
                        strokeWidth={3}
                        dot={{ r: 3 }}
                        activeDot={{ r: 7 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
                    <div className="col-md-6 text-center">
              <div className="card">
                <div className="card-body">
                  <h3 className="card-title">Average Employee Satisfaction</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart
                      data={linechartdata}
                      margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
                    >
                      <CartesianGrid />
                      <XAxis dataKey="y" />
                      <YAxis />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="Total Revenue"
                        stroke="#fc6075"
                        fill="#0253cc"
                        strokeWidth={3}
                        dot={{ r: 3 }}
                        activeDot={{ r: 7 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
                       <div className="col-md-6 text-center">
              <div className="card">
                <div className="card-body">
                  <h3 className="card-title">Turnover Rate</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart
                      data={linechartdata}
                      margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
                    >
                      <CartesianGrid />
                      <XAxis dataKey="y" />
                      <YAxis />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="turnover"
                        stroke="#0253cc"
                        fill="#0253cc"
                        strokeWidth={3}
                        dot={{ r: 3 }}
                        activeDot={{ r: 7 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
    </div>
  );
};

export default RetentionStatisticsGraphs;


