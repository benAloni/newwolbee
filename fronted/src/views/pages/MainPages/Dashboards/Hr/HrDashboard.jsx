import React from "react";
import HrStatistics from "../Hr/HrStatistics";


export default function HrDashboard() {
  return (
    <div className="main-wrapper">
      <div className="page-wrapper">
        <div className="content container-fluid">
          <HrStatistics />
          {/* <Statistics /> */}
        </div>
      </div>
    </div>
  );
}
