const express = require('express');
const { body } = require('express-validator');
const {
  getCourses,
  getCourse,
  getCourseBySlug,
  createCourse,
  updateCourse,
  deleteCourse
} = require('../controllers/courseController');
const { adminAuth } = require('../middleware/auth');

const router = express.Router();

router.get('/', getCourses);
router.get('/:id', getCourse);
router.get('/slug/:slug', getCourseBySlug);

router.post(
  '/',
  adminAuth,
  [
    body('title').trim().isLength({ min: 1 }),
    body('slug').trim().isLength({ min: 1 }),
    body('description').trim().isLength({ min: 1 }),
    body('price').isNumeric().isFloat({ min: 0 }),
    body('category').trim().isLength({ min: 1 }),
    body('difficulty').isIn(['beginner', 'intermediate', 'advanced'])
  ],
  createCourse
);

router.put(
  '/:id',
  adminAuth,
  [
    body('title').optional().trim().isLength({ min: 1 }),
    body('slug').optional().trim().isLength({ min: 1 }),
    body('description').optional().trim().isLength({ min: 1 }),
    body('price').optional().isNumeric().isFloat({ min: 0 }),
    body('category').optional().trim().isLength({ min: 1 }),
    body('difficulty').optional().isIn(['beginner', 'intermediate', 'advanced'])
  ],
  updateCourse
);

router.delete('/:id', adminAuth, deleteCourse);

module.exports = router;