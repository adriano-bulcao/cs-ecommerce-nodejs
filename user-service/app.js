

const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');

const app = express();
app.get('/hc', (req, res) => {
  res.status(200).send("ok");
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
