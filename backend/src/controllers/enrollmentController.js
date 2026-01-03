const Enrollment = require('../models/Enrollment');
const Course = require('../models/Course');

const enroll = async (req, res) => {
  const { courseId } = req.body;
  const userId = req.user.user.id;

  try {
    // Check if course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Check if already enrolled
    const existingEnrollment = await Enrollment.findOne({ userId, courseId });
    if (existingEnrollment) {
      return res.status(400).json({ message: 'Already enrolled in this course' });
    }

    const enrollment = new Enrollment({
      userId,
      courseId
    });

    await enrollment.save();
    res.status(201).json(enrollment);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

const getUserEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ userId: req.user.user.id })
      .populate('courseId')
      .sort({ enrolledAt: -1 });
    res.json(enrollments);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

const updateProgress = async (req, res) => {
  const { lessonId, completed } = req.body;

  try {
    const enrollment = await Enrollment.findById(req.params.id);
    if (!enrollment) {
      return res.status(404).json({ message: 'Enrollment not found' });
    }

    // Check if user owns this enrollment
    if (enrollment.userId.toString() !== req.user.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    enrollment.progress.set(lessonId, completed);
    await enrollment.save();

    res.json(enrollment);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

module.exports = { enroll, getUserEnrollments, updateProgress };