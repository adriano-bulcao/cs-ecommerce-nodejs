module.exports = {
  connection: {
    name: 'default',
    user: 'user',
    pass: 'password',
    host: 'rabbitmq',
    port: 5672,
    vhost: '%2f',
  },
  queues: [
    {
      name: 'order.queue',
      autoDelete: false,
      subscribe: true,
      exclusive: false,
      arguments: { 'x-queue-mode': 'lazy' },
    },
  ],
  exchanges: [{
    name: 'order.exchange', type: 'fanout', autoDelete: false, durable: false,
  }],
  bindings: [
    { exchange: 'stock.exchange', target: 'order.queue', keys: [] },
    { exchange: 'payment.exchange', target: 'order.queue', keys: [] },
  ],
};
