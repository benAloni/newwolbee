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
  { y: "Jan", "Sick Leave": 4, "Vacation Days": 5, "Average Arrivel on Time": 20, "Number 2": 15 },
  { y: "Feb", "Sick Leave": 2, "Vacation Days": 2, "Average Arrivel on Time": 24, "Number 2": 13 },
  { y: "March", "Sick Leave": 0, "Vacation Days": 3, "Average Arrivel on Time": 22, "Number 2": 16 },
  { y: "April", "Sick Leave": 0, "Vacation Days": 0, "Average Arrivel on Time": 21, "Number 2": 14 },
  { y: "May", "Sick Leave": 0, "Vacation Days": 1, "Average Arrivel on Time": 20, "Number 2": 16 },
  { y: "June", "Sick Leave": 0, "Vacation Days": 6, "Average Arrivel on Time": 21, "Number 2": 18 },
  { y: "July", "Sick Leave": 0, "Vacation Days": 0, "Average Arrivel on Time": 26, "Number 2": 19 },
];


const JohnStatistics = () => {
  return (
    <div>
           <div className="">
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
                      <YAxis domain={[0, 'dataMax + 5']} allowDataOverflow={true} />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="Sick Leave"
                        stroke="#0253cc"
                        fill="#0253cc"
                        strokeWidth={3}
                        dot={{ r: 3 }}
                        activeDot={{ r: 7 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="Vacation Days"
                        stroke="#ff9b44"
                        fill="#0253cc"
                        strokeWidth={3}
                        dot={{ r: 3 }}
                        activeDot={{ r: 7 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="Average Arrivel on Time"
                        stroke="#DC00FF"
                        fill="#0253cc"
                        strokeWidth={3}
                        dot={{ r: 3 }}
                        activeDot={{ r: 7 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="Number 2"
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
    </div>
  );
};

export default JohnStatistics;

