const request = require('supertest');
const app = require('./src/server');

describe('API Tests', () => {
  it('should return health check', async () => {
    const res = await request(app).get('/api/health');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('status', 'OK');
  });

  it('should get courses', async () => {
    const res = await request(app).get('/api/courses');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});