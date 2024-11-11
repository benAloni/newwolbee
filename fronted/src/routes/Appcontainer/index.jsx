/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Outlet, Route, Routes, Navigate } from "react-router-dom";
import { Header, SideBar } from "../../layout";
import ChatSidebar from "../../components/Mainpages/chatSidebar.jsx";
import ComponentSidebar from "../../components/ComponentSidebar.jsx";
import EmailSidebar from "../../components/Mainpages/emailSidebar.jsx";
import SettingsSidebar from "../../components/SettingsSidebar.jsx";

import AdminDashboard from "../../views/pages/MainPages/Dashboard/AdminDashboard/adminDashboard.jsx";
import EmployeeDashboard from "../../views/pages/MainPages/Dashboard/EmployeeDashboard/index.jsx";
import Chat from "../../views/pages/MainPages/Apps/chat/index.jsx";
import VoiceCall from "../../views/pages/MainPages/Apps/calls/voiceCall/index.jsx";
import VideoCall from "../../views/pages/MainPages/Apps/calls/VideoCall/index.jsx";
import Outgoing from "../../views/pages/MainPages/Apps/calls/outgoingCall/index.jsx";
import IncomingCall from "../../views/pages/MainPages/Apps/calls/incomingCall/index.jsx";
import Calendar from "../../views/pages/MainPages/Apps/calendar/Calendar.jsx";
import Contacts from "../../views/pages/MainPages/Apps/contacts/index.jsx";
import Email from "../../views/pages/MainPages/Apps/Email/index.jsx";
import FileManager from "../../views/pages/MainPages/Apps/FileManager/index.jsx";
import Compose from "../../views/pages/MainPages/Apps/Email/compose.jsx";
import Settings from "../../views/pages/Administration/Settings/Settings.jsx";
import Localization from "../../views/pages/Administration/Settings/Localization.jsx";
import ThemeSettings from "../../views/pages/Administration/Settings/ThemeSettings.jsx";
import RolesPermissions from "../../views/pages/Administration/Settings/RolesPermissions.jsx";
import EmailSettings from "../../views/pages/Administration/Settings/EmailSettings.jsx";
import ApprovalSetting from "../../views/pages/Administration/Settings/ApprovalSetting.jsx";
import InvoiceSettings from "../../views/pages/Administration/Settings/InvoiceSettings.jsx";
import SalarySettings from "../../views/pages/Administration/Settings/SalarySettings.jsx";
import NotificationSettings from "../../views/pages/Administration/Settings/NotificationSettings.jsx";
import LeaveType from "../../views/pages/Administration/Settings/LeaveType.jsx";
import ToxboxSetting from "../../views/pages/Administration/Settings/ToxboxSetting.jsx";
import CronSetting from "../../views/pages/Administration/Settings/CronSetting.jsx";
import AllEmployees from "../../views/pages/Employees/AllEmployees.jsx";
import Holidays from "../../views/pages/Employees/Holidays.jsx";
import AdminLeave from "../../views/pages/Employees/AdminLeave.jsx";
import EmployeeLeave from "../../views/pages/Employees/EmployeeLeave.jsx";
import LeaveSettings from "../../views/pages/Employees/LeaveSetting.jsx";
import AttendenceAdmin from "../../views/pages/Employees/Attendenceadmin.jsx";
import AttendanceEmployee from "../../views/pages/Employees/AttendenceEmployee.jsx";
import Department from "../../views/pages/Employees/Department.jsx";
import Designation from "../../views/pages/Employees/Designation.jsx";
import TimeSheet from "../../views/pages/Employees/TimeSheet.jsx";
import ShiftScheduling from "../../views/pages/Employees/ShiftandSchedule.jsx";
import ShiftList from "../../views/pages/Employees/ShiftList.jsx";
import OverTime from "../../views/pages/Employees/OverTime.jsx";
import Clients from "../../views/pages/Employees/Clients.jsx";
import Project from "../../views/pages/Employees/Projects/Project.jsx";
import ClientList from "../../views/pages/Employees/ClientList.jsx";
import Tasks from "../../views/pages/Employees/Projects/Tasks.jsx";
import { SidebarProject } from "../../views/pages/Employees/Projects/SidebarProject.jsx";
import TaskBoard from "../../views/pages/Employees/Projects/TaskBoard.jsx";
import Leads from "../../views/pages/Employees/Leads.jsx";
import Ticket from "../../views/pages/Employees/Ticket.jsx";
import ClientProfile from "../../views/pages/Profile/ClientProfile.jsx";
import Profile from "../../views/pages/Profile/Profile.jsx";
import Search from "../../views/pages/Pages/Search/Search.jsx";
import Faq from "../../views/pages/Pages/Faq.jsx";
import Terms from "../../views/pages/Pages/Terms.jsx";
import PrivacyPolicy from "../../views/pages/Pages/PrivacyPolicy.jsx";
import KnowledgeBase from "../../views/pages/Administration/Knowledgebase/KnowledgeBase.jsx";
import KnowledgeBaseView from "../../views/pages/Administration/Knowledgebase/KnowledgeBaseView.jsx";
import EmployeeList from "../../views/pages/Employees/EmployeeList.jsx";
import Activities from "../../views/pages/Administration/Activities/index.jsx";
import Assets from "../../views/pages/Administration/Assets/index.jsx";
import UserDashboard from "../../views/pages/Administration/Jobs/UserJob/UserDashboard/index.jsx";
import UserAllJobs from "../../views/pages/Administration/Jobs/UserJob/UserAllJobs/index.jsx";
import SavedJobs from "../../views/pages/Administration/Jobs/UserJob/SavedJobs/index.jsx";
import AppliedJobs from "../../views/pages/Administration/Jobs/UserJob/AppliedJobs/index.js";
import Interviewing from "../../views/pages/Administration/Jobs/UserJob/Interviewing/index.jsx";
import JobAptitude from "../../views/pages/Administration/Jobs/UserJob/JobAptitude/index.jsx";
import Questions from "../../views/pages/Administration/Jobs/UserJob/Questions/index.jsx";
import UserOfferedJobs from "../../views/pages/Administration/Jobs/UserJob/UserOfferedJobs/index.jsx";
import VisitedJobs from "../../views/pages/Administration/Jobs/UserJob/VisitedJobs/index.jsx";
import ArchivedJobs from "../../views/pages/Administration/Jobs/UserJob/ArchivedJobs/index.jsx";
import JobsDashboard from "../../views/pages/Administration/Jobs/JobDashboard/index.jsx";
import ManageJobs from "../../views/pages/Administration/Jobs/ManageJobs/index.jsx";
import ManageJobResumes from "../../views/pages/Administration/Jobs/ManageResumes/index.jsx";
import ShortListCandidates from "../../views/pages/Administration/Jobs/ShortListCandidates/index.jsx";
import InterviewingQuestions from "../../views/pages/Administration/Jobs/InterviewingQuestions/index.jsx";
import OfferApprovals from "../../views/pages/Administration/Jobs/OfferApprovals/index.jsx";
import ExperienceLevel from "../../views/pages/Administration/Jobs/ExperienceLevel/index.jsx";
import CanditatesList from "../../views/pages/Administration/Jobs/CanditatesList/index.jsx";
import ScheduleTiming from "../../views/pages/Administration/Jobs/ScheduleTiming.jsx/index.jsx";
import AptitudeResults from "../../views/pages/Administration/Jobs/AptitudeResults/index.jsx";
import Users from "../../views/pages/Administration/Users/index.jsx";
import ProjectList from "../../views/pages/Employees/Projects/ProjectList.jsx";
import ProjectView from "../../views/pages/Employees/Projects/ProjectView.jsx";
import OffCanvas from "../../components/OffCanvas.jsx";

