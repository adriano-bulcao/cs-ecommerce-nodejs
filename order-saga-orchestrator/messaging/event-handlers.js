const OrderSagaOrchestrator = require('./order-saga-orchestrator');

const saga = new OrderSagaOrchestrator();

const factory = {
  orderCreated: message =>
    new Promise((resolve, reject) => {
      try {
        resolve();
        saga.createOrder(message);
      } catch (error) {
        throw reject(error);
      }
    }),
};

exports.factory = factory;
exports.events = factory();
