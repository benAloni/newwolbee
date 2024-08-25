import React from "react";
import Header from "../../../../layout/Header";
import Sidebar from "../../../../layout/Sidebar";
import Breadcrumbs from "../../../../../components/Breadcrumbs";
import Statistics from "./statistics";
import MyStatistics from "./MyStatistics";


export default function MyDashboard() {
  return (
    <div className="main-wrapper">
      <div className="page-wrapper">
        <div className="content container-fluid">
          <Header />
          <Sidebar />
          <MyStatistics />
          {/* <Statistics /> */}
        </div>
      </div>
    </div>
  );
}
