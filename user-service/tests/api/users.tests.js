const { database } = require('../../helpers/db')
const request = require('supertest')
const app = require('../../app')
const env = require('../../helpers/env')


describe('Validating user API', () => {

    beforeAll((done) => {
        database.connect(env.db.url, env.db.name)
            .then(() => done())
            .catch(console.error)
    })

    afterAll((done) => {
        database.disconnect(true)
        .then(() => done())
        .catch(console.error)
    })

    test('It should GET response from /users that performs async operation.', async() => {
        var response = await request(app).get('/users').query({
            username: 'gustavo',
            password: '123'
        })
        expect(response.statusCode).toBe(200)
        expect(response.text).toBe('{\"success\":true,\"message\":\"\",\"data\":{\"email\":\"gustavo.segantini@concrete.com.br\",\"username\":\"gustavo\",\"_id\":\"5a5e38ed31b6bf36043aebc1\"}}')
    })
})