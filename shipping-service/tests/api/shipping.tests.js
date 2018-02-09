const request = require('supertest');
const app = require('../../app');
const { database } = require('../../helpers/db');
const env = require('../../helpers/env');
const { repository } = require('../../api/repository');
const ShippingStatus = require('../../models/shippingStatus')

const shipping = {
    orderId: "5865cf65321g",
    status: ShippingStatus.notStarted
};

describe('Routes: Shippings', () => {
    beforeAll((done) => initializeDatabase(done), 15000);

    // describe('GET /shippings', () => {

    //     test('Should return an array with expected shipping', async () => {
    //         const response = await request(app).get('/shippings');
    //         let expectedArray = [];
    //         expectedArray.push(shipping);
    //         const shippingResponse = response.body[0];
    //         expect(response.statusCode).toBe(200);
    //         expect(response.body).toHaveLength(1);
    //         expect(shippingResponse.customerId).toEqual(1);
    //         expect(shippingResponse.date).toEqual(shipping.date);
    //     });
    // });

    // describe('GET /shippings/:id', () => {

    //     test('Should get shipping by id', async () => {
    //         const responseAll = await request(app).get('/shippings');
    //         var shippingResponse = responseAll.body[0];
    //         const response = await request(app).get(`/shippings/${shippingResponse._id}`);
    //         expect(response.statusCode).toBe(200);
    //         expect(shippingResponse.customerId).toEqual(1);
    //         expect(shippingResponse.date).toEqual(shipping.date);
    //     });

    //     test('It should return 404 with id that does not exist', async () => {
    //         const response = await request(app).get(`/shippings/5a6b8e3c9d9564be889eefd9`);
    //         expect(response.statusCode).toBe(404);
    //         expect(response.body).toEqual({});
    //     });
    // });

    describe('POST /shippings', () => {
        test('It should create an shipping and return 201 status code', async () => {
            const fakeData = {
                "orderId": "5865cf65321g",
                "status": "10"
            }
            const response = await request(app).post('/shippings').send(fakeData);
            expect(response.status).toBe(201);
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
    repository.create(shipping)
        .then(() => done())
        .catch(console.error);
}

function clearDatabase(done) {
    repository.remove()
        .then(() => closeDatabase(done))
        .catch(console.error);
}

function closeDatabase(done) {
    database.disconnect();
    done();
}