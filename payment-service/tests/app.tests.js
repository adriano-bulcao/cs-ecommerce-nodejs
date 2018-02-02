const request = require('supertest')
const app = require('../app');

describe('', () => {
    test('Validate main endpoint', async () => {
        var response = await request(app).get('/')
        expect(response.statusCode).toBe(404)
        expect(response.text).toBe("{\"error\":\"Not found\",\"message\":\"Cannot GET /\"}")
    })
});