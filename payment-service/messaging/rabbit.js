const settings = require('./rabbit-topology');
const rabbit = require('rabbot');
const eventHandlers = require('./event-handlers');

var _started = false;
class Rabbit {
    static start() {
        rabbit.configure(settings).then(() => {
            console.log('connected to Rabbit!')
        });
        _started = true;
        return this;
    }
    static addHandler(queue, type, callback) {
        console.log("Handler added to " + queue + " and type " + type)
        rabbit.handle(type, (message) => {
            try {
                // do something meaningful? 
                let msg = message.body.toString('utf8');
                callback(msg).then(it => message.ack())
                    .catch(it => message.nack());
            } catch (err) {
                console.log(err);
                message.nack();
            }
        }, queue);
        return this;
    }
}


Rabbit.start()
    .addHandler("payment.queue", "order.created", (message) => {
        return new Promise((resolve, reject) => {
            console.log("Payment completed.")
            rabbit.publish("payment.exchange", "payment.completed",
                {
                    body: { text: "Payment Completed" },
                }
            )
            resolve();
        });
    });


module.exports = Rabbit;