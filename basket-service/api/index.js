'use strict'

const { Router } = require('express');
const { actions } = require('./actions');

module.exports = Router()
    .post('/basket', actions.create)
    .get('/basket/:basketid', actions.basketVerification, actions.getById)
    .put('/basket/:basketid/item', actions.basketVerification, actions.itemAlreadyAddedVerification, actions.addItem)
    .put('/basket/:basketid/item/:itemid', actions.basketVerification, actions.itemExistenceVerification, actions.updateQuantity)
    .delete('/basket/:basketid/item/:itemid', actions.basketVerification, actions.itemExistenceVerification, actions.removeItem)
    .post('/basket/:basketid/checkout', actions.basketVerification, actions.checkout)