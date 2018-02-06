const { Router } = require('express');
const { actions } = require('./actions');

module.exports = Router()
  .get('/', actions.signin)
  .post('/', actions.create)
  .put('/:id', actions.update)
  .delete('/', actions.delete);
