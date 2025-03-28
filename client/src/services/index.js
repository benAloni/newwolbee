import { fetchTeams } from "./api/teams";
import {
  fetchEmployees,
  fetchEmployee,
  addEmployee,
  deleteEmployee,
  updateEmployeeVacation,
  updateEmployeeSickLeave,
  addFamilyMember,
  addSonEvents,
  fetchEmployeeFamilyMembers,
  fetchEmployeeEmergencyContacts,
  updateEmployeeEventMarriageEvent
} from "./api/employees";
import { fetchUserProfilePic,fetchEmployeesProfilePics } from "./api/profile";
import { fetchEvents } from "./api/calendarEvents";
import { fetchNotifications, fetchEmployeesNotifications, updateEmployeeNotification } from "./api/notifications";
import {
  fetchCompanyEvents,
  addNewCompanyEvent,
  updateCompanyEvent,
  deleteCompanyEvent,
} from "./api/companyEvents";
import { fetchHolidaysDetailsOptions, fetchInternationalFoodDays } from "./api/holidaysDetails";
import { useGetTeamsQuery } from "./queries/teamsQuery.js";
export {
  fetchTeams,
  fetchEmployees,
  fetchEmployee,
  addEmployee,
  updateEmployeeVacation,
  updateEmployeeSickLeave,
  addFamilyMember,
  addSonEvents,
  fetchUserProfilePic,
  fetchEvents,
  fetchNotifications,
  deleteEmployee,
  fetchCompanyEvents,
  addNewCompanyEvent,
  updateCompanyEvent,
  deleteCompanyEvent,
  fetchHolidaysDetailsOptions,
  fetchEmployeesNotifications,
  updateEmployeeNotification,
  fetchEmployeesProfilePics,
  fetchEmployeeFamilyMembers,
  fetchEmployeeEmergencyContacts,
  fetchInternationalFoodDays,
  useGetTeamsQuery, 
  updateEmployeeEventMarriageEvent,
};
