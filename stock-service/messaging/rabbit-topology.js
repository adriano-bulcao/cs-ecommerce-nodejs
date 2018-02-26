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
            name: 'stock.queue', autoDelete: false, subscribe: true,
            exclusive: false, arguments: { 'x-queue-mode': 'lazy' }
        }
    ],
    exchanges: [
        { name: 'stock.exchange', type: 'fanout', autoDelete: false, durable: false }
    ]
    ,
    bindings: [
      { exchange: 'order.exchange', target: 'stock.queue', keys: [] }
    ]
}