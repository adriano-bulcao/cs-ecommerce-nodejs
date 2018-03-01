const Joi = require('joi');

const schema = {
  // transactionId:Joi.string().alphanum().uuid,
  orderId: Joi.string()
    .alphanum()
    .required(),
  eventName: Joi.string().required(),
};

exports.schema = schema;
