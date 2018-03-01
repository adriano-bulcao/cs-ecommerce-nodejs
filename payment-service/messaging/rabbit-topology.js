module.exports = {
    connection: {
        name: 'default',
        user: 'user',
        pass: 'password',
        host: 'rabbitmq',
        port: 5672,
        vhost: '%2f'
    },
    queues: [
        {
            name: 'payment.queue', autoDelete: false, subscribe: true,
            exclusive: false, arguments: { 'x-queue-mode': 'lazy' }
        }
    ],
    exchanges: [
        { name: 'payment.exchange', type: 'fanout', autoDelete: false, durable: false }
    ]
    ,
    bindings: [
      { exchange: 'order.exchange', target: 'payment.queue', keys: [] }
    ]
}
