import React from "react";
import {
  Bar,
  ComposedChart,
  CartesianGrid,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  {
    y: "Jan",
    Total: 50,
    "Personalized Gift": 0,
    "Development Plan": 2,
    "Team Building": 0,
    "1:1 Conversations": 5,
    "Planned Interactions": 0,
    "Professional Feedback": 5,
  },
  {
    y: "Feb",
    Total: 60,
    "Personalized Gift": 3,
    "Development Plan": 4,
    "Team Building": 1,
    "1:1 Conversations": 6,
    "Planned Interactions": 12,
    "Professional Feedback": 4,
  },
  {
    y: "March",
    Total: 67,
    "Personalized Gift": 5,
    "Development Plan": 5,
    "Team Building": 2,
    "1:1 Conversations": 7,
    "Planned Interactions": 15,
    "Professional Feedback": 6,
  },
  {
    y: "April",
    Total: 69,
    "Personalized Gift": 3,
    "Development Plan": 5,
    "Team Building": 2,
    "1:1 Conversations": 6,
    "Planned Interactions": 16,
    "Professional Feedback": 5,
  },
  {
    y: "May",
    Total: 70,
    "Personalized Gift": 7,
    "Development Plan": 6,
    "Team Building": 3,
    "1:1 Conversations": 8,
    "Planned Interactions": 18,
    "Professional Feedback": 3,
  },
  {
    y: "June",
    Total: 72,
    "Personalized Gift": 6,
    "Development Plan": 4,
    "Team Building": 2,
    "1:1 Conversations": 7,
    "Planned Interactions": 20,
    "Professional Feedback": 5,
  },
  {
    y: "July",
    Total: 73,
    "Personalized Gift": 5,
    "Development Plan": 5,
    "Team Building": 1,
    "1:1 Conversations": 8,
    "Planned Interactions": 21,
    "Professional Feedback": 6,
  },
];

const Lisa = ({lisa}) => {
  return (
    <div>
        <div className="d-flex mb-3 justify-content-center">
      <img
          className="card-img-left "
          src = {lisa}
          style={{ height: '80px', width: '80px', borderRadius :'50%'}}
          />
      <h3 className="card-title text-center col">Managerial Effectiveness</h3>
          </div>
      <ResponsiveContainer width={800} height={500}>
        <ComposedChart
          data={data}
          margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="y" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Personalized Gift" barSize={20} fill="#413ea0" />
          <Bar dataKey="Development Plan" barSize={20} fill="#ff7300" />
          <Bar dataKey="Team Building" barSize={20} fill="#BDBDBD" />
          <Bar dataKey="1:1 Conversations" barSize={20} fill="#FFCC27" />
          <Bar dataKey="Planned Interactions" barSize={20} fill="#27DBFF" />
          <Bar dataKey="Professional Feedback" barSize={20} fill="#14BD00" />
          <Line type="monotone" strokeWidth={8} dataKey="Total" stroke="#ff7300" />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Lisa;
