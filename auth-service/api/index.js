'use strict'

const { Router } = require('express')
const { actions } = require('./actions')

module.exports = Router()
  .post('/', actions.signin)