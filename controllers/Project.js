const Project = require('../models/Project'); // Adjust the path as needed
const nodemailer = require("nodemailer");



// Create a new Project




// const sendExpirationEmails = async () => {
//   try {
//       const today = new Date();
//       const projects = await Project.find({
//           $or: [
//               { domainexpDate: { $lte: today } },
//               { hostingexpDate: { $lte: today } }
//           ]
//       }).populate({
//         path: 'client',
//         select: 'clientname email', 
//         populate: {
//           path: 'clientname',  
//           select: 'owner'     
//         } 
       
//     });
//       if (projects.length === 0) return;

//       const transporter = nodemailer.createTransport({
//           service: "gmail",
//           auth: {
//             user: "sshubham123verma@gmail.com", // Your email
//             pass: "ogkt tycg boxb pmtv",  // Your email password or App password
//           }
//       });

//       for (const project of projects) {
//           if (project.client && project.client.email) {
//               const mailOptions = {
//                   from: "sshubham123verma@gmail.com",
//                   to: project.client.email,
//                   subject: "Domain or Hosting Expiration Notice",
//                   text: `Dear ${project.client.clientname.owner}, your domain or hosting for project ${project.name} is about to expire. Please take necessary action.`
//               };

//               await transporter.sendMail(mailOptions);
//           }
//       }

//       console.log("Expiration emails sent successfully!");
//   } catch (error) {
//       console.error("Failed to send expiration emails:", error);
//   }
// };

const transporter = nodemailer.createTransport({
  host: "smtp.hostinger.com", // Hostinger SMTP
  port: 465, // Use 465 for SSL or 587 for TLS
  secure: true, // true for 465, false for 587
  auth: {
    user: "support@webitof.com", // Your Hostinger email
    pass: "Support@20012", // Your Hostinger email password or App Password
  },
  tls: {
    rejectUnauthorized: false, // Allows self-signed certificates
  },
});


// const sendExpirationEmails = async () => {
//   try {
//     const today = new Date();

//     // Fetch projects with expiring domains/hosting
//     const projects = await Project.find({
//       $or: [
//         { domainexpDate: { $lte: today } },
//         { hostingexpDate: { $lte: today } },
//       ],
//     }).populate({
//       path: "client",
//       select: "clientname email", 
//       populate: {
//         path: "clientname",
//         select: "owner",
//       },
//     });

//     if (!projects.length) {
//       console.log("No projects with expiration found.");
//       return;
//     }

//     for (const project of projects) {
//       if (!project.client || !project.client.email) {
//         console.warn(`Skipping: No email found for project "${project.name}".`);
//         continue;
//       }

//       // Email Content
//       const mailOptions = {
//         from: `"Webitof Web Agency" <${process.env.EMAIL_USER}>`,
//         to: project.client.email,
//         subject: "Domain or Hosting Expiration Notice",
//         text: `Dear ${project.client.clientname.owner},\n\nYour domain or hosting for project "${project.name}" is about to expire. Please take necessary action.\n\nBest regards,\nYour Company`,
//       };

//       // Send Email
//       await transporter.sendMail(mailOptions);
//       console.log(`Expiration email sent to ${project.client.email} for project: ${project.name}`);
//     }
    
//     console.log("✅ All expiration emails sent successfully!");
//   } catch (error) {
//     console.error("❌ Failed to send expiration emails:", error);
//   }
// };
const sendExpirationEmailForProject = async (projectId) => {
  try {
    // Fetch the project by ID
    const project = await Project.findById(projectId).populate({
      path: "client",
      select: "clientname email",
      populate: {
        path: "clientname",
        select: "owner",
      },
    });

    // Check if project exists
    if (!project) {
      console.log(`❌ Project with ID ${projectId} not found.`);
      return;
    }

    // Check if client and email exist
    if (!project.client || !project.client.email) {
      console.warn(`❌ Skipping: No email found for project "${project.name}".`);
      return;
    }

    // Email Content
    const mailOptions = {
      from: `"Webitof Web Agency" <${process.env.EMAIL_USER}>`,
      to: project.client.email,
      subject: "Domain or Hosting Expiration Notice",
      text: `Dear ${project.client.clientname.owner},\n\nYour domain or hosting for project "${project.name}" is about to expire. Please take necessary action.\n\nBest regards,\nYour Company`,
    };

    // Send Email
    await transporter.sendMail(mailOptions);
    console.log(`✅ Expiration email sent to ${project.client.email} for project: ${project.name}`);
    
  } catch (error) {
    console.error("❌ Failed to send expiration email:", error);
  }
};



