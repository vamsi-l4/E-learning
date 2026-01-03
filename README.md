# E-Learning Platform

A comprehensive e-learning platform built with React, Node.js, Express, and MongoDB.

## Features

- **User Authentication**: JWT-based authentication with signup/login
- **Course Management**: Browse, view, and enroll in courses
- **Progress Tracking**: Track lesson completion and progress
- **Admin Panel**: Create, edit, and delete courses; view users and reports
- **Responsive Design**: Mobile-friendly UI built with Tailwind CSS
- **RESTful API**: Well-structured backend API

## Tech Stack

### Frontend
- React 19 with Vite
- React Router for navigation
- Tailwind CSS for styling
- Axios for API calls
- Vitest for testing

### Backend
- Node.js with Express
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing
- Jest and Supertest for testing

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

### MongoDB Setup

#### Option 1: MongoDB Atlas (Cloud)
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Get your connection string from the "Connect" button
4. Update the `MONGO_URI` in `backend/.env` with your connection string

#### Option 2: Local MongoDB
1. Download MongoDB Community Server from [mongodb.com](https://www.mongodb.com/try/download/community)
2. Install and start MongoDB
3. Use `mongodb://localhost:27017/elearning` as your `MONGO_URI`

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd e-learning-platform
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Edit .env with your MongoDB URI and JWT secret
   npm run seed  # Seed sample data
   npm run dev   # Start development server
   ```

3. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   npm run dev  # Start development server
   ```

### Environment Variables

Create a `.env` file in the backend directory:

```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/elearning?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_here_change_this_in_production
PORT=5000
```

For frontend, create a `.env` file:

```env
VITE_API_URL=http://localhost:5000/api
```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Courses
- `GET /api/courses` - Get all courses (with filters)
- `GET /api/courses/:id` - Get course by ID
- `GET /api/courses/slug/:slug` - Get course by slug
- `POST /api/courses` - Create course (admin)
- `PUT /api/courses/:id` - Update course (admin)
- `DELETE /api/courses/:id` - Delete course (admin)

### Enrollments
- `POST /api/enrollments` - Enroll in course
- `GET /api/enrollments/me` - Get user's enrollments
- `PUT /api/enrollments/:id/progress` - Update progress

### Admin
- `GET /api/admin/users` - Get all users (admin)
- `GET /api/admin/reports` - Get reports (admin)

## Testing

### Backend Tests
```bash
cd backend
npm test
```

### Frontend Tests
```bash
cd frontend
npm test
```

## Deployment

### Backend (Render)
1. Connect GitHub repository
2. Set environment variables
3. Deploy

### Frontend (Vercel)
1. Connect GitHub repository
2. Set `VITE_API_URL` environment variable
3. Deploy

### Database (MongoDB Atlas)
1. Create cluster
2. Whitelist IP addresses
3. Get connection string

## Project Structure

```
e-learning-platform/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   └── server.js
│   ├── tests/
│   ├── .env
│   ├── package.json
│   └── seed.js
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── contexts/
    │   ├── pages/
    │   ├── utils/
    │   └── test/
    ├── public/
    ├── .env
    └── package.json
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## License

This project is licensed under the MIT License.