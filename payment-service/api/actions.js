const Joi = require('joi');
const { repository } = require('./repository');
const { schema } = require('./model');
const { crypt } = require('../helpers/crypt');

const factory = repository => ({
    create: async (request, response, next) => {
        try {
            const payment = request.body;
            payment.date = new Date();

            const validation = Joi.validate(payment, schema);
            if (validation.error) {
                response.status(400).json(validation.error.details);
                return;
            }

            let formatedPayment = encryptData(payment);

            await repository.create(formatedPayment);

            response.status(201).send({
                paymentNumber: formatedPayment._id
            });
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

const encryptData = payment => {
    payment.creditCard.number = crypt.encrypt(payment.creditCard.number);
    payment.creditCard.cvc = crypt.encrypt(payment.creditCard.cvc);
    return payment;
}

exports.factory = factory;
exports.actions = factory(repository);