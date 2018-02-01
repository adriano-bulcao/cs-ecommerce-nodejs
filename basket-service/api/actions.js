'use strict'

const Joi = require('joi');
const { repository } = require('./repository');
const axios = require('axios');
const env = require('../helpers/env');

const factory = ({ repository }) => ({
    create: async (request, response, next) => {
        try {
            const result = await repository.create();
            const basket = result.ops[0];
            response.status(201).json(basket);
        } catch (error) {
            next(error);
        }
    },

    getById: async (request, response, next) => {
        try {
            const basket = request.basket;
            response.status(200).json(basket);
        } catch (error) {
            next(error);
        }
    },


    addItem: async (request, response, next) => {
        try {
            const basket = request.basket;
            const item = request.body;
            const stockApi = `${env.external.stockAPI}/stock`;
            
            const stock = await getStock(`${stockApi}/${item.productId}`);

            if (!productIsAvailable(stock)) {
                response.status(400).json({ message: 'This product is not available!' });
                return;
            }

            await UpdateBasket(basket, item, repository);

            await updateStockQuantity(stockApi, stock, item.quantity);

            response.status(200).json(basket);

        } catch (error) {
            next(error);
        }

    },

    updateQuantity: async (request, response, next) => {
        try {
            const itemId = request.params.itemid;
            const quantity = request.body.quantity;
            const basket = request.basket;
            const item = basket.items.find(it => it.productId == itemId);
            item.quantity = quantity;
            const result = await repository.update(basket);

            response.status(200).json(basket);

        } catch (error) {
            next(error);
        }
    },

    removeItem: async (request, response, next) => {
        try {
            const basket = request.basket;
            const itemId = request.params.itemid;
            const item = basket.items.find(it => it.productId == itemId);
            const index = basket.items.indexOf(item);
            basket.items.splice(index, 1);

            var result = repository.update(basket);

            response.status(200).json(basket);

        } catch (error) {
            next(error);
        }
    },

    checkout: async (request, response, next) => {
        try {
            const basket = request.basket;
            const customerId = request.body.customerId;
            const url = `${env.external.ordersAPI}/orders`;
            var data = {
                customerId,
                items: basket.items,
                total: basket.total
            }
            const result = await axios.post(url, data);
            response.status(200).json({ message: "OK" });
        } catch (error) {
            next(error);
        }
    },

    basketVerification: async (request, response, next) => {
        const basket = await repository.getById(request.params.basketid);
        if (!basket) {
            response.status(404).json({ message: "Basket not found!" });
            return;
        }
        request.basket = basket;
        next();
    },

    itemAlreadyAddedVerification: async (request, response, next) => {
        const basket = request.basket;
        const productId = request.body.productId;

        if (!basket.items)
            basket.items = [];

        request.basket = basket;

        const basketItem = basket.items.find(it => it.productId == productId);

        if (basketItem) {
            response.status(400).json({ message: `The product ${productId} is already added to basket!` });
            return;
        }

        next();
    },

    itemExistenceVerification: async (request, response, next) => {
        const basket = request.basket;
        const itemId = request.params.itemid;
        const item = basket.items.find(it => it.productId == itemId);

        if (!item) {
            response.status(404).json({ message: `The item ${itemId} was not found!` });
            return;
        }

        next();
    }
});

async function UpdateBasket(basket, item, repository) {
    basket.items.push(item);
    await repository.update(basket);
}

async function updateStockQuantity(stockApi, stock, quantity) {
    stock.balance = stock.balance - quantity;
    await axios.put(stockApi, stock);    
}

async function getStock(endpoint) {
    const stockResponse = await axios.get(endpoint);
    const stock = stockResponse.data;
    return stock;
};

function productIsAvailable(stock) {
    return stock.balance > 0;
}

exports.factory = factory;
exports.actions = factory({ repository });