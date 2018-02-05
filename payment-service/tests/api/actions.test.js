const { factory } = require('../../api/actions');
const sinon = require('sinon');

describe('Actions', () => {
    let repository = null, request = null, response = null, factoryActions = null;

    // beforeAll(() => {
    //     repository = {
    //         getById: sinon.stub().returns({}),
    //         create: sinon.stub().returns({})
    //     };
    //     response = {
    //         status: code => {
    //             return {
    //                 json: value => { },
    //                 send: () => { }
    //             }
    //         }
    //     };

    //     factoryActions = factory(repository);
    // });

    test('create new payment with information incorrectly', async () => {
        const payment = {
            orderId: '5a6b8e3c9d9564be889eefd9',
            date: new Date(),
            status: 'initiated',
            creditCard: '1234 4657 4567 7897'
        };
        request = { body: payment };

        factoryActions.create(request, response, error => { });
        expect(repository.create.calledWithMatch(payment));
    })

    // test('create new payment with information correctly', async () => {
    //     const payment = {
    //         orderId: '5a6b8e3c9d9564be889eefd9',
    //         date: new Date(),
    //         status: 'initiated',
    //         creditCard: '1234 4657 4567 7897'
    //     };
    //     request = { body: payment };

    //     factoryActions.create(request, response, error => { });
    //     expect(repository.create.calledWithMatch(payment));
    // })

    // test('getById', async () => {
    //     request = {
    //         params: {
    //             id: 1
    //         }
    //     };

    //     factoryActions.getById(request, response, error => { });
    //     expect(repository.getById.calledWithMatch(1));
    // })
});
