import mongoose from "mongoose";

const AllNotificationsSchema = new mongoose.Schema({
  title: String,
  start: Date,
  className: String,
  uid: String,
});

const AllNotificationsModel = mongoose.model('allNotifications', AllNotificationsSchema);

export default AllNotificationsModel;
