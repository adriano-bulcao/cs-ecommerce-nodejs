const settings = require('./rabbit-topology');
const rabbit = require('rabbot');

class Rabbit {
  static start() {
    rabbit.configure(settings).then(() => {
      console.log('connected!');
    });

    return this;
  }
  static addHandler(queue, type, callback) {
    rabbit.handle(
      type,
      (message) => {
        try {
          // do something meaningful?
          const msg = message.body;
          callback(msg)
            .then(message.ack())
            .catch(message.nack());
        } catch (err) {
          console.log(err);
          message.nack();
        }
      },
      queue,
    );
    return this;
  }
}

Rabbit.start()
  .addHandler(
    'order.queue',
    'stock.reserved',
    message =>
      new Promise((resolve, reject) => {
        try {
          console.log(message);
          resolve();
        } catch (error) {
          reject(error);
        }
      }),
  )
  .addHandler(
    'order.queue',
    'stock.failed',
    message =>
      new Promise((resolve, reject) => {
        try {
          console.log(message);
          resolve();
        } catch (error) {
          reject(error);
        }
      }),
  )
  .addHandler(
    'order.queue',
    'payment.completed',
    message =>
      new Promise((resolve, reject) => {
        try {
          console.log(message);
          resolve();
        } catch (error) {
          reject(error);
        }
      }),
  );

module.exports = Rabbit;
