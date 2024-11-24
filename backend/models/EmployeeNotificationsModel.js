import mongoose from "mongoose";


const EmployeeNotificationsSchema = new mongoose.Schema({
    title: String,
    eventDetails: {
      type: {
        type: String, 
        required: true,
      },
      dateOfTheEvent: {
        type: Date,     
      },
      employeeId: {
        type: String
      }
    },
    notificationCreatedAt: Date,
    notificationDueDate: Date,
    reminderDate: Date,
    hasBeenDismissed: Boolean,
    hasBeenHandled: Boolean,
    priority: String,
    className: String,
    uid: String,
  });
  
  const EmployeeNotificationsModel = mongoose.model('employeeNotifications', EmployeeNotificationsSchema);
  
  export default EmployeeNotificationsModel;
  