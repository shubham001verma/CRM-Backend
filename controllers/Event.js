const Event = require('../models/Event');

// Create an event
exports.createEvent = async (req, res) => {
  try {
    const { userId, teamId, title, start, end, color } = req.body;

  

    const event = new Event({ userId, teamId,  title, start, end, color });
    await event.save();

    res.status(201).json({ message: "Event created successfully", event });
  } catch (error) {
    res.status(500).json({ message: "Error creating event", error: error.message });
  }
};

// Get all events
exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find()
      .populate('userId', 'name email') // Adjust fields as needed
      .populate('teamId', 'name description')
    

    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: "Error fetching events", error: error.message });
  }
};

// Get an event by ID
exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate('userId', 'name email')
      .populate('teamId', 'name description')
    

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: "Error fetching event", error: error.message });
  }
};

// Update an event
exports.updateEvent = async (req, res) => {
  try {
    const { userId, teamId, title, start, end, color } = req.body;

    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      { userId, teamId,  title, start, end, color },
      { new: true, runValidators: true }
    );

    if (!updatedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json({ message: "Event updated successfully", updatedEvent });
  } catch (error) {
    res.status(500).json({ message: "Error updating event", error: error.message });
  }
};

// Delete an event
exports.deleteEvent = async (req, res) => {
  try {
    const deletedEvent = await Event.findByIdAndDelete(req.params.id);

    if (!deletedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting event", error: error.message });
  }
};

// Get events by User, Team, or Client
exports.getEventsByUserId = async (req, res) => {
  try {
    const { id  } = req.params;
  
    const events = await Event.find({
        userId:id})
     
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: "Error fetching events", error: error.message });
  }
};
exports.getEventsByTeamId = async (req, res) => {
    try {
      const { id  } = req.params;
    
      const events = await Event.find({
          teamId:id})
       
      res.status(200).json(events);
    } catch (error) {
      res.status(500).json({ message: "Error fetching events", error: error.message });
    }
  };