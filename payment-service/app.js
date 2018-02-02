const express = require('express');
const bodyParser = require('body-parser');

const app = express();

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
