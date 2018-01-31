const { Router } = require('express');
const { actions } = require('./actions');


module.exports = Router()
  .get('/:id', actions.getById)
  .post('/', actions.create)
  .put('/', actions.update)
