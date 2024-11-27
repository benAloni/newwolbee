import React from "react";
// import Header from "../../../../layout/Header";
import Sidebar from "../../../../../layout/SideBar";
import HrStatistics from "./HrStatistics";

export default function HrDashboard() {
  return (
    <div className="content container-fluid">
      <Sidebar />
      <HrStatistics />
    </div>
  );
}
