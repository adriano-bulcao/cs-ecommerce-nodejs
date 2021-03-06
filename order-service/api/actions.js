

const Joi = require('joi');
const { repository } = require('./repository');
const { schema } = require('./model');

const factory = rep => ({

  getAll: async (request, response, next) => {
    try {
      const orders = await rep.getAll();
      response.status(200).json(orders);
    } catch (error) {
      next(error);
    }
  },

  getById: async (request, response, next) => {
    try {
      const orderId = request.params.id;
      const order = await rep.getById(orderId);
      if (!order) {
        response.status(404).send();
        return;
      }
      response.status(200).json(order);
    } catch (error) {
      next(error);
    }
  },

  create: async (request, response, next) => {
    try {
      const order = request.body;
      order.date = new Date();
      let total = 0;

      if (!order.items) order.items = [];

      order.items.forEach((product) => {
        const subtotal = product.price * product.quantity;
        total += subtotal;
      });
      order.total = total;

      const validation = Joi.validate(order, schema);

      if (validation.error) {
        response.status(400).json(validation.error.details);
        return;
      }

      await rep.create(request.body);

      response.status(201).send();
    } catch (error) {
      next(error);
    }
  },


});

exports.factory = factory;
exports.actions = factory(repository);
