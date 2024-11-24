import EmployeeNotificationsModel from "../models/EmployeeNotificationsModel.js";
import EmployeeModel from "../models/EmployeesModel.js";

const checkBirthdays = async (req, res) => {
  const today = new Date();
  const tomorrow = new Date(today);
  const nextWeek = new Date(today);
  const nextTwoWeeks = new Date(today);

  tomorrow.setDate(today.getDate() + 1);
  nextWeek.setDate(today.getDate() + 7);
  nextTwoWeeks.setDate(today.getDate() + 14);

  try {
    const employeeWithABirthdayTomorrow = await EmployeeModel.find({
      $expr: {
        $and: [
          { $eq: [{ $month: "$dateOfBirth" }, tomorrow.getMonth() + 1] },
          { $eq: [{ $dayOfMonth: "$dateOfBirth" }, tomorrow.getDate()] },
        ],
      },
    });

    const employeeWithBirthdayNextWeek = await EmployeeModel.find({
      $expr: {
        $and: [
          { $eq: [{ $month: "$dateOfBirth" }, nextWeek.getMonth() + 1] },
          { $eq: [{ $dayOfMonth: "$dateOfBirth" }, nextWeek.getDate()] },
        ],
      },
    });

    const employeeWithBirthdayNextTwoWeeks = await EmployeeModel.find({
      $expr: {
        $and: [
          { $eq: [{ $month: "$dateOfBirth" }, nextTwoWeeks.getMonth() + 1] },
          { $eq: [{ $dayOfMonth: "$dateOfBirth" }, nextTwoWeeks.getDate()] },
        ],
      },
    });

    let birthdayNotifications = [];

    //if there is an employee who's birthday is coming up in 2 weeks: create a notification about it
    if (employeeWithBirthdayNextTwoWeeks.length > 0) {
      for (const employee of employeeWithBirthdayNextTwoWeeks) {
        const newNotificationForABirthdayNextTwoWeeks =
          new EmployeeNotificationsModel({
            title: `${
              employee.fullName
            }'s birthday is coming up in 2 weeks. Don't forget to send ${
              employee.gender === "female" ? "her" : "him"
            } a gift.`,
            eventDetails: {
              type: "birthday",
              dateOfTheEvent: employee.dateOfBirth,
              employeeId: employee.employeeId,
            },
            notificationCreatedAt: today,
            notificationDueDate: nextTwoWeeks,
            hasBeenDismissed: false,
            hasBeenHandled: false,
            priority: "Low",
            className: "bg-purple",
            uid: employee.uid,
          });
        birthdayNotifications.push(newNotificationForABirthdayNextTwoWeeks);
      }
    }
    //if there is an employee who's birthday is coming up next week: create a notification about it or update the current notification
    if (employeeWithBirthdayNextWeek.length > 0) {
      for (const employee of employeeWithBirthdayNextWeek) {
        const alreadyANotification = await EmployeeNotificationsModel.findOne({
          "eventDetails.type": "birthday",
          "eventDetails.dateOfTheEvent": employee.dateOfBirth,
          "eventDetails.employeeId": employee.employeeId,
        });

        if (!alreadyANotification) {
          const newNotificationForABirthdayNextWeek =
            new EmployeeNotificationsModel({
              title: `${
                employee.fullName
              }'s birthday is coming up next week. Don't forget to send ${
                employee.gender === "female" ? "her" : "him"
              } a gift.`,
              eventDetails: {
                type: "birthday",
                dateOfTheEvent: employee.dateOfBirth,
                employeeId: employee.employeeId,
              },
              notificationCreatedAt: today,
              notificationDueDate: nextWeek,
              hasBeenDismissed: false,
              hasBeenHandled: false,
              priority: "Medium",
              className: "bg-purple",
              uid: employee.uid,
            });
          birthdayNotifications = [
            ...birthdayNotifications,
            newNotificationForABirthdayNextWeek,
          ];
          console.log(birthdayNotifications);
          
        } else {
          await EmployeeNotificationsModel.findOneAndUpdate(
            {
              "eventDetails.type": "birthday",
              "eventDetails.dateOfTheEvent": employee.dateOfBirth,
              "eventDetails.employeeId": employee.employeeId,
            },
            {
              $set: {
                title: `${
                  employee.fullName
                }'s birthday is coming up next week. Don't forget to send ${
                  employee.gender === "female" ? "her" : "him"
                } a gift.`,
                notificationCreatedAt: today,
                notificationDueDate: nextWeek,
                priority: "Medium",
              },
            },
            { new: true }
          );
        }
      }
    }
    //if there is an employee who's birthday is coming up tomorrow: create a notification about it or update the current notification
    if (employeeWithABirthdayTomorrow.length > 0) {
      for (const employee of employeeWithABirthdayTomorrow) {
        const alreadyANotification = await EmployeeNotificationsModel.findOne({
          "eventDetails.type": "birthday",
          "eventDetails.dateOfTheEvent": employee.dateOfBirth,
          "eventDetails.employeeId": employee.employeeId,
        });

        if (!alreadyANotification) {
          const newNotificationForABirthdayTomorrow =
            new EmployeeNotificationsModel({
              title: `It's ${
                employee.fullName
              }'s birthday tomorrow. Don't forget to send ${
                employee.gender === "female" ? "her" : "him"
              } a gift.`,
              eventDetails: {
                type: "birthday",
                dateOfTheEvent: employee.dateOfBirth,
                employeeId: employee.employeeId,
              },
              notificationCreatedAt: today,
              notificationDueDate: tomorrow,
              hasBeenDismissed: false,
              hasBeenHandled: false,
              priority: "High",
              className: "bg-purple",
              uid: employee.uid,
            });
          birthdayNotifications = [
            ...birthdayNotifications,
            newNotificationForABirthdayTomorrow,
          ];
        } else {
          await EmployeeNotificationsModel.findOneAndUpdate(
            {
              "eventDetails.type": "birthday",
              "eventDetails.dateOfTheEvent": employee.dateOfBirth,
              "eventDetails.employeeId": employee.employeeId,
            },
            {
              $set: {
                title: `It's ${
                  employee.fullName
                }'s birthday tomorrow. Don't forget to send ${
                  employee.gender === "female" ? "her" : "him"
                } a gift.`,
                notificationCreatedAt: today,
                notificationDueDate: tomorrow,
                priority: "High",
              },
            },
            { new: true }
          );
        }
      }
    }
    if (birthdayNotifications.length > 0) {
      await EmployeeNotificationsModel.insertMany(birthdayNotifications);
      console.log("New notifications created:", birthdayNotifications);
      return res.status(200).json(birthdayNotifications);
    }
  } catch (error) {
    console.error("Error adding birthday notification:", error);
  }
};
export default checkBirthdays;
