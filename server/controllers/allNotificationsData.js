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

    return res.status(200).json(allNotifications);
  } catch (error) {
    console.error("Error getting all notifications:", error);
    return res.status(500).json({
      message: "An error occurred while fetching notifications data.",
    });
  }
};

export const getEmployeesNotifications = async (req, res) => {
  const { user } = req;

  try {
    const today = new Date(); 
    const todayStart = new Date(today.setHours(0, 0, 0, 0)); 

    const employeesNotifications = await EmployeeNotificationsModel.find({
      uid: user.uid,
      hasBeenDismissed: { $ne: true },
      $and: [
        //comparing eventDetails.dateOfTheEvent to ensure it's in the future
        {
          "eventDetails.dateOfTheEvent": { $gte: todayStart },
        },       
      ],
    });

    if (!employeesNotifications || employeesNotifications.length === 0) {
      return res.status(404).json({ message: "No notifications found." });
    }

    return res.status(200).json(employeesNotifications);
  } catch (error) {
    console.error("Error getting employees notifications:", error);
    return res.status(500).json({
      message: "An error occurred while fetching employees notifications data.",
    });
  }
};


export const updateEmployeeNotification = async (req, res) => {
  const { updatedData } = req.body;
  const reminderDate = updatedData.reminderDate;

  try {
    const updatedEmployeeNotification =
      await EmployeeNotificationsModel.findByIdAndUpdate(
        updatedData.id,
        {
          hasBeenDismissed: updatedData.hasBeenDismissed,
          hasBeenHandled: updatedData.hasBeenHandled,
          reminderDate,
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
    return res.status(200).json(updatedEmployeeNotification);
  } catch (error) {
    console.error("Error updating notification:", error);
    return res.status(500).send("Internal Server Error");
  }
};
export const deleteNotification = async (req, res) => {
  const { id } = req.body;
  const { user } = req;

  try {
    await EmployeeNotificationsModel.findOneAndDelete({
      _id: id,
      [uid]: user.uid,
    });
  } catch (error) {
    return console.error("Error deleting notification:", error);
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
    return res
      .status(500)
      .json({ message: "An error occurred while adding notifications." });
  }
};
