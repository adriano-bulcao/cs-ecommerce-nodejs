'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const logger = require('morgan')
const rabbit = require('./messaging/rabbit');

const app = express()
app.get('/hc', (req, res) => {
  res.status(200).send("ok");
});
app.use(logger('dev'))
app.use(bodyParser.json())
app.use('/stock', require('./api'))

app.use('/*', (request, response) =>
  response.status(404).json({
    error: 'Not found',
    message: `Cannot ${request.method} ${request.url}` }))

app.use((err, request, response, next) => {
  console.log(err)
  response.status(500).json({
    error: 'internal', message: err.message
  })
})

module.exports = app