import React from "react";
import { Header, SideBar } from "../../../../../layout";
import HrStatistics from "./HrStatistics";

export default function HrDashboard() {
  return (
    <div className="main-wrapper">
      <div className="page-wrapper">
        <div className="content container-fluid">
          <Header />
          <SideBar />
          <HrStatistics />
        </div>
      </div>
    </div>
  );
}
