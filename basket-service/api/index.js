'use strict'

const { Router } = require('express');
const { actions } = require('./actions');

module.exports = Router()
    .get('/basket/:id', actions.getById)
    .post('/basket', actions.create)
    .put('/basket/:basketid/item', actions.addItem)
    .put('/basket/:basketid/item/:itemid', actions.updateQuantity) //mandar a quantidade no body
    .delete('basket/:basketid/item/:itemid', actions.removeItem)
    .post('/basket/:basketid/checkout', actions.checkout)