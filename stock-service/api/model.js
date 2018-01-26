const Joi = require('joi');

const schema = {
    productId:  Joi.string().required(),
    balance: Joi.number().required()
}

exports.schema = schema;