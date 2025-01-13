import React from "react";
import Sidebar from "../../../../../layout/SideBar";
import AdminStatistics from "./AdminStatistics";

export default function AdminDashboard() {
  return (
    <div className="content container-fluid">
      <Sidebar />
      <AdminStatistics />
    </div>
  );
}
