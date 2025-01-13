import EventModel from "../models/EventModel.js";

export const getEvents = async (req, res) => {
  let events;
  const { user } = req;
  try {
    events = await EventModel.find({ uid: user.uid });
  } catch (error) {
    console.error("Error getting events:", error);
    return res
      .status(500)
      .json({ message: "An error occurred while fetching events data." });
  }
  return res.status(200).json(events);
};

export const addEvent = async (req, res) => {
  const { eventData } = req.body;
  const { user } = req;
  try {
    const newEvent = new EventModel({
      ...eventData,
      uid: user.uid,
    });
    await newEvent.save();

    return res.status(200).json(newEvent);
  } catch (error) {
    console.error("Error adding events:", error);
    return res
      .status(500)
      .json({ message: "An error occurred while adding an event." });
  }
};

//delete event
export const deleteEvent = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedEvent = await EventModel.findByIdAndDelete(id);

    if (!deletedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    return res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    console.error("Error deleting event:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// export const addEventNote = async (req, res) => {
//   const { eventId, note } = req.body;
//   let updatedNote;
//   try {
//     const event = await EventModel.findById(eventId);
//     if (!event) {
//       return res.status(404).json({ message: "Event not found" });
//     }
//     // Concatenate new note with existing notes
//     updatedNote = event.note ? `${event.note}\n${note}` : note;
//     event.note = updatedNote;

//     // Save updated event
//     await event.save();
//   } catch (error) {
//     console.error("Error adding event note:", error);
//     res
//       .status(500)
//       .json({ message: "An error occurred while adding an event note" });
//   }
//   res.status(200).json(updatedNote);
// };
