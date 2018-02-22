const settings = require('./rabbit-topology');
const rabbit = require('rabbot');
var _started = false;
class Rabbit {
    static start() {
        rabbit.configure(settings).then(() => console.log('connected!'));
        _started = true;
        return this;
    }
    static addHandler(queue, callback) {
        rabbit.handle("", (message) => {
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

module.exports = Rabbit;