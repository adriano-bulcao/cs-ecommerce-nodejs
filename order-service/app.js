const express = require('express');
const bodyParser = require('body-parser');
const rabbit = require('./rabbit');
const checkoutAcceptedEventHandler = require('./event-handlers/checkout-accepted-event-handler');
const app = express();
const logger = console;

rabbit.start()
  .addHandler('checkout.accepted.order-service', checkoutAcceptedEventHandler)
  .addHandler('order.created.order-service', (message) => {
    return new Promise((resolve, reject) => {
      resolve();
      logger.log("order created accepted" + message);
    });
  });

app.get('/hc', (req, res) => {
  res.status(200).send("ok");
});

app.use(bodyParser.json());
app.use('/', require('./api'));

app.use('/*', (request, response) => response
  .status(404)
  .json({ error: 'Not found', message: `Cannot ${request.method} ${request.url}` }));

app.use((error, request, response, next) => {
  logger.error(error);
  response.status(500).json({
    error: 'Internal',
    message: error.message,
  });

  next();
});

module.exports = app;
