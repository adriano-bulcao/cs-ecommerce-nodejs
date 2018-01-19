'use strict'

const Joi = require('joi');
const { repository } = require('./repository');
// const { schema } = require('./model');


const factory = ({ repository }) => ({
    getById: async (request, response, next) => {
        try {
            const basket = await repository.getById(request.params.id);
            response.status(200).json(basket);
        } catch (error) {
            next(error);
        }
    },
    create: async (request, response, next) => {
        try {
            const result = await repository.create();
            const basket = result.ops[0];
            response.status(201).json(basket);
        } catch (error) {
            next(error);
        }
    },

    addItem: async (request, response, next) => {
        try {
            const basketId = request.params.id;
            const item = request.body;

            //TODO: Perform here a query on Stock.API 
            // to verify if the product is available!!!

            const basket = await repository.getById(basketId);
            if (!basket) {
                response.status(404).json({ message: "Basket not found!" });
                return;
            }
            if (basket.items.some(it => it.productId == item.productId)) {
                response.status(400).json({ message: `The product '${item.productId}' is already added!`});
                return;
            }
            basket.items.push(item);
            const result = await repository.update(basket);
            response.status(200).json(basket);
        } catch (error) {
            next(error);
        }

    },
    updateQuantity: async (request, response, next) => { },
    removeItem: async (request, response, next) => { },
    checkout: async (request, response, next) => { },
});

exports.factory = factory;
exports.actions = factory({ repository });