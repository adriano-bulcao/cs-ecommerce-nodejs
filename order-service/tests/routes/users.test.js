const request = require('supertest');
const app = require('../../app');

describe('Validating user API', () =>{
    test('GET should be xablau', () =>{
        return request(app).get('/users').then((response) => {
            expect(response.statusCode).toBe(200);
            expect(response.text).toBe('respond with a resource');
        });
    });
});