const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');

// Import Routes
const userRoutes = require('./routes/User');
const leadRoutes = require('./routes/Lead');
const clientRoutes = require('./routes/Client');
const projectRoutes = require('./routes/Project');
const teamRoutes = require('./routes/Team');
const taskRoutes = require('./routes/Task');
const roleRoutes = require('./routes/Role');
const serviceRoutes = require('./routes/Service');
const bannerRoutes = require('./routes/Banner');
const attendanceRoutes = require('./routes/Attendance');
const salaryRoutes = require('./routes/Salary');
const eventRoutes = require('./routes/Event');
const leaveRoutes = require('./routes/Leave');
const reportRoutes = require('./routes/DailyReport');
// Initialize dotenv for environment variables
dotenv.config();

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON requests
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data

// Serve static files for uploaded images
app.use("/uploads",express.static("uploads"));

// MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1); // Exit with failure
  }
};

// Routes
app.use('/user', userRoutes); 
app.use('/lead', leadRoutes);

app.use('/client', clientRoutes);

app.use('/project', projectRoutes);

app.use('/team', teamRoutes);

app.use('/task', taskRoutes);

app.use('/role', roleRoutes);  // Add this line after all other routes

app.use('/service', serviceRoutes); 

app.use('/banner', bannerRoutes);  // Add this line after all other routes

app.use('/attendance', attendanceRoutes);  // Add this line after all other routes

app.use('/salary', salaryRoutes);  // Add this line after all other routes

app.use('/event', eventRoutes);  // Add this line after all other routes

app.use('/leave', leaveRoutes);  // Add this line after all other routes

app.use('/report', reportRoutes);  // Add this line after all other routes



app.get('/', (req, res) => {
  res.send('API is running...');
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server is running on port ${PORT}`);
});
