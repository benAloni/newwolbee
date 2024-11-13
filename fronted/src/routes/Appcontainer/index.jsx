/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Outlet, Route, Routes, Navigate } from "react-router-dom";
import { Header, SideBar } from "../../layout";
import EmployeeDashboard from "../../views/pages/MainPages/Dashboard/EmployeeDashboard/index.jsx";
import Calendar from "../../views/pages/MainPages/Apps/calendar/Calendar.jsx";
import AllEmployees from "../../views/pages/Employees/AllEmployees.jsx";
import Department from "../../views/pages/Employees/Department.jsx";
import Project from "../../views/pages/Employees/Projects/Project.jsx";
import TaskBoard from "../../views/pages/Employees/Projects/TaskBoard.jsx";
import ClientProfile from "../../views/pages/Profile/ClientProfile.jsx";
import Profile from "../../views/pages/Profile/Profile.jsx";
import KnowledgeBase from "../../views/pages/Administration/Knowledgebase/KnowledgeBase.jsx";
import KnowledgeBaseView from "../../views/pages/Administration/Knowledgebase/KnowledgeBaseView.jsx";
import EmployeeList from "../../views/pages/Employees/EmployeeList.jsx";
import Assets from "../../views/pages/Administration/Assets/index.jsx";
import Users from "../../views/pages/Administration/Users/index.jsx";
import DealsDashboard from "../../views/pages/MainPages/Dashboard/DealsDashboard/index.jsx";
import LeadsDashboard from "../../views/pages/MainPages/Dashboard/LeadsDashboard/index.jsx";
import CompanyEvents from "../../views/pages/Authentication/CompanyEvents.jsx";
import RetentionStatistics from "../../views/pages/MainPages/Dashboard/AdminDashboard/RetentionStatistics.jsx";
import NotificationsBirth from "../../views/pages/MainPages/Apps/notifications/mainNotifications/ShowNotifications/NotificationsBirth.jsx";
import NotificationsPage from "../../views/pages/MainPages/Apps/contacts/NotificationsPage.jsx";
import HrDashboard from "../../views/pages/MainPages/Dashboard/AdminDashboard/HrDashboard.jsx";
import MyDashboard from "../../views/pages/MainPages/Dashboard/AdminDashboard/MyDashboard.jsx";
import UserSettings from "../../views/pages/Authentication/UserSettings.jsx";
import AdminWallet from "../../views/pages/Administration/Wallet/AdminWallet.jsx";

const AppContainer = () => {
 

  const routingObjects = [
    {
      id: 1,
      path: "hrDashboard",
      element: <HrDashboard />,
    },
    {
      id: 2,
      path: "myDashboard",
      element: <MyDashboard />,
    },
    {
      id: 17,
      path: "employee-dashboard",
      element: <EmployeeDashboard />,
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
      path: "task-board",
      element: <TaskBoard />,
    },
    
    {
      id: 52,
      path: "client-profile",
      element: <ClientProfile />,
    },
    {
      id: 53,
      path: "profile/:employeeId",
      element: <Profile />,
    },
    {
      id: 63,
      path: "knowledgebase",
      element: <KnowledgeBase />,
    },
    {
      id: 64,
      path: "knowledgebase-view",
      element: <KnowledgeBaseView />,
    },
    {
      id: 64,
      path: "employees-list",
      element: <EmployeeList />,
    },
   {
      id: 122,
      path: "deals-dashboard",
      element: <DealsDashboard />,
    },
    {
      id: 123,
      path: "leads-dashboard",
      element: <LeadsDashboard />,
    },
    {
      id: 132,
      path: "RetentionStatistics",
      element: <RetentionStatistics />,
    },
    {
      id: 133,
      path: "NotificationsBirth/:userId",
      element: <NotificationsBirth />,
    },
  ];

  const AdministrationRoutingObjects = [
    {
      id: 1,
      path: "assets",
      element: <Assets />,
    }, 
    {
      id: 2,
      path: "users",
      element: <Users />,
    },
  ];

  const Layouts = () => (
    <>
      <Header />
      <SideBar />
      <Outlet />
    </>
  );
  
  const mobileResponsive = (event) => {
    const excludedHeader = document.querySelector(".header");
    const excludedSidebar = document.querySelector(".sidebar");

    if (
      !excludedHeader.contains(event.target) &&
      !excludedSidebar.contains(event.target)
    ) {
      document.body.classList.remove("slide-nav");
    }
  };

  return (
    <>
      <div className="main-wrapper" onClick={mobileResponsive}>
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
