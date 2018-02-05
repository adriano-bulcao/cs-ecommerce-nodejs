const request = require('supertest')
const app = require('../app');

describe('App', () => {
    test('Should return 404 when route invalid', async () => {
        var response = await request(app).get('/')
        expect(response.statusCode).toBe(404)
        expect(response.text).toBe("{\"error\":\"Not found\",\"message\":\"Cannot GET /\"}")
    })
});