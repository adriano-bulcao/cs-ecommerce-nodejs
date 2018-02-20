const rabbit = require('rabbot');
const Rx = require('rx');
var subject = subject || (subject = new Rx.Subject());
rabbit.handle("", (message) => {
    try {
        // do something meaningful? 
        let msg = message.body.toString('utf8');
        subject.onNext(msg);
        message.ack();
    } catch (err) {
        console.log(err);
        message.nack();
    }
}, 'checkout.accepted.user-service');

module.exports = subject.map(JSON.parse)
    .timeout(120000, new Error('Timeout has occurred.'));