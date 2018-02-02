const Joi = require('joi');

const schema = {
    orderId: Joi.string().alphanum().required(),
    amount: Joi.number().required(),
    currency: Joi.string().required(),
    creditCard: Joi.object().keys({
        number: Joi.string().creditCard().required(),
        cvc: Joi.string().length(3).required(),
        exp_month: Joi.string().length(2).required(),
        exp_year: Joi.string().length(2).required(),
        name: Joi.string().required()
    }),
    date: Joi.date().required()
};

exports.schema = schema;