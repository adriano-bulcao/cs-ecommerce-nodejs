'use strict'

const { Router } = require('express');
const { actions } = require('./actions');

module.exports = Router()
    .get('/orders', actions.getAll)
    .post('/orders', actions.create);

    
    