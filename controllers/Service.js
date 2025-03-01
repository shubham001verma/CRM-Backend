const Service = require("../models/Service");

// Create a new service
exports.createService = async (req, res) => {
  try {
    const { name, description, cost, duration,createdby } = req.body;

   

    const newService = new Service({ name, description, cost, duration,createdby });
    await newService.save();

    res.status(201).json({ message: "Service created successfully", service: newService });
  } catch (error) {
    res.status(500).json({ message: "Error creating service", error: error.message });
  }
};

// Get all services
exports.getAllServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ message: "Error fetching services", error: error.message });
  }
};
exports.countServiceByUserId   = async(req,res)=>{
  try {
    const { id } = req.params;
    const count = await Service.countDocuments({ createdby: id })
    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({ error: 'Failed to count service by user id', details: error.message });
  }

}
// Get a single service by ID
exports.getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }
    res.status(200).json(service);
  } catch (error) {
    res.status(500).json({ message: "Error fetching service", error: error.message });
  }
};

// Update a service
exports.updateService = async (req, res) => {
  try {
    const { name, description, cost, duration } = req.body;

    const updatedService = await Service.findByIdAndUpdate(
      req.params.id,
      { name, description, cost, duration },
      { new: true, runValidators: true }
    );

    if (!updatedService) {
      return res.status(404).json({ message: "Service not found" });
    }

    res.status(200).json({ message: "Service updated successfully", service: updatedService });
  } catch (error) {
    res.status(500).json({ message: "Error updating service", error: error.message });
  }
};

// Delete a service
exports.deleteService = async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);

    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    res.status(200).json({ message: "Service deleted successfully",service });
  } catch (error) {
    res.status(500).json({ message: "Error deleting service", error: error.message });
  }
};
exports.getRoleByUserId = async (req, res) => {

    try {
        const id = req.params.id;
        const service = await Service.find({createdby:id});
        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }
        res.status(200).json(service);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching Service', error: error.message });
    }
};
