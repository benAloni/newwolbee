/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Outlet, Route, Routes, Navigate } from "react-router-dom";
import {SideBar, Header} from "../../layout";
import Calendar from "../../views/pages/MainPages/Apps/calendar/Calendar.jsx";
import AllEmployees from "../../views/pages/Employees/AllEmployees.jsx";
import Department from "../../views/pages/Employees/Department.jsx";
import Project from "../../views/pages/Employees/Projects/Project.jsx";

import ClientProfile from "../../views/pages/Profile/ClientProfile.jsx";
import EmployeeProfile from "../../views/pages/Profile/EmployeeProfile.jsx";
import Assets from "../../views/pages/Administration/Assets/index.jsx";
import CompanyEvents from "../../views/pages/Authentication/CompanyEvents.jsx";
import RetentionStatistics from "../../views/pages/MainPages/Dashboards/Admin/RetentionStatistics.jsx";
import BirthdayPresentPage from "../../views/pages/MainPages/Apps/notifications/mainNotifications/ShowNotifications/BirthdayPresentPage.jsx";
import NotificationsPage from "../../views/pages/MainPages/Apps/contacts/NotificationsPage.jsx";
import AdminDashboard from "../../views/pages/MainPages/Dashboards/Admin/AdminDashboard.jsx";
import HrDashboard from "../../views/pages/MainPages/Dashboards/Hr/HrDashboard.jsx";
import UserSettings from "../../views/pages/Authentication/UserSettings.jsx";
import AdminWallet from "../../views/pages/Administration/Wallet/AdminWallet.jsx";
import UpComingEvents from "../../views/pages/Employees/Projects/mainUpcomingEvents/UpComingEvents.jsx";
const AppContainer = () => {
 

  const routingObjects = [
    {
      id: 1,
      path: "manager-dashboard",
      element: <AdminDashboard />,
    },
    {
      id: 2,
      path: "hr-dashboard",
      element: <HrDashboard />,
    },  
    {
      id: 19,
      path: "wallet",
      element: <AdminWallet />,
    },
    // {
    //   id: 20,
    //   path: "profile",
    //   element: <Profile />,
    // },
    {
      id: 21,
      path: "calendar",
      element: <Calendar />,
    },
    {
      id: 22,
      path: "notifications",
      element: <NotificationsPage />,
    },
    {
      id: 23,
      path: "settings",
      element: <UserSettings />,
    },
    {
      id: 24,
      path: "company-events",
      element: <CompanyEvents />,
    },
    {
      id: 34,
      path: "employees",
      element: <AllEmployees />,
    },
       
    {
      id: 41,
      path: "departments",
      element: <Department />,
    },  
    {
      id: 47,
      path: "projects",
      element: <Project />,
    },

    {
      id: 49,
      path: "upcoming-events",
      element: <UpComingEvents />,
    },
    
    {
      id: 52,
      path: "client-profile",
      element: <ClientProfile />,
    },
    {
      id: 53,
      path: "profile/:employeeId",
      element: <EmployeeProfile />,
    },
  
    {
      id: 132,
      path: "retention-statistics",
      element: <RetentionStatistics />,
    },
    {
      id: 133,
      path: "get-a-birthday-present/:employeeId",
      element: <BirthdayPresentPage />,
    },
  ];

  const AdministrationRoutingObjects = [
    {
      id: 1,
      path: "assets",
      element: <Assets />,
    },     
  ];

  const Layouts = () => (
    <>
      <Header />
      <SideBar />
      <Outlet />
    </>
  );
  
  return (
    <>
      <div className="main-wrapper" >
        <Routes>
          <Route path={"/*"} element={<Layouts />}>
            {routingObjects.map((item) => (
              <Route key={item.id} path={item.path} element={item.element} />
            ))}
          </Route>
          <Route path={"/*"} element={<Layouts />}>
            {AdministrationRoutingObjects.map((item) => (
              <Route key={item.id} path={item.path} element={item.element} />
            ))}
          </Route>
          <Route path={"/*"} element={<Layouts />}>
            <Route path="*" element={<Navigate to="/" />} />
          </Route>
        </Routes>
      </div>
    </>
  );
};

export default AppContainer;
