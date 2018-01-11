'use strict'

const { Router } = require('express')
const { actions } = require('./actions')

module.exports = Router()
  .post('/', actions.create)
  .get('/', actions.getAll)
  .get('/:id', actions.getById)