import AllNotificationsModel from "../models/AllNotificationsModel.js";
import EmployeeNotificationsModel from "../models/EmployeeNotificationsModel.js"

export const getAllNotifications = async (req, res) => {
  const {user} = req

  try {
    const allNotifications = await AllNotificationsModel.find({
      $or: [
        { uid: user.uid },          // Notifications with the user's uid
        { uid: { $exists: false } } // Notifications without any uid
      ]
    });

    res.status(200).json(allNotifications);
  } catch (error) {
    console.error("Error getting all notifications:", error);
    res.status(500).json({ message: "An error occurred while fetching notifications data." });
  }
};

export const getEmployeesNotifications = async (req, res) => {
  const {user} = req

  try {
    const employeesNotifications = await EmployeeNotificationsModel.find({uid: user.uid});
    if(!employeesNotifications) return
    res.status(200).json(employeesNotifications);
  } catch (error) {
    console.error("Error getting employees notifications:", error);
    res.status(500).json({ message: "An error occurred while fetching employees notifications data." });
  }
};

export const addNotification = async (req, res) => {
  const { notificationsData } = req.body;
  const { user } = req;

  try {
    let newNotifications = [];

    if (Array.isArray(notificationsData)) {
      // If notificationsData is an array
      newNotifications = notificationsData.map(notification => ({
        ...notification,
        uid: user.uid,
      }));
    } else if (notificationsData && typeof notificationsData === 'object') {
      // If notificationsData is a single object
      newNotifications.push({
        ...notificationsData,
        uid,
      });
    }

    if (newNotifications.length > 0) {
      await AllNotificationsModel.insertMany(newNotifications);
    }

    return res.status(200).json({ message: "Notifications added successfully." });
  } catch (error) {
    console.error("Error adding notifications:", error);
    res.status(500).json({ message: "An error occurred while adding notifications." });
  }
};





// export const deleteEvent = async (req, res) => {
//   const { id } = req.params; // Get the event ID from the request parameters

//   try {
//     const deletedEvent = await EventModel.findByIdAndDelete(id);

//     if (!deletedEvent) {
//       return res.status(404).json({ message: 'Event not found' });
//     }

//     res.status(200).json({ message: 'Event deleted successfully' });
//   } catch (error) {
//     console.error('Error deleting event:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };