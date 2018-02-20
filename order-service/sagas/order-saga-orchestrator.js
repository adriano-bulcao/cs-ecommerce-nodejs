const rabbit = require('rabbot');

class OrderSagaOrchestrator {
    constructor() {

    }

    createOrder(message) {
        console.log("Orchestrator");
        console.log(message);
        rabbit.publish("order.created",
            {
                body: { text: message },
            }
        );
    }
}

module.exports = OrderSagaOrchestrator;