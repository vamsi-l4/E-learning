const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Course = require('./src/models/Course');
const User = require('./src/models/User');
const connectDB = require('./src/config/database');

dotenv.config();
connectDB();

const seedData = async () => {
  try {
    // Create admin user
    const adminExists = await User.findOne({ email: 'admin@example.com' });
    if (!adminExists) {
      const admin = new User({
        name: 'Admin User',
        email: 'admin@example.com',
        passwordHash: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password: password
        role: 'admin'
      });
      await admin.save();
      console.log('Admin user created');
    }

    // Create sample courses
    const courses = [
      {
        title: 'Introduction to React',
        slug: 'introduction-to-react',
        description: 'Learn the basics of React.js and build your first web application.',
        price: 49.99,
        category: 'Web Development',
        difficulty: 'beginner',
        thumbnailUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400',
        lessons: [
          {
            title: 'What is React?',
            contentHtml: '<p>React is a JavaScript library for building user interfaces.</p>',
            videoUrl: 'https://www.youtube.com/watch?v=4UZrsTqkcW4',
            order: 1
          },
          {
            title: 'Setting up your development environment',
            contentHtml: '<p>Install Node.js and create your first React app.</p>',
            order: 2
          },
          {
            title: 'Components and JSX',
            contentHtml: '<p>Learn about React components and JSX syntax.</p>',
            order: 3
          }
        ]
      },
      {
        title: 'Advanced JavaScript Concepts',
        slug: 'advanced-javascript-concepts',
        description: 'Master advanced JavaScript features including closures, prototypes, and async programming.',
        price: 79.99,
        category: 'Web Development',
        difficulty: 'advanced',
        thumbnailUrl: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=400',
        lessons: [
          {
            title: 'Closures and Scope',
            contentHtml: '<p>Understanding closures and lexical scope in JavaScript.</p>',
            order: 1
          },
          {
            title: 'Prototypes and Inheritance',
            contentHtml: '<p>Learn about prototypal inheritance in JavaScript.</p>',
            order: 2
          },
          {
            title: 'Async Programming with Promises',
            contentHtml: '<p>Master asynchronous programming with Promises and async/await.</p>',
            order: 3
          }
        ]
      },
      {
        title: 'Data Science with Python',
        slug: 'data-science-with-python',
        description: 'Learn data analysis and visualization using Python, pandas, and matplotlib.',
        price: 99.99,
        category: 'Data Science',
        difficulty: 'intermediate',
        thumbnailUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400',
        lessons: [
          {
            title: 'Introduction to Data Science',
            contentHtml: '<p>Overview of data science and its applications.</p>',
            order: 1
          },
          {
            title: 'Python for Data Analysis',
            contentHtml: '<p>Using pandas for data manipulation and analysis.</p>',
            order: 2
          },
          {
            title: 'Data Visualization',
            contentHtml: '<p>Create compelling visualizations with matplotlib.</p>',
            order: 3
          }
        ]
      }
    ];

    for (const courseData of courses) {
      const existingCourse = await Course.findOne({ slug: courseData.slug });
      if (!existingCourse) {
        const course = new Course(courseData);
        await course.save();
        console.log(`Course "${course.title}" created`);
      }
    }

    console.log('Seeding completed');
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
};

seedData();