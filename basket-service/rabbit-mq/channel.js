var amqp = require('amqplib/callback_api');

var url = process.env.AMQP_URL || 'amqp://user:password@rabbitmq';

module.exports = createQueueChannel;

function createQueueChannel(exchange, queue, cb) {  
  amqp.connect(url, onceConnected);

function onceConnected(err, conn) {  

  if (err) {
    console.error('Error connecting:', err.stack);
  }
  else {
    console.log('connected');
    conn.createChannel(onceChannelCreated);
  }
        function onceChannelCreated(err, channel) {  
        if (err) {
            cb(err);
        }
        else {
            channel.assertExchange(exchange, 'fanout', { durable: false });
            channel.assertQueue(queue, {durable: true}, onceQueueCreated);
            channel.bindQueue(queue.queue, exchange, '');
        }

        function onceQueueCreated(err) {
            if (err) {
            cb(err);
            }
            else {
            cb(null, channel, conn);
            }
        }
        }
    }
}
