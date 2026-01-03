const express = require('express');
const { body } = require('express-validator');
const { enroll, getUserEnrollments, updateProgress } = require('../controllers/enrollmentController');
const { auth } = require('../middleware/auth');

const router = express.Router();

router.post(
  '/',
  auth,
  [
    body('courseId').isMongoId()
  ],
  enroll
);

router.get('/me', auth, getUserEnrollments);

router.put(
  '/:id/progress',
  auth,
  [
    body('lessonId').isString(),
    body('completed').isBoolean()
  ],
  updateProgress
);

module.exports = router;