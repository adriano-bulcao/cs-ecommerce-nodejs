const orderSagaOrchestrator = require('../sagas/order-saga-orchestrator')
//const Rx = require('rx');

// module.exports = subject.map(JSON.parse)
//     .timeout(120000, new Error('Timeout has occurred.'));
module.exports = (message) => {
    const saga = new orderSagaOrchestrator();
    return new Promise((resolve, reject) => {
        resolve();
        saga.createOrder(message);
    });
}