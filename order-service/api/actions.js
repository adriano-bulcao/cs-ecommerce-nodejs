'use strict'

const { repository } = require('./repository')

const factory = ({ repository }) => ({
    getAll: async (request, response, next) => {
        try {
            var orders = await repository.getAll();
            response.status(200).json(orders);
        } catch (error) {
            console.error(error);
            response.status(500).json(error);
        }
    },
    
});

exports.factory = factory;
exports.actions = factory({ repository });