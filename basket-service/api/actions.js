'use strict'

const Joi = require('joi');
const { repository } = require('./repository');
// const { schema } = require('./model');


const factory = ({ repository }) => ({
    getById: async (request, response, next) => {
        response.status(200).json({ 'basketid': request.params.id });
    },
    create: async (request, response, next) => { },
    addItem: async (request, response, next) => { },
    updateQuantity: async (request, response, next) => { },
    removeItem: async (request, response, next) => { },
    checkout: async (request, response, next) => { },
});

exports.factory = factory;
exports.actions = factory({ repository });