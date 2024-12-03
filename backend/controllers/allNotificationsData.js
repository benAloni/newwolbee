import AllNotificationsModel from "../models/AllNotificationsModel.js";
import EmployeeNotificationsModel from "../models/EmployeeNotificationsModel.js";

export const getAllNotifications = async (req, res) => {
  const { user } = req;

  try {
    const allNotifications = await AllNotificationsModel.find({
      $or: [
        { uid: user.uid }, // Notifications that match the user's uid
        { uid: { $exists: false } }, // Notifications that do not have a uid field
      ],
    });

    res.status(200).json(allNotifications);
  } catch (error) {
    console.error("Error getting all notifications:", error);
    res.status(500).json({
      message: "An error occurred while fetching notifications data.",
    });
  }
};

export const getEmployeesNotifications = async (req, res) => {
  const { user } = req;

  try {
    const today = new Date();
    const currentMonth = today.getMonth() + 1;
    const currentDay = today.getDate();

    const employeesNotifications = await EmployeeNotificationsModel.find({
      uid: user.uid,
      hasBeenDismissed: { $ne: true },
      $expr: {
        $and: [
          {
            $or: [
              // If the month is greater than the current month
              { $gt: [{ $month: "$eventDetails.dateOfTheEvent" }, currentMonth] },
              {
                // If the month is the same, compare the current day to the event day
                $and: [
                  { $eq: [{ $month: "$eventDetails.dateOfTheEvent" }, currentMonth] },
                  { $gt: [{ $dayOfMonth: "$eventDetails.dateOfTheEvent" }, currentDay] },
                ],
              },
            ],
          },
          // Ensuring notificationDueDate is equal to dateOfTheEvent
          {
            $eq: [
              { $month: "$notificationDueDate" },
              { $month: "$eventDetails.dateOfTheEvent" },
            ],
          },
          {
            $eq: [
              { $dayOfMonth: "$notificationDueDate" },
              { $dayOfMonth: "$eventDetails.dateOfTheEvent" },
            ],
          },
        ],
      },
    });

    if (!employeesNotifications || employeesNotifications.length === 0) {
      return res.status(404).json({ message: "No notifications found." });
    }

    res.status(200).json(employeesNotifications);
  } catch (error) {
    console.error("Error getting employees notifications:", error);
    res
      .status(500)
      .json({ message: "An error occurred while fetching employees notifications data." });
  }
};

export const updateEmployeeNotification = async (req, res) => {
  const { updatedData } = req.body;
  const notificationDueDate = updatedData.notificationDueDate;

  try {
    const updatedEmployeeNotification =
      await EmployeeNotificationsModel.findByIdAndUpdate(
        updatedData.id,
        {
          hasBeenDismissed: updatedData.hasBeenDismissed,
          hasBeenHandled: updatedData.hasBeenHandled,
          notificationDueDate,
        },
        {
          new: true,
          runValidators: true,
        }
      );
    if (!updatedEmployeeNotification) {
      // console.log("Notification not found");
      return res.status(404).send("Notification not found");
    }
    res.status(200).json(updatedEmployeeNotification);
  } catch (error) {
    console.error("Error updating notification:", error);
    res.status(500).send("Internal Server Error");
  }
};
export const addNotification = async (req, res) => {
  const { notificationsData } = req.body;
  const { user } = req;

  try {
    let newNotifications = [];

    if (Array.isArray(notificationsData)) {
      // If notificationsData is an array
      newNotifications = notificationsData.map((notification) => ({
        ...notification,
        uid: user.uid,
      }));
    } else if (notificationsData && typeof notificationsData === "object") {
      // If notificationsData is a single object
      newNotifications.push({
        ...notificationsData,
        uid,
      });
    }

    if (newNotifications.length > 0) {
      await AllNotificationsModel.insertMany(newNotifications);
    }

    return res
      .status(200)
      .json({ message: "Notifications added successfully." });
  } catch (error) {
    console.error("Error adding notifications:", error);
    res
      .status(500)
      .json({ message: "An error occurred while adding notifications." });
  }
};

