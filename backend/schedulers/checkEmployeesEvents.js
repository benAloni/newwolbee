import EmployeeNotificationsModel from "../models/EmployeeNotificationsModel.js";
import EmployeeModel from "../models/EmployeesModel.js";

const checkEmployeesEvents = async (req, res) => {
  const normalizeDate = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  };

  const today = normalizeDate(new Date());
  const currentDate = new Date(today);
  const tomorrow = new Date(currentDate);
  const nextWeek = new Date(currentDate);
  const nextTwoWeeks = new Date(currentDate);
  const nextMonth = new Date(currentDate);

  currentDate.setDate(today.getDate() + 1);
  // console.log("today", currentDate);
  tomorrow.setDate(today.getDate() + 2);
  // console.log("tomorrow", tomorrow);
  nextWeek.setDate(today.getDate() + 8);
  // console.log("nextWeek", nextWeek);
  nextTwoWeeks.setDate(today.getDate() + 15);
  // console.log("next 2", nextTwoWeeks);
  nextMonth.setDate(today.getDate() + 31);
  // console.log("next month", nextMonth);

  //-----tomorrow----------------------------------
  const dayBeforeTomorrow = new Date(today);
  dayBeforeTomorrow.setDate(today.getDate() + 1);
  const twoDaysAfterTomorrow = new Date(today);
  twoDaysAfterTomorrow.setDate(today.getDate() + 3);
  //-----next week----------------------------------
  const dayBeforeNextWeek = new Date(today);
  dayBeforeNextWeek.setDate(today.getDate() + 7);
  console.log("formatted  day beforenext week:", dayBeforeNextWeek);
  const twoDaysAfterNextWeek = new Date(today);
  twoDaysAfterNextWeek.setDate(today.getDate() + 9);
  console.log("formatted next week:", twoDaysAfterNextWeek);

  //-----next two weeks-----------------------------
  const dayBeforeNextTwoWeeks = new Date(today);
  dayBeforeNextTwoWeeks.setDate(today.getDate() + 14);
  const twoDaysAfterNextTwoWeeks = new Date(today);
  twoDaysAfterNextTwoWeeks.setDate(today.getDate() + 16);
  //-----next month---------------------------------
  const dateBeforeNextMonth = new Date(today);
  dateBeforeNextMonth.setDate(today.getDate() + 30);
  const twoDaysAfterNextMonth = new Date(today);
  twoDaysAfterNextMonth.setDate(today.getDate() + 32);
  //------------------------------------------------

  try {
    const employeeWithEventTomorrow = await EmployeeModel.find({
      //when comparing dates - mongo increases the date by 1 day. meaning dayBeforeTomorrow is today and tomorrow is two days ahead.
      vacation: {
        $elemMatch: {
          startDate: {
            $gte: dayBeforeTomorrow,
            $lt: twoDaysAfterTomorrow,
          },
        },
      },
    });

    const employeeWithEventNextWeek = await EmployeeModel.find({
      vacation: {
        $elemMatch: {
          startDate: {
            $gte: dayBeforeNextWeek,
            $lt: twoDaysAfterNextWeek,
          },
        },
      },
    });

    const employeeWithEventNextTwoWeeks = await EmployeeModel.find({
      vacation: {
        $elemMatch: {
          startDate: {
            $gte: dayBeforeNextTwoWeeks,
            $lt: twoDaysAfterNextTwoWeeks,
          },
        },
      },
    });
    const employeeWithEventNextMonth = await EmployeeModel.find({
      vacation: {
        $elemMatch: {
          startDate: {
            $gte: dateBeforeNextMonth,
            $lt: twoDaysAfterNextMonth,
          },
        },
      },
    });

    let employeesEventsNotifications = [];

    if (employeeWithEventNextMonth.length > 0) {
      for (const employee of employeeWithEventNextMonth) {
        if (vacation.startDate.getDate() !== nextMonth.getDate()) continue;
        for (const vacation of employee.vacation) {
          const alreadyANotification = await EmployeeNotificationsModel.findOne(
            {
              "eventDetails.type": "vacation",
              "eventDetails.dateOfTheEvent": dateBeforeNextMonth,
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
                dateOfTheEvent: nextMonth,
                employeeId: employee.employeeId,
              },
              notificationCreatedAt: currentDate,
              notificationDueDate: nextMonth,
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
          if (vacation.startDate.getDate() !== nextTwoWeeks.getDate()) continue;
          const alreadyANotification = await EmployeeNotificationsModel.findOne(
            {
              "eventDetails.type": "vacation",
              "eventDetails.dateOfTheEvent": dayBeforeNextTwoWeeks,
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
                dateOfTheEvent: nextTwoWeeks,
                employeeId: employee.employeeId,
              },
              notificationCreatedAt: currentDate,
              notificationDueDate: nextTwoWeeks,
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
                "eventDetails.dateOfTheEvent": dayBeforeNextTwoWeeks,
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
                  notificationCreatedAt: currentDate,
                  notificationDueDate: nextTwoWeeks,
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
          if (vacation.startDate.getDate() !== nextWeek.getDate()) continue;
          const alreadyANotification = await EmployeeNotificationsModel.findOne(
            {
              "eventDetails.type": "vacation",
              "eventDetails.dateOfTheEvent": dayBeforeNextWeek,
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
              } next week. lets make it a real vacation for ${
                employee.gender === "female" ? "her" : "him"
              }!`,
              eventDetails: {
                type: "vacation",
                dateOfTheEvent: nextWeek,
                employeeId: employee.employeeId,
              },
              notificationCreatedAt: currentDate,
              notificationDueDate: nextWeek,
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
                "eventDetails.dateOfTheEvent": dayBeforeNextWeek,
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
                  notificationCreatedAt: currentDate,
                  notificationDueDate: nextWeek,
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
          if (vacation.startDate.getDate() !== tomorrow.getDate()) continue;
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
              } ${vacation.purposeOfTrip === "pleasure" ? "trip" : vacation.purposeOfTrip} to ${
                vacation.destination
              } tomorrow.lets make it a real vacation for ${
                employee.gender === "female" ? "her" : "him"
              }!`,
              eventDetails: {
                type: "vacation",
                dateOfTheEvent: tomorrow,
                employeeId: employee.employeeId,
              },
              notificationCreatedAt: currentDate,
              notificationDueDate: tomorrow,
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
                  notificationCreatedAt: currentDate,
                  notificationDueDate: tomorrow,
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
