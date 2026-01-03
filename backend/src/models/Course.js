const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  contentHtml: {
    type: String,
    required: true
  },
  videoUrl: {
    type: String
  },
  order: {
    type: Number,
    required: true
  }
});

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  category: {
    type: String,
    required: true
  },
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    required: true
  },
  thumbnailUrl: {
    type: String
  },
  lessons: [lessonSchema],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Course', courseSchema);