const Joi = require('joi');

const schema = {
  customerId: Joi.string().alphanum().required(),
  items: Joi.array().min(1).items(Joi.object()
    .keys({
      productId: Joi.string().required(),
      price: Joi.number().required(),
      quantity: Joi.number().required(),
      productName: Joi.string().required(),
    })),
  date: Joi.date().required(),
  total: Joi.number(),
};

exports.schema = schema;
