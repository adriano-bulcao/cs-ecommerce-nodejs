const { Router } = require('express');
const { actions } = require('./actions');

module.exports = Router()
    .get('/payment/:id', actions.getById)
    .post('/payment', actions.create);



