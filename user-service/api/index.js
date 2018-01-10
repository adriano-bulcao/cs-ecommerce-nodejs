'use strict'

const { Router } = require('express')
const { actions } = require('./actions')

module.exports = Router()
  .get('/', actions.retrieve)
  .post('/', actions.create)
  .get('/:id', actions.getById)