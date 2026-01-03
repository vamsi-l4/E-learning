require('dotenv').config();
const mongoose = require('mongoose');
const Course = require('./models/Course');
const Enrollment = require('./models/Enrollment');

const sampleCourses = [
  {
    title: "React Basics: Build Your First App",
    slug: "react-basics-build-your-first-app",
    description: "Learn React fundamentals including components, props, state, and hooks. Perfect for beginners entering web development.",
    price: 49.99,
    category: "Web Development",
    difficulty: "beginner",
    thumbnailUrl: "https://i.ytimg.com/vi/x4rFhThSX04/maxresdefault.jpg",
    lessons: [
      {
        title: "Introduction to React",
        contentHtml: "<h2>Welcome to React</h2><p>React is a JavaScript library for building user interfaces with reusable components. Learn the basics and build your first component.</p>",
        videoUrl: "https://www.youtube.com/watch?v=x4rFhThSX04",
        order: 1
      },
      {
        title: "Components and Props",
        contentHtml: "<h2>Components & Props</h2><p>Components are the building blocks of React applications. Learn functional and class components, and how to pass data through props.</p>",
        videoUrl: "https://www.youtube.com/watch?v=x4rFhThSX04&t=2400",
        order: 2
      },
      {
        title: "State and Hooks",
        contentHtml: "<h2>Managing State with Hooks</h2><p>Use useState and other hooks to manage component state effectively. Learn about useEffect, useContext, and useRef.</p>",
        videoUrl: "https://www.youtube.com/watch?v=x4rFhThSX04&t=4800",
        order: 3
      }
    ]
  },
  {
    title: "Advanced JavaScript: Master ES6+",
    slug: "advanced-javascript-master-es6",
    description: "Deep dive into modern JavaScript with ES6+, async/await, promises, and advanced patterns. For experienced developers.",
    price: 79.99,
    category: "Web Development",
    difficulty: "advanced",
    thumbnailUrl: "https://i.ytimg.com/vi/YwsOCN8woA8/maxresdefault.jpg",
    lessons: [
      {
        title: "ES6 Destructuring and Spread Operator",
        contentHtml: "<h2>Modern Syntax</h2><p>Learn destructuring and spread operator for cleaner code. Master const/let, arrow functions, and template literals.</p>",
        videoUrl: "https://www.youtube.com/watch?v=YwsOCN8woA8",
        order: 1
      },
      {
        title: "Promises and Async/Await",
        contentHtml: "<h2>Asynchronous JavaScript</h2><p>Master async programming patterns with promises and async/await. Handle errors and chain operations effectively.</p>",
        videoUrl: "https://www.youtube.com/watch?v=YwsOCN8woA8&t=3600",
        order: 2
      },
      {
        title: "Closures and Scope",
        contentHtml: "<h2>JavaScript Scope & Closures</h2><p>Understand closures, lexical scope, and scope chain in depth. Master higher-order functions and callbacks.</p>",
        videoUrl: "https://www.youtube.com/watch?v=YwsOCN8woA8&t=7200",
        order: 3
      }
    ]
  },
  {
    title: "Full Stack Web Development Masterclass",
    slug: "full-stack-web-development-masterclass",
    description: "Complete full-stack development course covering frontend, backend, databases, and deployment. Build production-ready apps.",
    price: 129.99,
    category: "Web Development",
    difficulty: "intermediate",
    thumbnailUrl: "https://i.ytimg.com/vi/TtPXvEcE11E/maxresdefault.jpg",
    lessons: [
      {
        title: "Frontend Architecture with React",
        contentHtml: "<h2>Frontend Setup</h2><p>Set up React with Vite, configure routing with React Router, and structure your project following modern best practices.</p>",
        videoUrl: "https://www.youtube.com/watch?v=TtPXvEcE11E",
        order: 1
      },
      {
        title: "Backend with Node.js and Express",
        contentHtml: "<h2>Node.js Backend</h2><p>Build RESTful APIs with Express, handle requests, implement middleware, and manage error handling in production.</p>",
        videoUrl: "https://www.youtube.com/watch?v=P5q8rUGCN9k",
        order: 2
      },
      {
        title: "Database Design with MongoDB",
        contentHtml: "<h2>MongoDB Basics</h2><p>Design schemas, create indexes, and optimize queries in MongoDB. Learn about relationships and data modeling.</p>",
        videoUrl: "https://www.youtube.com/watch?v=pKd0Rpw7O48",
        order: 3
      }
    ]
  },
  {
    title: "Data Science Fundamentals",
    slug: "data-science-fundamentals",
    description: "Introduction to data science with Python, pandas, NumPy, and Matplotlib. Perfect for beginners wanting to enter data science.",
    price: 59.99,
    category: "Data Science",
    difficulty: "beginner",
    thumbnailUrl: "https://i.ytimg.com/vi/LHBE6Q9XlzI/maxresdefault.jpg",
    lessons: [
      {
        title: "Python for Data Analysis",
        contentHtml: "<h2>Python Basics for Data</h2><p>Introduction to Python libraries essential for data science work. Master NumPy arrays and basic operations.</p>",
        videoUrl: "https://www.youtube.com/watch?v=LHBE6Q9XlzI",
        order: 1
      },
      {
        title: "Working with Pandas",
        contentHtml: "<h2>Pandas Library</h2><p>Load, clean, and manipulate datasets using pandas DataFrames. Learn groupby, merging, and data exploration techniques.</p>",
        videoUrl: "https://www.youtube.com/watch?v=LHBE6Q9XlzI&t=3600",
        order: 2
      },
      {
        title: "Data Visualization with Matplotlib",
        contentHtml: "<h2>Visualization Techniques</h2><p>Create meaningful charts and graphs to communicate data insights. Master line plots, histograms, scatter plots, and more.</p>",
        videoUrl: "https://www.youtube.com/watch?v=LHBE6Q9XlzI&t=7200",
        order: 3
      }
    ]
  },
  {
    title: "Machine Learning with Python",
    slug: "machine-learning-with-python",
    description: "Build, train, and deploy machine learning models using scikit-learn and TensorFlow. From theory to practice.",
    price: 99.99,
    category: "Data Science",
    difficulty: "advanced",
    thumbnailUrl: "https://i.ytimg.com/vi/tPYj3fFJGjk/maxresdefault.jpg",
    lessons: [
      {
        title: "ML Fundamentals",
        contentHtml: "<h2>Machine Learning Basics</h2><p>Understand supervised learning, unsupervised learning, and key ML concepts. Learn about training/testing splits and model evaluation.</p>",
        videoUrl: "https://www.youtube.com/watch?v=tPYj3fFJGjk",
        order: 1
      },
      {
        title: "Scikit-Learn for Classification",
        contentHtml: "<h2>Classification Models</h2><p>Build and evaluate classification models using scikit-learn. Learn about decision trees, random forests, and SVM.</p>",
        videoUrl: "https://www.youtube.com/watch?v=tPYj3fFJGjk&t=2700",
        order: 2
      },
      {
        title: "Deep Learning with TensorFlow",
        contentHtml: "<h2>Neural Networks</h2><p>Create neural networks and train deep learning models with TensorFlow. Learn about CNNs, RNNs, and model optimization.</p>",
        videoUrl: "https://www.youtube.com/watch?v=IzxwhvXv_9U",
        order: 3
      }
    ]
  },
  {
    title: "UI/UX Design Principles",
    slug: "ui-ux-design-principles",
    description: "Learn modern design principles, user research, wireframing, and prototyping. Create beautiful user experiences.",
    price: 69.99,
    category: "Design",
    difficulty: "beginner",
    thumbnailUrl: "https://i.ytimg.com/vi/maEf9uU-giA/maxresdefault.jpg",
    lessons: [
      {
        title: "Design Fundamentals",
        contentHtml: "<h2>Design Basics</h2><p>Color theory, typography, spacing, and layout principles for modern interfaces. Learn about visual hierarchy and balance.</p>",
        videoUrl: "https://www.youtube.com/watch?v=maEf9uU-giA",
        order: 1
      },
      {
        title: "User Research and Personas",
        contentHtml: "<h2>Understanding Users</h2><p>Conduct user research and create personas to design for real needs. Learn about empathy mapping and user journeys.</p>",
        videoUrl: "https://www.youtube.com/watch?v=c9Wg6Cb_YlU",
        order: 2
      },
      {
        title: "Prototyping with Figma",
        contentHtml: "<h2>Figma Prototyping</h2><p>Design interactive prototypes using Figma and test with users. Learn about components, variables, and design systems.</p>",
        videoUrl: "https://www.youtube.com/watch?v=BU_afT-aIn0",
        order: 3
      }
    ]
  }
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await Course.deleteMany({});
    await Enrollment.deleteMany({});
    console.log('🗑️ Cleared existing courses and enrollments');

    // Insert sample courses
    const courses = await Course.insertMany(sampleCourses);
    console.log(`✅ Inserted ${courses.length} courses successfully!`);

    // Display inserted courses
    courses.forEach((course) => {
      console.log(`   📚 ${course.title} ($${course.price}) - ${course.difficulty}`);
    });

    console.log('\n✨ Database seeded successfully!');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
    console.log('🔌 Database connection closed');
  }
};

seedDatabase();