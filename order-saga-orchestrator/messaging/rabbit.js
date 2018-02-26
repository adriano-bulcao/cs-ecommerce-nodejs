const settings = require('./rabbit-topology');
const rabbit = require('rabbot');
const eventHandlers = require('./event-handlers');

var _started = false;
class Rabbit {
    static start() {
        rabbit.configure(settings).then(() => 
        {
            console.log('connected!')
        });
        _started = true;
        return this;
    }
    static addHandler(queue,type, callback) {
        rabbit.handle(type, (message) => {
            try {
                // do something meaningful? 
                let msg = message.body;
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
  .addHandler('order.queue','stock.reserved',(message) => {
    return new Promise((resolve, reject) => {
        console.log(message);
        resolve();
        
    });
  })
  .addHandler('order.queue','stock.failed',(message) => {
    return new Promise((resolve, reject) => {
        console.log(message);
        resolve();
        
    });
  })

module.exports = Rabbit;