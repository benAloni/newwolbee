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

const barchartdata = [
  { y: "2017", "Budget": 100, "Usage": 90 },
  { y: "2018", "Budget": 75, "Usage": 65 },
  { y: "2019", "Budget": 50, "Usage": 40 },
  { y: "2020", "Budget": 75, "Usage": 65 },
  { y: "2021", "Budget": 50, "Usage": 40 },
  { y: "2022", "Budget": 75, "Usage": 65 },
  { y: "2023", "Budget": 100, "Usage": 90 },
];
const linechartdata = [
  { y: "Jan", "Budget": 800, "Total Revenue": 90 },
  { y: "Feb", "Budget": 1200, "Total Revenue": 65 },
  { y: "March", "Budget": 1100, "Total Revenue": 40 },
  { y: "April", "Budget": 2000, "Total Revenue": 65 },
  { y: "May", "Budget": 1200, "Total Revenue": 40 },
  { y: "June", "Budget": 900, "Total Revenue": 65 },
  { y: "July", "Budget": 1500, "Total Revenue": 50 },
];

const Charts = () => {
  return (
    <div>
      <div className="row">
        <div className="col-md-12">
          <div className="row">
            <div className="col-md-6 text-center">
              <div className="card">
                <div className="card-body">
                  <h3 className="card-title">Annual Budget Usage Analysis</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                      data={barchartdata}
                      margin={{
                        top: 5,
                        right: 5,
                        left: 5,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid />
                      <XAxis dataKey="y" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="Budget" fill="#ff9b44" />
                      <Bar dataKey="Usage" fill="#fc6075" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
            <div className="col-md-6 text-center">
              <div className="card">
                <div className="card-body">
                  <h3 className="card-title">Monthly Budget Allocation</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart
                      data={linechartdata}
                      margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
                    >
                      <CartesianGrid />
                      <XAxis dataKey="y" />
                      <YAxis domain={[0, 'dataMax + 500']} allowDataOverflow={true} />
                      <Tooltip />
                      {/* <Legend /> */}
                      <Line
                        type="monotone"
                        dataKey="Budget"
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Charts;
