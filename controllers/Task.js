const Task = require('../models/Task'); // Assuming you have the Task model in the models directory
const Project = require('../models/Project');

// Create a new Task
exports.createTask = async (req, res) => {
  try {
    const { title, description, project, assignedTo, startDate, Dedline, status, lables,createdby, client, } = req.body;

    // Create a new task
    const newTask = new Task({
      title,
      description,
      project,
      client,
      assignedTo,
      startDate,
      Dedline,
      status,
      lables,
      createdby
    });

    await newTask.save();
    res.status(201).json({
      success: true,
      message: 'Task created successfully',
      task: newTask,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

// Get all tasks
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find()
      .populate({
        path: 'project',
        populate: {
          path: 'client',
          select: 'clientname',
          populate: {
            path: 'clientname',
            select: 'owner',
          },
        },
      })
      .populate('assignedTo');

    res.status(200).json({
      success: true,
      tasks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};
exports.getTaskbyuserId = async (req, res) => {
  try {
    const { id } = req.params;

    const tasks = await Task.find({createdby: id}).populate({
      path: 'project',
      populate: {
        path: 'client',
        select: 'clientname',
        populate: {
          path: 'clientname',
          select: 'owner',
        },
      },
    })
    .populate({
      path: 'assignedTo',
      populate:{
        path:'subrole',
        select:'name'
      }
    });
    if (!tasks) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.status(200).json({ message: 'Task retrieved successfully', data: tasks });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving Task', error: error.message });
  }
};
// Get a single task by ID
exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).populate('project').populate({
      path: 'assignedTo',
      populate:{
        path:'subrole',
        select:'name'
      }
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found',
      });
    }

    res.status(200).json({
      success: true,
      task,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

// Update a task by ID
exports.updateTask = async (req, res) => {
  try {
    const { title, description, project, assignedTo, startDate, Dedline, status, lables,clientnotes,teamnotes ,client,} = req.body;

    const task = await Task.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        project,
        client,
        assignedTo,
        startDate,
        Dedline,
        status,
        lables,
        clientnotes,
        teamnotes

      },
      { new: true } // Return the updated task
    );

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Task updated successfully',
      task,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

// Delete a task by ID
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Task deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

exports.countTasks = async(req, res) =>{
  try{
 const totalTasks = await Task.countDocuments()
  return res.status(200).json({ totalTasks });

  }
  catch(error){
    return res.status(500).json({ error: 'Failed to fetch Task count', details: error.message });
  }
}


exports.countTasksbyuserid   = async(req,res)=>{
  try {
    const { id } = req.params;
    const count = await Task.countDocuments({ createdby: id });
    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({ error: 'Failed to count tasks by user id', details: error.message });
  }

}
exports.countTasksbyClientid   = async(req,res)=>{
  try {
    const { id } = req.params;
    const count = await Task.countDocuments({ client: id });
    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({ error: 'Failed to count tasks by project id', details: error.message });
  }

}
exports.findTaskbyclientId   = async(req,res)=>{
  try {
    const { id } = req.params;
    const getTask = await Task.find({ client: id }).populate({
      path: 'project',
      populate: {
        path: 'client',
        select: 'clientname', 
      },
    })
    .populate({
      path: 'assignedTo',
      select: 'name subrole ', 
      populate: {
        path:'subrole',
        select: 'name',
      }
    });
    res.status(200).json({ getTask });
  } catch (error) {
    res.status(500).json({ error: 'Failed to count tasks by user id', details: error.message });
  }

}
exports.findTaskforclient   = async(req,res)=>{
  try {
    const { id } = req.params;
    const getTask = await Task.find({ project: id }) .populate({
      path: 'project',
      populate: {
        path: 'client',
        select: 'clientname', // Selecting the client name from the project
      },
    })
    .populate({
      path: 'assignedTo',
      select: 'name subrole ', 
      populate: {
        path:'subrole',
        select: 'name',
      },
    });
    res.status(200).json({ getTask });
  } catch (error) {
    res.status(500).json({ error: 'Failed to count tasks by user id', details: error.message });
  }

}
exports.countTasksbyassignedid   = async(req,res)=>{
  try {
    const { id } = req.params;
    const count = await Task.countDocuments({ assignedTo: id });
    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({ error: 'Failed to count tasks by user id', details: error.message });
  }

}
exports.countCompletedTasksByAssignedId = async (req, res) => {
  try {
    const { id } = req.params;
  

    const count = await Task.countDocuments({ assignedTo: id, status: 'Completed' });

    res.status(200).json({ count });
  } catch (error) {
    console.error("Error counting completed tasks:", error);
    res.status(500).json({ error: "Failed to count tasks by user ID", details: error.message });
  }
};
exports.countPendingTasksbyassignedid   = async(req,res)=>{
  try {
    const { id } = req.params;
    const count = await Task.countDocuments({ assignedTo: id,status: 'Pending'});
    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({ error: 'Failed to count tasks by user id', details: error.message });
  }

}
exports.countInProgressTasksbyassignedid   = async(req,res)=>{
  try {
    const { id } = req.params;
    const count = await Task.countDocuments({ assignedTo: id,status: 'In Progress'});
    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({ error: 'Failed to count tasks by user id', details: error.message });
  }

}

exports.gettaskbyassignedid   = async(req,res)=>{
  try {
    const { id } = req.params;

    const tasksassign = await Task.find({assignedTo: id})
    .populate({
      path: 'project',
      populate: {
        path: 'client',
        select: 'clientname',
        populate: {
          path: 'clientname',
          select: 'owner',
        },
      },
    })
    .populate('assignedTo');
    if (!tasksassign) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.status(200).json({ message: 'Task retrieved successfully', data: tasksassign });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving Task', error: error.message });
  }

}

