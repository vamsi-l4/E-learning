const Course = require('../models/Course');
const { validationResult } = require('express-validator');

const getCourses = async (req, res) => {
  try {
    const { category, search, difficulty } = req.query;
    let query = {};

    if (category) query.category = category;
    if (difficulty) query.difficulty = difficulty;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const courses = await Course.find(query).sort({ createdAt: -1 });
    res.json(courses);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

const getCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.json(course);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

const getCourseBySlug = async (req, res) => {
  try {
    const course = await Course.findOne({ slug: req.params.slug });
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.json(course);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

const createCourse = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { title, slug, description, price, category, difficulty, thumbnailUrl, lessons } = req.body;

  try {
    const course = new Course({
      title,
      slug,
      description,
      price,
      category,
      difficulty,
      thumbnailUrl,
      lessons
    });

    await course.save();
    res.status(201).json(course);
  } catch (error) {
    console.error(error.message);
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Course slug already exists' });
    }
    res.status(500).send('Server error');
  }
};

const updateCourse = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.json(course);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.json({ message: 'Course deleted' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

module.exports = { getCourses, getCourse, getCourseBySlug, createCourse, updateCourse, deleteCourse };