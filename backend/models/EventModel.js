import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  title: String,
  start: Date,
  className: String,
  note:String,
  uid: String,
});

const EventModel = mongoose.model('events', eventSchema);

export default EventModel;