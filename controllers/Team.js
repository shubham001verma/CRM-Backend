const Team = require('../models/Team'); // Adjust the path as needed
const jwt = require('jsonwebtoken'); // For token generation


// Secret for JWT (replace with an environment variable in production)
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';
// Create a new Team Member

const createTeamMember = async (req, res) => {
  try {
    const { name, email, phone, subrole, address, createdby, password, fixedSalary, totalPaidLeaves } = req.body;

  
    // Check if email already exists
    const existingMember = await Team.findOne({ email });
    if (existingMember) {
      return res.status(400).json({ error: "Email already exists" });
    }

  

    // Calculate salary per day (assuming 30 working days per month)
    const salaryPerDay = fixedSalary / 30;

    const newTeamMember = new Team({
      name,
      email,
      password,
      phone,
      subrole,
      address,
      createdby,
      fixedSalary,
      salaryPerDay,
      totalPaidLeaves,
      remainingPaidLeaves: totalPaidLeaves, // Initialize remaining paid leaves
      image: req.file ? req.file.path : null, // Handle optional image upload
    });

    await newTeamMember.save();
    res.status(201).json({ message: "Team member created successfully!", teamMember: newTeamMember });
  } catch (error) {
    res.status(500).json({ error: "Failed to create team member", details: error.message });
  }
};






// Get all Team Members
const getAllTeamMembers = async (req, res) => {
  try {
    const teamMembers = await Team.find()
    res.status(200).json({ teamMembers });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch team members', details: error.message });
  }
};
const getTeamMemberbyuserId = async (req, res) => {
  try {
    const { id } = req.params;

    const teammember = await Team.find({createdby: id}).populate('subrole','name')
    if (!teammember) {
      return res.status(404).json({ message: 'Teammember not found' });
    }

    res.status(200).json({ message: 'Teammember retrieved successfully', data: teammember });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving Teammember', error: error.message });
  }
};
// Get a single Team Member by ID
const getTeamMemberById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const teamMember = await Team.findById(id)
      .populate({
        path: 'subrole',
        select: 'name permissions',
        populate: {
          path: 'permissions', // Assuming `permissions` is a reference to another model
          select: 'module subPermissions' // Only fetching `module`
        }
      });

    if (!teamMember) {
      return res.status(404).json({ message: 'Team member not found' });
    }

    res.status(200).json({ teamMember });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch team member', details: error.message });
  }
};
const getuseridbyteammember = async (req, res) => {
  try {
    const { id } = req.params;
    
    const teamMember = await Team.find({createdby:id})
      

    if (!teamMember) {
      return res.status(404).json({ message: 'Team member not found' });
    }

    res.status(200).json({ teamMember });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch team member', details: error.message });
  }
};

const countTeamMembers = async(req, res) =>{
  try {
    const count = await Team.countDocuments();
    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({ error: 'Failed to count team members', details: error.message });
  }
}
const countTeamMembersbyuserid   = async(req,res)=>{
  try {
    const { id } = req.params;
    const count = await Team.countDocuments({ createdby: id })
    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({ error: 'Failed to count team members by user id', details: error.message });
  }

}

// Update a Team Member by ID
const updateTeamMember = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedTeamMember = await Team.findByIdAndUpdate(id, updates, { new: true, runValidators: true })
    if (!updatedTeamMember) {
      return res.status(404).json({ message: 'Team member not found' });
    }

    res.status(200).json({ message: 'Team member updated successfully!', teamMember: updatedTeamMember });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update team member', details: error.message });
  }
};
const updateTeamMemberProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const {profileName,phone,address} = req.body;
    const image = req.file ? req.file.path : null;

    const updateFields = {
      profileName,phone,address
    };
    if (image) {
      updateFields.image = image;
    }
    const updatedTeamMember = await Team.findByIdAndUpdate(id, updateFields, {  new: true  })
   

    res.status(200).json({ message: 'Team member updated successfully!', teamMember: updatedTeamMember });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update team member', details: error.message });
  }
};

// Delete a Team Member by ID
const deleteTeamMember = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTeamMember = await Team.findByIdAndDelete(id);
    if (!deletedTeamMember) {
      return res.status(404).json({ message: 'Team member not found' });
    }

    res.status(200).json({ message: 'Team member deleted successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete team member', details: error.message });
  }
};
const loginTeam = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the team member by email
    const teamMember = await Team.findOne({ email });
    if (!teamMember) {
      return res.status(404).json({ message: 'Team member not found' });
    }

    // Check if the password matches (without hashing)
    if (password !== teamMember.password) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: teamMember._id, email: teamMember.email }, 'your_jwt_secret', { expiresIn: '1h' });

    res.status(200).json({ message: 'Login successful', token ,teamMember});
  } catch (error) {
    res.status(500).json({ error: 'Failed to login', details: error.message });
  }
};



module.exports = {
  createTeamMember,
  getAllTeamMembers,
  getTeamMemberById,
  updateTeamMember,
  deleteTeamMember,
  countTeamMembers,
  getTeamMemberbyuserId,
  countTeamMembersbyuserid ,
  loginTeam,
  updateTeamMemberProfile,
  getuseridbyteammember
};
