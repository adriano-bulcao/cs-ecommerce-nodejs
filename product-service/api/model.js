'use strict';

const Joi = require('joi');

const schema = Joi.object().keys({
    name: Joi.string().min(3).max(50).required(),
    description: Joi.string().max(100),
    price: Joi.number().required()
});

exports.schema = schema;