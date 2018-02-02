const Joi = require('joi');
const { repository } = require('./repository');
const { schema } = require('./model');
const crypt = require('../helpers/crypt');

const factory = repository => ({
    create: async (request, response, next) => {
        try {
            const payment = request.body;
            payment.date = new Date();
            payment.creditCard.number = crypt().encrypt(payment.creditCard.number);

            const validation = Joi.validate(payment, schema);
            if (validation.error) {
                response.status(400).json(validation.error.details);
                return;
            }

            await repository.create(request.body);

            response.status(201).send(request);
        } catch (error) {
            next(error);
        }
    },
    getById: async (request, response, next) => {
        try {
            const paymentId = request.params.id;
            const payment = await repository.getById(paymentId);
            if (!payment) {
                response.status(204).send();
                return;
            }
            response.status(200).json(payment);
        } catch (error) {
            next(error);
        }
    }
})

exports.factory = factory;
exports.actions = factory(repository);