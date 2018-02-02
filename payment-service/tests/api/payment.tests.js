const request = require('supertest')
const app = require('../../app');

describe('/payment', () => {
    describe('POST /payment', () => {
        test('create new payment with information correctly', async () => {
            //         //         var payment = {
            //         //             orderId: '5a6b8e3c9d9564be889eefd9',
            //         //             date: new Date(),
            //         //             status: 'initiated',
            //         //             creditCard: '1234 4657 4567 7897'
            //         //         };
            //         //         var response = await request(app).post('/payment').expect(200, {

            //         //         })
        })
    });

    describe('GET /payment', () => {
        test('Validation required authentication', async () => {
            //     //         var response = await request(app).get('/payment')
            //     //         expect(response.statusCode).toBe(404)
            //     //         expect(response.text).toBe("{\"error\":\"Not found\",\"message\":\"Cannot GET /\"}")
            //     //     })
        });
    });
});