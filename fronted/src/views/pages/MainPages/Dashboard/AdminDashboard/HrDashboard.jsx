import React from "react";
import HrStatistics from "./HrStatistics";
import Charts from "./charts";

export default function HrDashboard() {
  return (
    <div className="main-wrapper">
      <div className="page-wrapper">
        <div className="content container-fluid">
          <HrStatistics />
          <Charts/>
        </div>
      </div>
    </div>
  );
}
