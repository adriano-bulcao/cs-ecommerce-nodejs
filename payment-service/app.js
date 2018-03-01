const express = require('express');
const bodyParser = require('body-parser');
const rabbit = require('./messaging/rabbit');

const app = express();
app.get('/hc', (req, res) => {
  res.status(200).send("ok");
});
app.use(bodyParser.json());
app.use('/', require('./api'));

app.use('/*', (request, response) => response
  .status(404)
  .json({ error: 'Not found', message: `Cannot ${request.method} ${request.url}` }));

app.use((error, request, response, next) => {
  console.error(error);
  response.status(500).json({
    error: 'Internal',
    message: error.message,
  });

  next();
});

module.exports = app;
