import EmployeeNotificationsModel from "../models/EmployeeNotificationsModel.js";
import EmployeeModel from "../models/EmployeesModel.js";

const checkEmployeesEvents = async (req, res) => {
  const normalizeDate = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  };

  const today = normalizeDate(new Date());
  //-----tomorrow----------------------------------
  const tomorrowStart = new Date(today);
  tomorrowStart.setDate(today.getDate() + 1);
  const tomorrowEnd = new Date(today);
  tomorrowEnd.setDate(today.getDate() + 2);
  //-----next week----------------------------------
  const nextWeekStart = new Date(today);
  nextWeekStart.setDate(today.getDate() + 7);
  const nextWeekEnd = new Date(today);
  nextWeekEnd.setDate(today.getDate() + 14);
  //-----next two weeks-----------------------------
  const nextTwoWeeksStart = new Date(today);
  nextTwoWeeksStart.setDate(today.getDate() + 14);
  const nextTwoWeeksEnd = new Date(today);
  nextTwoWeeksEnd.setDate(today.getDate() + 28);
  //-----next month---------------------------------
  const nextMonthStart = new Date(today);
  nextMonthStart.setDate(today.getDate() + 30);
  const nextMonthEnd = new Date(today);
  nextMonthEnd.setDate(today.getDate() + 60);
  //------------------------------------------------

  try {
    const employeeWithEventTomorrow = await EmployeeModel.find({
        vacation: {
            $elemMatch: {
              startDate: {
                $gte: tomorrowStart,
                $lt: tomorrowEnd,
              },
            },
          },
    });
    console.log(employeeWithEventTomorrow);

    const employeeWithEventNextWeek = await EmployeeModel.find({
      vacation: {
        $elemMatch: {
          startDate: {
            $gte: nextWeekStart,
            $lt: nextWeekEnd,
          },
        },
      },
    });       
    const employeeWithEventNextTwoWeeks = await EmployeeModel.find({
      vacation: {
        $elemMatch: {
          startDate: {
            $gte: nextTwoWeeksStart,
            $lt: nextTwoWeeksEnd,
          },
        },
      },
    });
    const employeeWithEventNextMonth = await EmployeeModel.find({
      vacation: {
        $elemMatch: {
          startDate: {
            $gte: nextMonthStart,
            $lt: nextMonthEnd,
          },
        },
      },
    });

    let employeesEventsNotifications = [];

    if (employeeWithEventNextMonth.length > 0) {
      for (const employee of employeeWithEventNextMonth) {
        for (const vacation of employee.vacation) {
          const alreadyANotification = await EmployeeNotificationsModel.findOne(
            {
              "eventDetails.type": "vacation",
              "eventDetails.dateOfTheEvent": vacation.startDate,
              "eventDetails.employeeId": employee.employeeId,
            }
          );
          if (!alreadyANotification) {
            const newNotification = new EmployeeNotificationsModel({
              title: `${employee.fullName} is off to ${
                employee.gender === "female" ? "her" : "his"
              } ${
                vacation.purposeOfTrip === "pleasure"
                  ? "trip"
                  : vacation.purposeOfTrip
              } to ${
                vacation.destination
              } next month.lets make it a real vacation for ${
                employee.gender === "female" ? "her" : "him"
              }!`,
              eventDetails: {
                type: "vacation",
                dateOfTheEvent: vacation.startDate,
                employeeId: employee.employeeId,
              },
              notificationCreatedAt: today,
              notificationDueDate: nextMonthStart,
              hasBeenDismissed: false,
              hasBeenHandled: false,
              priority: "Low",
              className: "bg-blue",
              uid: employee.uid,
            });
            employeesEventsNotifications = [
              ...employeesEventsNotifications,
              newNotification,
            ];
          }
        }
      }
    }

    if (employeeWithEventNextTwoWeeks.length > 0) {
      for (const employee of employeeWithEventNextTwoWeeks) {
        for (const vacation of employee.vacation) {
          const alreadyANotification = await EmployeeNotificationsModel.findOne(
            {
              "eventDetails.type": "vacation",
              "eventDetails.dateOfTheEvent": vacation.startDate,
              "eventDetails.employeeId": employee.employeeId,
            }
          );
          if (!alreadyANotification) {
            const newNotification = new EmployeeNotificationsModel({
              title: `${employee.fullName} is off to ${
                employee.gender === "female" ? "her" : "his"
              } ${
                vacation.purposeOfTrip === "pleasure"
                  ? "trip"
                  : vacation.purposeOfTrip
              } to ${
                vacation.destination
              } in two weeks from now.lets make it a real vacation for ${
                employee.gender === "female" ? "her" : "him"
              }!`,
              eventDetails: {
                type: "vacation",
                dateOfTheEvent: vacation.startDate,
                employeeId: employee.employeeId,
              },
              notificationCreatedAt: today,
              notificationDueDate: nextTwoWeeksStart,
              hasBeenDismissed: false,
              hasBeenHandled: false,
              priority: "Medium",
              className: "bg-blue",
              uid: employee.uid,
            });
            employeesEventsNotifications = [
              ...employeesEventsNotifications,
              newNotification,
            ];
          } else {
            await EmployeeNotificationsModel.findOneAndUpdate(
              {
                "eventDetails.type": "vacation",
                "eventDetails.dateOfTheEvent": vacation.startDate,
                "eventDetails.employeeId": employee.employeeId,
              },
              {
                $set: {
                  title: `${employee.fullName} is off to ${
                    employee.gender === "female" ? "her" : "his"
                  } ${
                    vacation.purposeOfTrip === "pleasure"
                      ? "trip"
                      : vacation.purposeOfTrip
                  } to ${
                    vacation.destination
                  } in two weeks from now.lets make it a real vacation for ${
                    employee.gender === "female" ? "her" : "him"
                  }!`,
                  notificationCreatedAt: today,
                  notificationDueDate: nextTwoWeeksStart,
                  priority: "Medium",
                },
              }
            );
          }
        }
      }
    }
    if (employeeWithEventNextWeek.length > 0) {
      for (const employee of employeeWithEventNextWeek) {
        for (const vacation of employee.vacation) {
            const vacationIsNextWeekOnly = (vacation.startDate >= nextWeekStart && vacation.startDate < nextWeekEnd)
          const alreadyANotification = await EmployeeNotificationsModel.findOne(
            {
              "eventDetails.type": "vacation",
              "eventDetails.dateOfTheEvent": nextWeekStart,
              "eventDetails.employeeId": employee.employeeId,
            }
          );
          if (!alreadyANotification && vacationIsNextWeekOnly) {
            const newNotification = new EmployeeNotificationsModel({
              title: `${employee.fullName} is off to ${
                employee.gender === "female" ? "her" : "his"
              } ${
                vacation.purposeOfTrip === "pleasure"
                  ? "trip"
                  : vacation.purposeOfTrip
              } to ${
                vacation.destination
              } next week. lets make it a real vacation for ${
                employee.gender === "female" ? "her" : "him"
              }!`,
              eventDetails: {
                type: "vacation",
                dateOfTheEvent: vacation.startDate,
                employeeId: employee.employeeId,
              },
              notificationCreatedAt: today,
              notificationDueDate: nextWeekStart,
              hasBeenDismissed: false,
              hasBeenHandled: false,
              priority: "Medium",
              className: "bg-blue",
              uid: employee.uid,
            });
            employeesEventsNotifications = [
              ...employeesEventsNotifications,
              newNotification,
            ];
          } else {
            await EmployeeNotificationsModel.findOneAndUpdate(
              {
                "eventDetails.type": "vacation",
                "eventDetails.dateOfTheEvent": nextWeekStart,
                "eventDetails.employeeId": employee.employeeId,
              },
              {
                $set: {
                  title: `${employee.fullName} is off to ${
                    employee.gender === "female" ? "her" : "his"
                  } ${
                    vacation.purposeOfTrip === "pleasure"
                      ? "trip"
                      : vacation.purposeOfTrip
                  } to ${
                    vacation.destination
                  } next week. lets make it a real vacation for ${
                    employee.gender === "female" ? "her" : "him"
                  }!`,
                  notificationCreatedAt: today,
                  notificationDueDate: nextWeekStart,
                },
              }
            );
          }
        }
      }
    }
    if (employeeWithEventTomorrow.length > 0) {
      for (const employee of employeeWithEventTomorrow) {
        for (const vacation of employee.vacation) {
          const alreadyANotification = await EmployeeNotificationsModel.findOne(
            {
              "eventDetails.type": "vacation",
              "eventDetails.dateOfTheEvent": tomorrowStart,
              "eventDetails.employeeId": employee.employeeId,
            }
          );
          if (!alreadyANotification) {
            const newNotification = new EmployeeNotificationsModel({
              title: `${employee.fullName} is off to ${
                employee.gender === "female" ? "her" : "his"
              } ${vacation.purposeOfTrip === "pleasure" ? "trip" : vacation.purposeOfTrip} to ${
                vacation.destination
              } tomorrow.lets make it a real vacation for ${
                employee.gender === "female" ? "her" : "him"
              }!`,
              eventDetails: {
                type: "vacation",
                dateOfTheEvent: tomorrowStart,
                employeeId: employee.employeeId,
              },
              notificationCreatedAt: today,
              notificationDueDate: tomorrowStart,
              hasBeenDismissed: false,
              hasBeenHandled: false,
              priority: "Medium",
              className: "bg-blue",
              uid: employee.uid,
            });
            employeesEventsNotifications = [
              ...employeesEventsNotifications,
              newNotification,
            ];
          } else {
            await EmployeeNotificationsModel.findOneAndUpdate(
              {
                "eventDetails.type": "vacation",
                "eventDetails.dateOfTheEvent": vacation.startDate,
                "eventDetails.employeeId": employee.employeeId,
              },
              {
                $set: {
                  title: `${employee.fullName} is off to ${
                    employee.gender === "female" ? "her" : "his"
                  } ${vacation.purposeOfTrip} to ${vacation.purposeOfTrip === "pleasure" ? "trip" : vacation.purposeOfTrip} tomorrow.lets make it a real vacation for ${
                    employee.gender === "female" ? "her" : "him"
                  }!`,
                  notificationCreatedAt: today,
                  notificationDueDate: tomorrowStart,
                },
              }
            );
          }
        }
      }
    }
    if (employeesEventsNotifications.length > 0) {
      await EmployeeNotificationsModel.insertMany(employeesEventsNotifications);
      console.log("New notifications created:", employeesEventsNotifications);
      return res.status(200).json(employeesEventsNotifications);
    }
  } catch (error) {
    console.error(
      "Error adding or updating employee event notification:",
      error
    );
  }
};
export default checkEmployeesEvents;
