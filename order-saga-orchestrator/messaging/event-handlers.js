const orderSagaOrchestrator = require('./order-saga-orchestrator')
const saga = new orderSagaOrchestrator();


const factory = events => ({
    orderCreated: (message) => {
        return new Promise((resolve, reject) => {
            resolve();
            saga.createOrder(message);
        });
    },
})

exports.factory = factory;
exports.events = factory();

