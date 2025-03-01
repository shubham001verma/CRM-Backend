const Client = require('../models/Client'); // Adjust the path as needed

const jwt = require('jsonwebtoken'); // For token generation

// Secret for JWT (replace with an environment variable in production)
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';
// Create a new Client
const createClient = async (req, res) => {
  try {
    const {
      clientname,
      primeryConnection,
      primeryConectiontype,
      email,
      phone,
      password,
      company,
      address,
      projects,
      clientgroups,
      totalinvoiced,
      paymentReceived,
      lables,
      createdby,
      totalexpense,
    } = req.body;
   const image= req.file ? req.file.path : null; 

    const newClient = new Client({

      clientname,
      primeryConnection,
      primeryConectiontype,
      email,
      phone,
      password,
      company,
      address,
      projects,
      clientgroups,
      totalinvoiced,
      paymentReceived,
      lables,
      image,
      createdby,
      totalexpense,
      
    });

    await newClient.save();

    res.status(201).json({ message: 'Client created successfully!', client: newClient });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create client', details: error.message });
  }
};

// Get all Clients
const getAllClients = async (req, res) => {
  try {
    const clients = await Client.find().populate('clientname','owner'); 
    res.status(200).json({ clients });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch clients', details: error.message });
  }
};

const getClientbyuserId = async (req, res) => {
  try {
    const { id } = req.params;

    const Clients = await Client.find({

      createdby: id
    }).populate('clientname','owner');
    if (!Clients) {
      return res.status(404).json({ message: 'Client not found' });
    }

    res.status(200).json({ message: 'Clients retrieved successfully', data: Clients });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving Clients', error: error.message });
  }
};


// Get a single Client by ID
const getClientById = async (req, res) => {
  try {
    const { id } = req.params;

    const client = await Client.findById(id).populate('clientname','owner');
    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }

    res.status(200).json({ client });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch client', details: error.message });
  }
};


const countClients = async (req, res) => {
  try {
    // Count the total number of leads in the database
    const totalClients = await Client.countDocuments();

    res.status(200).json({
      success: true,
      totalClients,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error while counting clients',
      error: error.message,
    });
  }
};

const countClientbyuserid   = async(req,res)=>{
  try {
    const { id } = req.params;
    const count = await Client.countDocuments({ createdby: id });
    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({ error: 'Failed to count clients by user id', details: error.message });
  }

}
// Update an existing Client by ID
const updateClient = async (req, res) => {
 try {
     const { id } = req.params;
     const {  
       clientname,
        primeryConnection,
        primeryConectiontype,
        email,
        phone,
        password,
        company,
        address,
        projects,
        clientgroups,
        totalinvoiced,
        totalexpense,
        paymentReceived,
        lables,
        profileName
    } = req.body;
 
   
     const image = req.file ? req.file.path : null; // Extract new image path if provided
 
     // Build the update object dynamically
     const updateFields = {  
        clientname,
        primeryConnection,
        primeryConectiontype,
        email,
        phone,
        password,
        company,
        address,
        projects,
        clientgroups,
        totalinvoiced,
        totalexpense,
        paymentReceived,
        lables,
        profileName
     };
     if (image) {
       updateFields.image = image;
     }
 
  
     const updatedClient = await Client.findByIdAndUpdate(id, updateFields, { new: true });
     
     res.status(200).json({ message: 'Client updated successfully', user: updatedClient });
   } catch (error) {
     console.error('Error updating user:', error); 
     res.status(500).json({ message: 'Error updating user', error: error.message });
   }
};


const updateClientProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const {phone,address,company} = req.body;
    const image = req.file ? req.file.path : null;
console.log(req.body);
    const updateFields = {
     phone,address,company
    };
    if (image) {
      updateFields.image = image;
    }
    const updatedClient = await Client.findByIdAndUpdate(id, updateFields, {  new: true  })
   

    res.status(200).json({ message: 'Client Profile updated successfully!', client: updatedClient });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update client Profile', details: error.message });
  }
};
// Delete a Client by ID
const deleteClient = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedClient = await Client.findByIdAndDelete(id);
    if (!deletedClient) {
      return res.status(404).json({ message: 'Client not found' });
    }

    res.status(200).json({ message: 'Client deleted successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete client', details: error.message });
  }
};
// Authenticate a Delivery Man (Login)
const loginClient = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the client by email
    const client = await Client.findOne({ email });
    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }

    // Check if the password matches (without hashing)
    if (password !== client.password) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: client._id, email: client.email }, 'your_jwt_secret', { expiresIn: '1h' });

    res.status(200).json({ message: 'Login successful', token,client });
  } catch (error) {
    res.status(500).json({ error: 'Failed to login', details: error.message });
  }
};


module.exports = {
  createClient,
  getAllClients,
  getClientById,
  updateClient,
  deleteClient,
  loginClient,
  countClients,
  getClientbyuserId,
  countClientbyuserid,
  updateClientProfile
};
