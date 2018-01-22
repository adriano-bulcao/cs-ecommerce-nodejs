'use strict'

const { Router } = require('express');
const { actions } = require('./actions');

module.exports = Router()
    .get('/basket/:id', actions.getById)
    .post('/basket', actions.create)
    .put('/basket/:id/item', actions.addItem)
    .put('/basket/:basketid/item/:itemid', actions.updateQuantity)
    .delete('/basket/:basketid/item/:itemid', actions.removeItem)
    .post('/basket/:basketid/checkout', actions.checkout)