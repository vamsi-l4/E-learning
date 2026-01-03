const request = require('supertest');
const app = require('../src/server');
const User = require('../src/models/User');
const mongoose = require('mongoose');

describe('Auth API', () => {
  beforeAll(async () => {
    // Connect to test database if needed
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/auth/signup')
      .send({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123'
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
  });

  it('should login existing user', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'test@example.com',
        password: 'password123'
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
  });
});