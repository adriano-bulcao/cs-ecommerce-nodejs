const Joi = require('joi');
const { repository } = require('./repository');
const { schema } = require('./model');


const factory = (repository) => ({
    getById: async (request, response, next) => {
        try {
          const productId = request.params.id;
          const stock = await repository.getById(productId);
          response.status(200).json(stock);
        } catch (error) {
          next(error);
        }
      },
      
      create: async (request, response, next) => {
        try {
            const stock = request.body
            const productId = await repository.getById(stock.productId);

            if(productId != undefined){
                response.status(401).json("Product already exists.");
                return;
            }

            const validation = Joi.validate(stock, schema);

            if (validation.error) {
                response.status(400).json(validation.error.details);
                return;
              }
        
              await repository.create(request.body);
        
              response.status(201).send("Success");

        }catch (error) {
            next(error);
          }
        }
});


exports.factory = factory;
exports.actions = factory(repository);