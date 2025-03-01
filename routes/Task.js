const express = require('express');
const router = express.Router();
const TaskController = require('../controllers/Task'); // Adjust the path as necessary

// Create Task
router.post('/createtasks', TaskController.createTask);

// Get All Tasks
router.get('/alltasks', TaskController.getTasks);

// Get Task by ID
router.get('/singletask/:id', TaskController.getTaskById);

// Update Task
router.put('/updatetasks/:id', TaskController.updateTask);

// Delete Task
router.delete('/deletetasks/:id', TaskController.deleteTask);

router.get('/counttasks', TaskController.countTasks);


router.get('/gettaskbyuserid/:id', TaskController.getTaskbyuserId);


router.get('/counttasksbyuserid/:id', TaskController.countTasksbyuserid  );


router.get('/getassignedtask/:id', TaskController.gettaskbyassignedid );
router.get('/countgetassignedtask/:id', TaskController.countTasksbyassignedid );


router.get('/countcompletedgetassignedtask/:id', TaskController.countCompletedTasksByAssignedId );

router.get('/countpendinggetassignedtask/:id', TaskController.countPendingTasksbyassignedid );

router.get('/countinprogressgetassignedtask/:id', TaskController.countInProgressTasksbyassignedid );


router.get('/gettaskforclientinproject/:id', TaskController.findTaskforclient  );

router.get('/counttaskforclient/:id', TaskController.countTasksbyClientid  );


router.get('/gettaskforclient/:id', TaskController.findTaskbyclientId  );


module.exports = router;
