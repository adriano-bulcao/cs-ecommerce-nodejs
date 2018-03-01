class OrderSagaOrchestrator {
  static orderCreated(message) {
    console.log('Orchestrator - order Created');
    console.log(message);
  }
}

module.exports = OrderSagaOrchestrator;