import ContactList from "../../views/pages/Crm/ContactList.jsx";
import ContactGrid from "../../views/pages/Crm/ContactGrid.jsx";
import DealsDashboard from "../../views/pages/MainPages/Dashboard/DealsDashboard/index.jsx";
import LeadsDashboard from "../../views/pages/MainPages/Dashboard/LeadsDashboard/index.jsx";
import TicketDetails from "../../views/pages/Employees/TicketDetails.jsx";
import Companies from "../../views/pages/Crm/companies.jsx";
import ContactDetails from "../../views/pages/Crm/ContactDetails.jsx";
import LeadsList from "../../views/pages/Crm/LeadsList.jsx";
import LeadsKanban from "../../views/pages/Crm/LeadsKanban.jsx";
import LeadsDetails from "../../views/pages/Crm/LeadsDetails.jsx";
import PipeLine from "../../views/pages/Crm/PipeLine.jsx";
import CompaniesGrid from "../../views/pages/Crm/CompaniesGrid.jsx";
import CompanyDetails from "../../views/pages/Crm/CompanyDetails.jsx";
import Deals from "../../views/pages/Crm/Deals.jsx";
import DealsKanban from "../../views/pages/Crm/DealsKanban.jsx";
import Analytics from "../../views/pages/Crm/Analytics.jsx";
import RecentFiles from "../../views/pages/MainPages/Apps/FileManager/recentFiles.jsx";
import EmailContent from "../../views/pages/MainPages/Apps/Email/emailContent.jsx";
import EmailView from "../../views/pages/MainPages/Apps/Email/emailView.jsx";
import DealsDetails from "../../views/pages/Crm/DealsDetails.jsx";
import CompanyEvents from "../../views/pages/Authentication/CompanyEvents.jsx";

