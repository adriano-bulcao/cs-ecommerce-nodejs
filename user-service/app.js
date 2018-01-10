'use strict'

const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())
app.use('/users', require('./api'))

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