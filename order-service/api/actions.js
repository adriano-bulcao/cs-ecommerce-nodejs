'use strict'

const { repository } = require('./repository')

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
        try{
            throw new Error("Meu erro de teste!");
        }catch(error){
            next(error);
        }
    },
});

exports.factory = factory;
exports.actions = factory({ repository });