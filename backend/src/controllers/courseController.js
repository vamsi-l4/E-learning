const Course = require('../models/Course');
const { validationResult } = require('express-validator');

const getCourses = async (req, res) => {
  try {
    const { category, search, difficulty, page = 1, limit = 9 } = req.query;
    try {
      let query = {};

      if (category) query.category = category;
      if (difficulty) query.difficulty = difficulty;
      if (search) {
        query.$or = [
          { title: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } }
        ];
      }

      const skip = (page - 1) * limit;
      const courses = await Course.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit);
      const total = await Course.countDocuments(query);

      res.json({
        courses,
        totalPages: Math.ceil(total / limit),
        currentPage: parseInt(page),
        total
      });
    } catch (dbError) {
      console.log('DB not connected, using mock data');
      const mockCourses = [
        {
          _id: '1',
          title: 'Introduction to React',
          slug: 'introduction-to-react',
          description: 'Learn the basics of React.js',
          price: 49.99,
          category: 'Web Development',
          difficulty: 'beginner',
          thumbnailUrl: 'https://placehold.co/300x200?text=React',
          lessons: [
            { title: 'What is React?', contentHtml: '<p>React is a JavaScript library.</p>', order: 1 }
          ],
          createdAt: new Date()
        },
        {
          _id: '2',
          title: 'Advanced JavaScript',
          slug: 'advanced-javascript',
          description: 'Master advanced JavaScript concepts',
          price: 79.99,
          category: 'Web Development',
          difficulty: 'advanced',
          thumbnailUrl: 'https://placehold.co/300x200?text=JS',
          lessons: [
            { title: 'Closures', contentHtml: '<p>Understanding closures.</p>', order: 1 }
          ],
          createdAt: new Date()
        }
      ];

      const start = (page - 1) * limit;
      const end = start + limit;
      const paginatedCourses = mockCourses.slice(start, end);

      res.json({
        courses: paginatedCourses,
        totalPages: Math.ceil(mockCourses.length / limit),
        currentPage: parseInt(page),
        total: mockCourses.length
      });
    }
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
    let course;
    try {
      course = await Course.findOne({ slug: req.params.slug });
    } catch (dbError) {
      console.log('DB not connected, using mock data');
      const mockCourses = [
        {
          _id: '1',
          title: 'Introduction to React',
          slug: 'introduction-to-react',
          description: 'Learn the basics of React.js',
          price: 49.99,
          category: 'Web Development',
          difficulty: 'beginner',
          thumbnailUrl: 'https://placehold.co/300x200?text=React',
          lessons: [
            { title: 'What is React?', contentHtml: '<p>React is a JavaScript library for building user interfaces.</p>', order: 1 },
            { title: 'Setting up', contentHtml: '<p>Use Create React App.</p>', order: 2 }
          ],
          createdAt: new Date()
        },
        {
          _id: '2',
          title: 'Advanced JavaScript',
          slug: 'advanced-javascript',
          description: 'Master JS concepts',
          price: 79.99,
          category: 'Web Development',
          difficulty: 'advanced',
          thumbnailUrl: 'https://placehold.co/300x200?text=JS',
          lessons: [
            { title: 'Closures', contentHtml: '<p>Closures explained</p>', order: 1 }
          ],
          createdAt: new Date()
        }
      ];
      course = mockCourses.find(c => c.slug === req.params.slug);
    }
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