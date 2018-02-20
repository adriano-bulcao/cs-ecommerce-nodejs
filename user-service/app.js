

const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
var addRequestId = require('express-request-id')();
const rabbit = require('./rabbit');
const checkout = require('./event/checkoutAcceptedEventHandler');
const app = express();
rabbit.start();
app.use(addRequestId);
app.get('/hc', (req, res) => {
  res.status(200).send("ok");
});

app.get('/checkout', async (req, res, next) => {
  console.log(req.id);
  var subscription = checkout.filter(it => req.id == it.id).subscribe(x => {
    subscription.dispose();
    console.log("order created! " + x)
    res.status(200).send("order created! " + x);
  },
    (err) => {
      res.status(500).send("order created! " + err);
      console.log('Error: ' + err);
    }
  );
});

app.use(logger('dev'));
app.use(bodyParser.json());
app.use('/users', require('./api'));

app.use('/*', (request, response) =>
  response.status(404).json({
    success: false,
    message: `Cannot ${request.method} ${request.url}`,
    data: null,
  }));

app.use((err, request, response, next) => {
  response.status(500).json({
    success: false,
    message: err.message,
    data: null,
  });
  next();
});

module.exports = app;
