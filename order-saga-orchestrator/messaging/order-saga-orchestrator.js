const rabbit = require('rabbot');

class OrderSagaOrchestrator {
    constructor() {

    }

    orderCreated(message) {
        console.log("Orchestrator - order Created");
        console.log(message);
       
    }
}

module.exports = OrderSagaOrchestrator;