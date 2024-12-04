import CompanyEventModel from "../models/CompanyEventsModel.js";
import mongoose from "mongoose";

export const getCompanyEvents = async (req, res) => {
  let companyEvents;
  const { user } = req;
  try {
    // mongoose.set("debug", true);
    companyEvents = await CompanyEventModel.find({ uid: user.uid });
  } catch (error) {
    console.error("Error getting company events:", error);
    return res.status(500).send("Internal Server Error");
  }
  return res.status(200).json(companyEvents);
};
export const addNewCompanyEvent = async (req, res) => {
  const { user } = req;
  const { newCompanyEventData } = req.body;
  let newCompanyEvent;
  try {
    newCompanyEvent = new CompanyEventModel({
      ...newCompanyEventData,
      time: [
        {
          startsAt: newCompanyEventData.startsAt,
          endsAt: newCompanyEventData.endsAt,
        },
      ],
      uid: user.uid,
    });
    await newCompanyEvent.save();
  } catch (error) {
    console.error("Error saving new company event:", error);
    res.status(500).send("Internal Server Error");
  }
  res.status(200).json(newCompanyEvent);
};
export const updateCompanyEvent = async (req, res) => {
  const {
    id,
    dueDate,
    time,
    location,
    numberOfGuests,
    budget,
    eventTheme,
    activity,
  } = req.body;
  let updatedEvent;
  try {
    updatedEvent = await CompanyEventModel.findByIdAndUpdate(
      id,
      {
        dueDate,
        time,
        location,
        numberOfGuests,
        budget,
        eventTheme,
        activity,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updatedEvent) {
      console.log("Event not found");
      return res.status(404).send("Event not found");
    }
  } catch (error) {
    console.error("Error updating company event:", error);
    res.status(500).send("Internal Server Error");
  }
  console.log("Company event updated successfully:", updatedEvent);
  res.status(200).json(updatedEvent);
};
export const deleteCompanyEvent = async (req, res) => {
  const { user } = req;
  const { id } = req.body;
  try {
    const companyEvents = await CompanyEventModel.find({ uid: user.uid });
    const eventToDelete = companyEvents.find(
      (event) => event._id.toString() === id
    );
    if (!eventToDelete) {
      return res.status(404).json({
        message:
          "Event not found or user is not authorized to delete this company event.",
      });
    }
    await CompanyEventModel.findByIdAndDelete(eventToDelete._id);
  } catch (error) {
    console.error("Error deleting company event:", error);
    res.status(500).send("Internal Server Error");
  }
  res.status(200).json({
    message: "Company event deleted successfully.",
  });
};
