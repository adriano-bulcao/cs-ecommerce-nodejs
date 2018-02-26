const Joi = require('joi');
const { repository } = require('./repository');
const { schema } = require('./model');
const rabbit = require('rabbot');

const factory = rep => ({
  getAll: async (request, response, next) => {
    try {
      const transactions = await rep.getAll();
      response.status(200).json(transactions);
    } catch (error) {
      next(error);
    }
  },

  getById: async (request, response, next) => {
    try {
      const transactionId = request.params.id;
      const transaction = await rep.getById(transactionId);
      if (!transaction) {
        response.status(404).send();
        return;
      }
      response.status(200).json(transaction);
    } catch (error) {
      next(error);
    }
  },
  create: async (request, response, next) => {
    try {
      console.log(request.body)

      const validation = Joi.validate(request.body, schema);
      if (validation.error) {
        response.status(400).json(validation.error.details);
        return;
      }
      await rep.create(request.body);
      rabbit.publish("order.exchange","order.created",
        {
          body: { text: "Order Created" },
        }
      );
      response.status(201).send();
    } catch (error) {
      next(error);
    }
  }
})



exports.factory = factory;
exports.actions = factory(repository);