const createProject = async (req, res) => {
  try {
    const {
      name,
      description,
      client,
      startDate,
      status,
      Dedline,
      price,
      weblink,
      hosting,
      hostingpurchaseDate,
      hostingexpDate,
      projectType,
      domain,
      domainpurchaseDate,
      domainexpDate,
      notes,
      lables,
      services,
      createdby,
    } = req.body;

    const newProject = new Project({
      name,
      description,
      client,
      startDate,
      status,
      Dedline,
      price,
      weblink,
      hosting,
      hostingpurchaseDate,
      hostingexpDate,
      projectType,
      domain,
      domainpurchaseDate,
      domainexpDate,
      notes,
      services,
      lables,
      createdby,
    });

    await newProject.save();
    res.status(201).json({ message: 'Project created successfully!', project: newProject });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create project', details: error.message });
  }
};

// Get all Projects
const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find().populate({
      path: 'client',
      select: 'clientname',  
      populate: {
        path: 'clientname',  
        select: 'owner'     
      }
  }).populate('services')

    res.status(200).json({ projects });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch projects', details: error.message });
  }
};

const countProjects = async(req, res) =>{
  try{
 const totalProjects = await Project.countDocuments()
  return res.status(200).json({ totalProjects });

  }
  catch(error){
    return res.status(500).json({ error: 'Failed to fetch project count', details: error.message });
  }
}
const countProjectbyuserid   = async(req,res)=>{
  try {
    const { id } = req.params;
    const count = await Project.countDocuments({ createdby: id })
    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({ error: 'Failed to count projects by user id', details: error.message });
  }

}
const countProjectbyclientid   = async(req,res)=>{
  try {
    const { id } = req.params;
    const count = await Project.countDocuments({ client: id })
    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({ error: 'Failed to count projects by client id', details: error.message });
  }

}
const countCompletedProjectbyclientid   = async(req,res)=>{
  try {
    const { id } = req.params;
    const count = await Project.countDocuments({ client: id,status:'Completed' })
    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({ error: 'Failed to count projects by client id', details: error.message });
  }

}

const getProjectbyuserId = async (req, res) => {
  try {
    const { id } = req.params;

    const Projects = await Project.find({

      createdby: id
    }).populate({
      path: 'client',
      select: 'clientname',  
      populate: {
        path: 'clientname',  
        select: 'owner',     
      }
  }).populate('services')
    if (!Projects) {
      return res.status(404).json({ message: 'Projects not found' });
    }

    res.status(200).json({ message: 'Projects retrieved successfully', data: Projects });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving Projects', error: error.message });
  }
};
// Get a single Project by ID
const getProjectById = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findById(id).populate({
      path: 'client',
      select: 'clientname',  
      populate: {
        path: 'clientname',  
        select: 'owner'     
      }
  }).populate('services')

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.status(200).json({ project });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch project', details: error.message });
  }
};

// Update an existing Project by ID
const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedProject = await Project.findByIdAndUpdate(id, updates, { new: true, runValidators: true }).populate('client');
    if (!updatedProject) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.status(200).json({ message: 'Project updated successfully!', project: updatedProject });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update project', details: error.message });
  }
};

// Delete a Project by ID
const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProject = await Project.findByIdAndDelete(id);
    if (!deletedProject) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.status(200).json({ message: 'Project deleted successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete project', details: error.message });
  }
};


const getProjectByClientId = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.find({client:id}).populate({
      path: 'client',
      select: 'clientname paymentReceived',  
      populate: {
        path: 'clientname',  
        select: 'owner '     
      }
  }).populate('services')

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.status(200).json({ project });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch project', details: error.message });
  }
};
module.exports = {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
  countProjects,
  getProjectbyuserId,
  countProjectbyuserid,
  getProjectByClientId,
  countProjectbyclientid,
  // sendExpirationEmails,
  sendExpirationEmailForProject,
  countCompletedProjectbyclientid
};
