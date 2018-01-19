'use strict'

const { Router } = require('express');
const { actions } = require('./actions');

module.exports = Router()
    .get('/orders', actions.getAll)
    .get('/orders/:id', actions.getById)
    .post('/orders', actions.create);



    
    