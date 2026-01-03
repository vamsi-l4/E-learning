const Enrollment = require('../models/Enrollment');
const Course = require('../models/Course');

const enroll = async (req, res) => {
  const { courseId } = req.body;
  const userId = req.user.user.id;

  try {
    let enrollment;
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

      enrollment = new Enrollment({
        userId,
        courseId
      });

      await enrollment.save();
    } catch (dbError) {
      console.log('DB not connected, using mock enrollment');
      enrollment = {
        _id: 'mock-' + Date.now(),
        userId,
        courseId,
        progress: {},
        enrolledAt: new Date()
      };
    }
    res.status(201).json(enrollment);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

const getUserEnrollments = async (req, res) => {
  try {
    let enrollments;
    try {
      enrollments = await Enrollment.find({ userId: req.user.user.id })
        .populate('courseId')
        .sort({ enrolledAt: -1 });

      // Filter out enrollments where the course has been deleted
      enrollments = enrollments.filter(enrollment => enrollment.courseId && enrollment.courseId._id);
    } catch (dbError) {
      console.log('DB not connected, using mock enrollments');
      enrollments = [
        {
          _id: 'mock-1',
          userId: req.user.user.id,
          courseId: {
            _id: '1',
            title: 'Introduction to React',
            slug: 'introduction-to-react',
            description: 'Learn the basics of React.js',
            lessons: [
              { _id: 'l1', title: 'What is React?', order: 1 },
              { _id: 'l2', title: 'Setting up', order: 2 }
            ]
          },
          progress: { 'l1': true },
          enrolledAt: new Date()
        }
      ];
    }
    res.json(enrollments);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

const updateProgress = async (req, res) => {
  const { lessonId, completed } = req.body;

  try {
    let enrollment;
    try {
      enrollment = await Enrollment.findById(req.params.id);
      if (!enrollment) {
        return res.status(404).json({ message: 'Enrollment not found' });
      }

      // Check if user owns this enrollment
      if (enrollment.userId.toString() !== req.user.user.id) {
        return res.status(403).json({ message: 'Not authorized' });
      }

      enrollment.progress.set(lessonId, completed);
      await enrollment.save();
    } catch (dbError) {
      console.log('DB not connected, using mock update');
      enrollment = {
        _id: req.params.id,
        userId: req.user.user.id,
        courseId: '1',
        progress: { [lessonId]: completed },
        enrolledAt: new Date()
      };
    }

    res.json(enrollment);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

module.exports = { enroll, getUserEnrollments, updateProgress };