import RetentionStatistics from "../../views/pages/MainPages/Dashboard/AdminDashboard/RetentionStatistics.jsx";
import NotificationsBirth from "../../views/pages/MainPages/Apps/notifications/mainNotifications/ShowNotifications/NotificationsBirth.jsx";

const AppContainer = () => {
  // useEffect(() => {
  //   localStorage.setItem("colorschema", "orange");
  //   localStorage.setItem("layout", "vertical");
  //   localStorage.setItem("layoutwidth", "fixed");
  //   localStorage.setItem("layoutpos", "fluid");
  //   localStorage.setItem("topbartheme", "light");
  //   localStorage.setItem("layoutSized", "lg");
  //   localStorage.setItem("layoutStyling", "default");
  //   localStorage.setItem("layoutSidebarStyle", "dark");
  // }, []);

  const routingObjects = [
    {
      id: 2,
      path: "admin-dashboard",
      element: <AdminDashboard />,
    },
    {
      id: 17,
      path: "employee-dashboard",
      element: <EmployeeDashboard />,
    },
    {
      id: 18,
      path: "activities",
      element: <Activities />,
    },
    // {
    //   id: 20,
    //   path: "profile",
    //   element: <Profile />,
    // },
    {
      id: 21,
      path: "events",
      element: <Calendar />,
    },
    {
      id: 22,
      path: "notifications",
      element: <Contacts />,
    },

    {
      id: 23,
      path: "file-manager",
      element: <FileManager />,
    },
    {
      id: 34,
      path: "employees",
      element: <AllEmployees />,
    },
    {
      id: 35,
      path: "holidays",
      element: <Holidays />,
    },
    {
      id: 36,
      path: "adminleaves",
      element: <AdminLeave />,
    },
    {
      id: 37,
      path: "leaves-employee",
      element: <EmployeeLeave />,
    },
    {
      id: 38,
      path: "leave-settings",
      element: <LeaveSettings />,
    },
    {
      id: 39,
      path: "adminattendance",
      element: <AttendenceAdmin />,
    },
    {
      id: 40,
      path: "attendance-employee",
      element: <AttendanceEmployee />,
    },
    {
      id: 41,
      path: "departments",
      element: <Department />,
    },
    {
      id: 42,
      path: "designations",
      element: <Designation />,
    },
    {
      id: 43,
      path: "timesheet",
      element: <TimeSheet />,
    },
    {
      id: 43,
      path: "shift-scheduling",
      element: <ShiftScheduling />,
    },
    {
      id: 44,
      path: "shift-list",
      element: <ShiftList />,
    },
    {
      id: 45,
      path: "overtime",
      element: <OverTime />,
    },
    {
      id: 46,
      path: "clients",
      element: <Clients />,
    },
    {
      id: 47,
      path: "projects",
      element: <Project />,
    },
    {
      id: 48,
      path: "clients-list",
      element: <ClientList />,
    },
    {
      id: 49,
      path: "task-board",
      element: <TaskBoard />,
    },
    {
      id: 50,
      path: "leads",
      element: <Leads />,
    },
    {
      id: 51,
      path: "tickets",
      element: <Ticket />,
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
      id: 57,
      path: "search",
      element: <Search />,
    },
    {
      id: 58,
      path: "faq",
      element: <Faq />,
    },
    {
      id: 60,
      path: "terms",
      element: <Terms />,
    },
    {
      id: 61,
      path: "privacy-policy",
      element: <PrivacyPolicy />,
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
      id: 89,
      path: "project-list",
      element: <ProjectList />,
    },
    {
      id: 90,
      path: "project-view",
      element: <ProjectView />,
    },


    {
      id: 120,
      path: "contact-list",
      element: <ContactList />,
    },
    {
      id: 121,
      path: "contact-grid",
      element: <ContactGrid />,
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
      id: 124,
      path: "ticket-details",
      element: <TicketDetails />,
    },
    {
      id: 125,
      path: "companies",
      element: <Companies />,
    },
    {
      id: 126,
      path: "contact-details",
      element: <ContactDetails />,
    },
    {
      id: 126,
      path: "leads-list",
      element: <LeadsList />,
    },
    {
      id: 127,
      path: "leads-kanban",
      element: <LeadsKanban />,
    },
    {
      id: 128,
      path: "leads-details",
      element: <LeadsDetails />,
    },
    {
      id: 128,
      path: "pipeline",
      element: <PipeLine />,
    },
    {
      id: 129,
      path: "Companies-grid",
      element: <CompaniesGrid />,
    },
    {
      id: 130,
      path: "company-details",
      element: <CompanyDetails />,
    },
    {
      id: 131,
      path: "deals",
      element: <Deals />,
    },
    {
      id: 132,
      path: "deals-kanban",
      element: <DealsKanban />,
    },
    {
      id: 130,
      path: "analytics",
      element: <Analytics />,
    },
    {
      id: 131,
      path: "deals-details",
      element: <DealsDetails />,
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

  const ChatRoutingeObjects = [
    {
      id: 1,
      path: "chat",
      element: <Chat />,
    },
    {
      id: 2,
      path: "voice-call",
      element: <VoiceCall />,
    },
    {
      id: 3,
      path: "video-call",
      element: <VideoCall />,
    },
    {
      id: 4,
      path: "outgoing-call",
      element: <Outgoing />,
    },
    {
      id: 5,
      path: "incoming-call",
      element: <IncomingCall />,
    },
  ];
  const EmailRoutingeObjects = [
    {
      id: 1,
      path: "inbox",
      element: <Email />,
    },
    {
      id: 2,
      path: "compose",
      element: <Compose />,
    },
    {
      id: 3,
      path: "mail-view",
      element: <EmailView />,
    },
  ];
  const SettingsRoutingeObjects = [
    {
      id: 1,
      path: "company-settings",
      element: <Settings />,
    },
    {
      id: 2,
      path: "localization",
      element: <Localization />,
    },
    {
      id: 3,
      path: "theme-settings",
      element: <ThemeSettings />,
    },
    {
      id: 4,
      path: "roles-permissions",
      element: <RolesPermissions />,
    },
    {
      id: 5,
      path: "email-settings",
      element: <EmailSettings />,
    },
    {
      id: 7,
      path: "approval-setting",
      element: <ApprovalSetting />,
    },
    {
      id: 8,
      path: "invoice-settings",
      element: <InvoiceSettings />,
    },
    {
      id: 9,
      path: "salary-settings",
      element: <SalarySettings />,
    },
    {
      id: 10,
      path: "notifications-settings",
      element: <NotificationSettings />,
    },
    {
      id: 11,
      path: "leave-type",
      element: <LeaveType />,
    },
    {
      id: 14,
      path: "toxbox-setting",
      element: <ToxboxSetting />,
    },
    {
      id: 15,
      path: "cron-setting",
      element: <CronSetting />,
    },
  ];
  const ProjectRoutingeObjects = [
    {
      id: 1,
      path: "tasks",
      element: <Tasks />,
    },
  ];

  const AdministrationRoutingeObjects = [
    {
      id: 1,
      path: "assets",
      element: <Assets />,
    },
    {
      id: 2,
      path: "user-dashboard",
      element: <UserDashboard />,
    },
    {
      id: 3,
      path: "user-all-jobs",
      element: <UserAllJobs />,
    },
    {
      id: 4,
      path: "saved-jobs",
      element: <SavedJobs />,
    },
    {
      id: 5,
      path: "applied-jobs",
      element: <AppliedJobs />,
    },

    {
      id: 6,
      path: "interviewing",
      element: <Interviewing />,
    },
    {
      id: 7,
      path: "job-aptitude",
      element: <JobAptitude />,
    },
    {
      id: 8,
      path: "questions",
      element: <Questions />,
    },
    {
      id: 9,
      path: "offered-jobs",
      element: <UserOfferedJobs />,
    },
    {
      id: 10,
      path: "visited-jobs",
      element: <VisitedJobs />,
    },
    {
      id: 11,
      path: "archived-jobs",
      element: <ArchivedJobs />,
    },
    {
      id: 12,
      path: "jobs-dashboard",
      element: <JobsDashboard />,
    },
    {
      id: 13,
      path: "jobs",
      element: <ManageJobs />,
    },
    {
      id: 14,
      path: "manage-resumes",
      element: <ManageJobResumes />,
    },
    {
      id: 15,
      path: "shortlist-candidates",
      element: <ShortListCandidates />,
    },
    {
      id: 16,
      path: "interview-questions",
      element: <InterviewingQuestions />,
    },
    {
      id: 17,
      path: "offer_approvals",
      element: <OfferApprovals />,
    },
    {
      id: 18,
      path: "experiance-level",
      element: <ExperienceLevel />,
    },
    {
      id: 19,
      path: "candidates",
      element: <CanditatesList />,
    },
    {
      id: 21,
      path: "schedule-timing",
      element: <ScheduleTiming />,
    },
    {
      id: 22,
      path: "apptitude-result",
      element: <AptitudeResults />,
    },
    {
      id: 23,
      path: "users",
      element: <Users />,
    },
  ];

  const SidebarLayout = () => (
    <>
      <Header />
      <SideBar />
      {/* <OffCanvas /> */}
      <Outlet />
    </>
  );
  const AuthendicationLayout = () => <div></div>;
  const ChatSidebarLayout = () => (
    <>
      <Header />
      <ChatSidebar />
      <Outlet />
    </>
  );
  const ComponentSidebarLayout = () => (
    <>
      <Header />
      <ComponentSidebar />
      <Outlet />
    </>
  );
  const EmailSidebarLayout = () => (
    <>
      <Header />
      <EmailSidebar />
      <Outlet />
    </>
  );
  const SettingsSidebarLayout = () => (
    <>
      <Header />
      <SettingsSidebar />
      <Outlet />
    </>
  );
  const ProjectSidebarLayout = () => (
    <>
      <Header />
      <SidebarProject />
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
          <Route
            path="/company-events"
            element={<CompanyEvents></CompanyEvents>}
          />

          <Route path={"/*"} element={<SidebarLayout />}>
            {routingObjects.map((item) => (
              <Route key={item.id} path={item.path} element={item.element} />
            ))}
          </Route>

          <Route path={"/*"} element={<ChatSidebarLayout />}>
            {ChatRoutingeObjects.map((item) => (
              <Route key={item.id} path={item.path} element={item.element} />
            ))}
          </Route>
          <Route path={"/*"} element={<EmailSidebarLayout />}>
            {EmailRoutingeObjects.map((item) => (
              <Route key={item.id} path={item.path} element={item.element} />
            ))}
          </Route>
          <Route path={"/*"} element={<SettingsSidebarLayout />}>
            {SettingsRoutingeObjects.map((item) => (
              <Route key={item.id} path={item.path} element={item.element} />
            ))}
          </Route>
          <Route path={"/*"} element={<ProjectSidebarLayout />}>
            {ProjectRoutingeObjects.map((item) => (
              <Route key={item.id} path={item.path} element={item.element} />
            ))}
          </Route>

          <Route path={"/*"} element={<SidebarLayout />}>
            {AdministrationRoutingeObjects.map((item) => (
              <Route key={item.id} path={item.path} element={item.element} />
            ))}
          </Route>
          <Route path={"/*"} element={<SidebarLayout />}>
            <Route path="*" element={<Navigate to="/" />} />
          </Route>
        </Routes>
      </div>
    </>
  );
};

export default AppContainer;
