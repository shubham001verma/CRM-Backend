const Lead = require('../models/Lead'); // Adjust the path if needed
const Team = require("../models/Team"); 



// Create a new Lead
exports.createLead = async (req, res) => {
  try {
    const { name, phone,owner, status, source, address, city, state, zip, comments, lables,primeryConection,primeryConectiontype ,createdby} = req.body;

    // Create the new Lead document
    const newLead = new Lead({
      name,
   
      phone,
      status,
      owner,
      source,
      address,
      city,
      state,
      zip,
      comments,
      lables,
      primeryConection,
      primeryConectiontype,
      createdby
    });

    // Save to the database
    await newLead.save();

    return res.status(201).json({ message: 'Lead created successfully!', lead: newLead });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to create lead', details: error.message });
  }
};



// Get all leads
exports.getAllLeads = async (req, res) => {
  try {
    const leads = await Lead.find();
    res.status(200).json(leads);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch leads', error: error.message });
  }
};
exports.countLeadbyuserid   = async(req,res)=>{
  try {
    const { id } = req.params;
    const count = await Lead.countDocuments({ createdby: id });
    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({ error: 'Failed to count leads by user id', details: error.message });
  }

}
exports.getLeadsbyuserId = async (req, res) => {
  try {
    const { id } = req.params;

    const Leads = await Lead.find({

      createdby: id
    })
    if (!Leads) {
      return res.status(404).json({ message: 'Leads not found' });
    }

    res.status(200).json({ message: 'Leads retrieved successfully', data: Leads });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving Leads', error: error.message });
  }
};
exports.getWonLeadsbyuserId = async (req, res) => {
  try {
    const { id } = req.params;

    const Leads = await Lead.find({

      createdby: id,status:'Won'
    })
    if (!Leads) {
      return res.status(404).json({ message: 'Leads not found' });
    }

    res.status(200).json({ message: 'Leads retrieved successfully', data: Leads });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving Leads', error: error.message });
  }
};
// Get a single lead by ID
exports.getLeadById = async (req, res) => {

  try {
    const {id}=req.params;
    const lead = await Lead.findById(id);
    if (!lead) {
      return res.status(404).json({ message: 'Lead not found' });
    }
    res.status(200).json(lead);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch lead', error: error.message });
  }
};
exports.countLeads = async (req, res) => {
  try {
    // Count the total number of leads in the database
    const totalLeads = await Lead.countDocuments();

    res.status(200).json({
      success: true,
      totalLeads,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error while counting leads',
      error: error.message,
    });
  }
};
exports.countWonLeadsbyuserid = async (req, res) => {
  try {
    const { id } = req.params;

    // Count the total number of leads in the database
    const totalWonLeads = await Lead.countDocuments({

     createdby: id,status:'Won'
    });

    res.status(200).json({
      success: true,
      totalWonLeads,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error while counting leads',
      error: error.message,
    });
  }
};
exports.countLostLedsbyuserId = async (req, res) => {
  try {
    const { id } = req.params;

    // Count the total number of leads in the database
    const totalLostLeads = await Lead.countDocuments({
       createdby: id,status:'Lost'
   } );

    res.status(200).json({
      success: true,
      totalLostLeads,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error while counting leads',
      error: error.message,
    });
  }
};

exports.getLead= async (req, res) => {
  try {
    const { id } = req.params;

    const lead = await Lead.find({

    id
    })
    if (!lead) {
      return res.status(404).json({ message: 'Lead Name not found' });
    }

    res.status(200).json({ message: 'Lead retrieved successfully', data: lead });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving Lead', error: error.message });
  }
};
// Update an existing Lead
exports.updateLead = async (req, res) => {
    try {
      const { id } = req.params;
      const updates = req.body; // Extract fields to update from the request body
  
      // Find the Lead by ID and update it
      const updatedLead = await Lead.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
  
      if (!updatedLead) {
        return res.status(404).json({ message: 'Lead not found' });
      }
  
      return res.status(200).json({ message: 'Lead updated successfully!', lead: updatedLead });
    } catch (error) {
      return res.status(500).json({ error: 'Failed to update lead', details: error.message });
    }
  };
  

  
// Delete a lead by ID
exports.deleteLead = async (req, res) => {
  try {
    const lead = await Lead.findByIdAndDelete(req.params.id);
    if (!lead) {
      return res.status(404).json({ message: 'Lead not found' });
    }
    res.status(200).json({ message: 'Lead deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete lead', error: error.message });
  }
};
