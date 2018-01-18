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

            const validation = Joi.validate(request.body, schema);

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
});

exports.factory = factory;
exports.actions = factory({ repository });