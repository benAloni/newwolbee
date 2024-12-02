import AllNotificationsModel from "../models/AllNotificationsModel.js";
import EmployeeNotificationsModel from "../models/EmployeeNotificationsModel.js"

export const getAllNotifications = async (req, res) => {
  const {user} = req

  try {
    const allNotifications = await AllNotificationsModel.find({     
         $or: [
            { uid: user.uid },             // Notifications that match the user's uid
            { uid: { $exists: false } }    // Notifications that do not have a uid field
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
    const today = new Date();
    const currentMonth = today.getMonth() + 1;
    const currentDay = today.getDate();

    const employeesNotifications = await EmployeeNotificationsModel.find({
      uid: user.uid,
      hasBeenDismissed: { $ne: true },
      $expr: {
        $or: [
           //if the month is greater than the current month
          { $gt: [{ $month: "$eventDetails.dateOfTheEvent" }, currentMonth] },
          {
          //if the month is the same, compare the current day to the event day
            $and: [
              { $eq: [{ $month: "$eventDetails.dateOfTheEvent" }, currentMonth] },
              { $gt: [{ $dayOfMonth: "$eventDetails.dateOfTheEvent" }, currentDay] },
            ],
          },
        ],
      },
    });
    if(!employeesNotifications|| employeesNotifications.length === 0) {
      return res.status(404).json({ message: "No notifications found." });
    }
    res.status(200).json(employeesNotifications);
  } catch (error) {
    console.error("Error getting employees notifications:", error);
    res.status(500).json({ message: "An error occurred while fetching employees notifications data." });
  }
};
export const updateEmployeeNotification = async (req, res) => { 
  const {updatedData} = req.body  
  try {
    const updatedEmployeeNotification = await EmployeeNotificationsModel.findByIdAndUpdate(
      updatedData.id,
      {       
          hasBeenDismissed: updatedData.hasBeenDismissed,
          hasBeenHandled: updatedData.hasBeenHandled,
          notificationDueDate: updatedData.notificationDueDate       
      },
      {
        new: true,
        runValidators: true,
      }
    )
    if (!updatedEmployeeNotification) {
      console.log("Notification not found");
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