const env = require('./helpers/env');

const serviceName = env.app.serviceName;

const healthCheck = (app) => {
  const consul = require('consul')({
    host: 'consul',
  });
  consul.agent.service.deregister(serviceName, (err) => {
    if (err) throw err;
  });
  consul.agent.service.register(
    {
      name: serviceName,
      address: serviceName,
      port: Number(env.app.port),
      check: {
        http: `http://${serviceName}:${env.app.port}/hc`,
        interval: '10s',
      },
    },
    (err) => {
      if (err) throw err;
    },
  );
  process.on('exit', () => {
    consul.agent.service.deregister(serviceName, (err) => {
      if (err) throw err;
    });
  });
};
module.exports = healthCheck;
