module.exports = {
    connection: {
        name: 'default',
        user: 'user',
        pass: 'password',
        host: 'rabbitmq',
        port: 5672,
        vhost: '%2f',
        replyQueue: 'customReplyQueue'
    },
    exchanges: [
        { name: 'checkout.accepted', type: 'fanout', autoDelete: false, durable: false },
        { name: 'order.created', type: 'fanout', autoDelete: false, durable: false }
    ],
    queues: [
        {
            name: 'checkout.accepted.order-service', autoDelete: false, subscribe: true,
            exclusive: false, arguments: { 'x-queue-mode': 'lazy' }
        },
        {
            name: 'order.created.order-service', autoDelete: false, subscribe: true,
            exclusive: false, arguments: { 'x-queue-mode': 'lazy' }
        },
    ],
    bindings: [
        { exchange: 'checkout.accepted', target: 'checkout.accepted.order-service', keys: [] },
        { exchange: 'order.created', target: 'order.created.order-service', keys: [] }
    ]
}