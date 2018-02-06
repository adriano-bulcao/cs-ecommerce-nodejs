const { database } = require('../../helpers/db')
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

    test('It should GET response from /users and login a user.', async () => {
        var response = await request(app).get('/users').query({
            username: 'gustavo',
            password: '123456'
        })
        expect(response.statusCode).toBe(200)
        expect(response.body.success).toBe(true)
        expect(response.body.message).toBe('')
    })

    test('It should GET response from /users with wrong user.', async () => {
        var response = await request(app).get('/users').query({
            username: 'gustavo1',
            password: '123'
        })
        expect(response.statusCode).toBe(200)
        expect(response.body.success).toBe(false)
        expect(response.body.message).toBe('Authentication failed. Wrong User.')
        expect(response.body.data).toBeNull()
    })

    test('It should GET response from /users with wrong password.', async () => {
        var response = await request(app).get('/users').query({
            username: 'gustavo',
            password: '1234'
        })
        expect(response.statusCode).toBe(200)
        expect(response.body.success).toBe(false)
        expect(response.body.message).toBe('Authentication failed. Wrong Password.')
        expect(response.body.data).toBeNull()
    })

    test('It should PUT response from /users and update a user.', async () => {
        var response = await request(app).put('/users/5a78a762c219a5245cb12d36').send({
            username: 'gustavo',
            email: 'gustavo.segantini@concrete.com.br',
            password: '123456',
        })

        expect(response.statusCode).toBe(200)
        expect(response.body.success).toBe(true)
        expect(response.body.message).toBe('User Was Updated.')
        expect(response.body.data).toBeNull()
    })

    test('It should PUT response from /users with wrong user.', async () => {
        var response = await request(app).put('/users/5a78a762c219a5245cb12d35').send({
            username: 'gustavo',
            email: 'gustavo.segantini@concrete.com.br',
            password: '123456',
        })

        expect(response.statusCode).toBe(200)
        expect(response.body.success).toBe(false)
        expect(response.body.message).toBe('User Was Not Updated.')
        expect(response.body.data).toBeNull()
    })

    test('It should POST response from /users and create a user.', async () => {
        var response = await request(app).post('/users').send({
            username: 'gustavo1',
            email: 'gustavo1.segantini1@concrete.com.br',
            password: '123',
        })

        expect(response.statusCode).toBe(201)
        expect(response.body.success).toBe(true)
        expect(response.body.message).toBe('')
        expect(response.body.data).not.toBeNull()
    })

    test('It should DELETE response from /users and delete a user.', async () => {
        var response = await request(app).delete('/users').send({
            username: 'gustavo1',
            email: 'gustavo1.segantini1@concrete.com.br',
            password: '123',
        })

        expect(response.statusCode).toBe(200)

        expect(response.body.success).toBe(true)
        expect(response.body.message).toBe('User Was Deleted')
        expect(response.body.data).toBeNull()
    })

    test('It should DELETE response from /users with user not found', async () => {
        var response = await request(app).delete('/users').send({
            username: 'gustavo12',
            email: 'gustavo12.segantini12@concrete.com.br',
            password: '123',
        })

        expect(response.statusCode).toBe(200)
        expect(response.body.success).toBe(false)
        expect(response.body.message).toBe('User Was Not Deleted.')
        expect(response.body.data).toBeNull()
    })

    test('It should GET response from /users with wrong model', async () => {
        var response = await request(app).get('/users').query({})

        expect(response.statusCode).toBe(500)
        expect(response.body.success).toBe(false)
        expect(response.body.message).toBe('child \"username\" fails because [\"username\" is required]')
        expect(response.body.data).toBeNull()
    })

    test('It should PUT response from /users with wrong model.', async () => {
        var response = await request(app).put('/users/5a7363f24b516b3ae0093d69').send({})

        expect(response.statusCode).toBe(500)
        expect(response.body.success).toBe(false)
        expect(response.body.message).toBe('child \"username\" fails because [\"username\" is required]')
        expect(response.body.data).toBeNull()
    })

    test('It should POST response from /users with wrong model.', async () => {
        var response = await request(app).post('/users').send({})

        expect(response.statusCode).toBe(500)
        expect(response.body.success).toBe(false)
        expect(response.body.message).toBe('child \"username\" fails because [\"username\" is required]')
        expect(response.body.data).toBeNull()
    })

    test('It should DELETE response from /users with wrong model.', async () => {
        var response = await request(app).delete('/users').send({})

        expect(response.statusCode).toBe(500)
        expect(response.body.success).toBe(false)
        expect(response.body.message).toBe('child \"username\" fails because [\"username\" is required]')
        expect(response.body.data).toBeNull()
    })
})