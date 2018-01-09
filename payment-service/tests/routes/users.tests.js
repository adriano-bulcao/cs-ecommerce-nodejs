const request = require('supertest');
const app = require('../../app');

describe('Testing Users API', () =>{
    test('It should GET a string from /users', async () => {
        var response = await request(app).get('/users');
        expect(response.statusCode).toBe(200);
        expect(response.text).toBe('respond with a resource');
    });
});