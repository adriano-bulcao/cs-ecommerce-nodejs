const Joi = require('joi');

const schema = {
    orderId:Joi.string().alphanum().required(),
    transactionId:Joi.string().alphanum().required(),
    eventName:Joi.string().required()
}