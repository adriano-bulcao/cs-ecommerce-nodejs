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
        { name: 'checkout.accepted', type: 'fanout', autoDelete: false, durable: false }
    ],
    queues: [
        {
            name: 'checkout.accepted.user-service', autoDelete: false, subscribe: true,
            exclusive: false, arguments: { 'x-queue-mode': 'lazy' }
        },
    ],
    bindings: [
        { exchange: 'checkout.accepted', target: 'checkout.accepted.user-service', keys: [] }
    ]
}