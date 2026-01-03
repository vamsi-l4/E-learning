const User = require('../models/User');
const Enrollment = require('../models/Enrollment');

const getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-passwordHash').sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

const getReports = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalCourses = await (await import('../models/Course.js')).default.countDocuments();
    const totalEnrollments = await Enrollment.countDocuments();

    res.json({
      totalUsers,
      totalCourses,
      totalEnrollments
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

module.exports = { getUsers, getReports };