
const env = require('./helpers/env');
const serviceName = env.app.serviceName;

const healthCheck = (app) => {
    var consul = require('consul')({
        host: "consul",
    });
    consul.agent.service.deregister(serviceName, function (err) {
        if (err) throw err;
    });
    consul.agent.service.register({
        name: serviceName,
        address: serviceName,
        port: Number(env.app.port),
        check: {
            http: `http://${serviceName}:${env.app.port}/hc`,
            interval: '10s'
        }
    }, function (err) {
        if (err) throw err;
    });
    process.on('exit', function () {
        consul.agent.service.deregister(serviceName, function (err) {
            if (err) throw err;
        });
    });
}
module.exports = healthCheck;