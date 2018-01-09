const request = require('supertest');
const app = require('../../app');

describe('Validating user API', () =>{
    test('It should return status 200 and "respo"', () =>{
        return request(app).get('/users').then((response) => {
            expect(response.statusCode).toBe(200);
            expect(response.text).toBe('response from user API');
        });
    });
});