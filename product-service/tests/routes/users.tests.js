const request = require('supertest');
const app = require('../../app');

describe('Validating user API', () => {
    
    test('It should GET response from /users that performs async operation.', async () => {
        var response = await request(app).get('/users');
        expect(response.statusCode).toBe(200);
        expect(response.text).toBe('respond with a resource');
    });
});