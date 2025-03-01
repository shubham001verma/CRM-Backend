const express = require('express');
const router = express.Router();
const eventController = require('../controllers/Event');

router.post('/addevent', eventController.createEvent);
router.get('/allevent', eventController.getAllEvents);
router.get('/singleevent/:id', eventController.getEventById);
router.put('/updateevent/:id', eventController.updateEvent);
router.delete('/deleteevent/:id', eventController.deleteEvent);
router.get('/filteruserevents/:id', eventController.getEventsByUserId);
router.get('/filterteamevents/:id', eventController.getEventsByTeamId);
module.exports = router;
