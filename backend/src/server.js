require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json({ extended: false }));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/courses', require('./routes/courses'));
app.use('/api/enrollments', require('./routes/enrollments'));
app.use('/api/admin', require('./routes/admin'));

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'OK' }));

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});