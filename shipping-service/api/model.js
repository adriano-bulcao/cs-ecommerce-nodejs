'use strict';

const Joi = require('joi');

const schema = Joi.object().keys({
    orderId: Joi.string().required(),
    status: Joi.number().required()
});

exports.schema = schema;

// {
//     _id: -1,
//     orderId: -1,
//     status: {}
// };