const {
    database
} = require('../../helpers/db')
const request = require('supertest')
const app = require('../../app')
const env = require('../../helpers/env')


describe('Validating user API', () => {

    beforeAll((done) => {
        database.connect(env.db.url, env.db.nametest)
            .then(() => done())
            .catch(console.error)
    })

    afterAll((done) => {
        database.disconnect()
            .then(() => done())
            .catch(console.error)
    })

    test('It should GET response from /users that performs async operation.', async () => {
        var response = await request(app).get('/users').query({
            username: 'gustavo',
            password: '123'
        })
        expect(response.statusCode).toBe(200)
        expect(response.body.success).toBe(true)
        expect(response.body.message).toBe('')
    })

    test('It should POST response from /users that performs async operation.', async () => {
        var response = await request(app).post('/users').send({
            username: 'gustavo1',
            email: 'gustavo1.segantini1@concrete.com.br',
            password: '123',
        })

        expect(response.statusCode).toBe(201);
        
    })

    test('It should DELETE response from /users that performs async operation.', async () => {
        var response = await request(app).delete('/users/gustavo1')
        expect(response.statusCode).toBe(200)

        expect(response.body.success).toBe(true)
        expect(response.body.message).toBe('User Was Deleted')
        expect(response.body.data).toBe(null)
    })
})