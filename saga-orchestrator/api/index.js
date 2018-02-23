const { Router } = require('express');
const { actions } = require('./actions');

module.exports = Router()
  .get('/saga', actions.getAll)
  .get('/saga/:id', actions.getById)
  .post('/saga', actions.create);
