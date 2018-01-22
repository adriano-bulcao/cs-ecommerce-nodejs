'use strict'

const Joi = require('joi');
const { repository } = require('./repository')
const { schema } = require('./model');

const factory = ({ repository }) => ({

    getAll: async (request, response) => {
        try {
            var orders = await repository.getAll();
            response.status(200).json(orders);
        } catch (error) {
            next(error);
        }
    },

    create: async (request, response, next) => {
        try {
            const order = request.body;
            order.date = new Date();
            
            let total = 0;

            order.items.forEach(product => {
                const subtotal = product.price * product.quantity;
                total += subtotal;
            });

            order.total = total;

            const validation = Joi.validate(order, schema);

            if (validation.error) {
                response.status(400).json(validation.error.details);
                return;
            }

            var result = await repository.create(request.body);
            
            response.status(201).send();

        } catch (error) {
            next(error);
        }
    },

    getById : async(request, response, next) => {
        try {
            const orderId = request.params.id;
            const order = await repository.getById(orderId);
            response.status(200).json(order);
        } catch (error) {
            next(error);
        }
    },

});

exports.factory = factory;
exports.actions = factory({ repository });