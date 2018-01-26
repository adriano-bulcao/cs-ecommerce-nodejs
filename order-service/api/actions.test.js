

const request = require('supertest');
const app = require('../app');
const { database } = require('../helpers/db');
const env = require('../helpers/env');
const { repository } = require('./repository');

const order = {
    customerId: 1,
    date: "2017-01-01",
    items: [
        {
            productId: 1,
            productName: "Some Product",
            price: 2.99,
            quantity: 3
        }
    ]
};


describe('Routes: Orders', () => {

    beforeAll((done) => initializeDatabase(done), 15000);

    describe('GET /orders', () => {

        test('Should return an array with expected order', async () => {
            const response = await request(app).get('/orders');
            let expectedArray = [];
            expectedArray.push(order);
            const orderResponse = response.body[0];
            expect(response.statusCode).toBe(200);
            expect(response.body).toHaveLength(1);
            expect(orderResponse.customerId).toEqual(1);
            expect(orderResponse.date).toEqual(order.date);
        }); 
    });

    describe('GET /orders/:id', () => {
        test('Should get order by id', async () => {
            const responseAll = await request(app).get('/orders');
            var orderResponse = responseAll.body[0];            
            const response = await request(app).get(`/orders/${orderResponse._id}`);
            expect(response.statusCode).toBe(200);
            expect(orderResponse.customerId).toEqual(1);
            expect(orderResponse.date).toEqual(order.date);
        });

        test('It should return 404 with id that does not exist', async () => {            
            const response = await request(app).get(`/orders/5a6b8e3c9d9564be889eefd9`);
            expect(response.statusCode).toBe(404);
            expect(response.body).toEqual({});
        });

    });

    afterAll((done) => clearDatabase(done));

});

function initializeDatabase(done) {
    database.connect(env.db.test.url, env.db.test.name)
        .then(() => createRegisters(done))
        .catch(console.error);
}

function createRegisters(done) {
    repository.create(order)
        .then(() => done())
        .catch(console.error);
}

function clearDatabase(done) {
    repository.remove()
        .then(() => done())
        .catch(console.error);
}