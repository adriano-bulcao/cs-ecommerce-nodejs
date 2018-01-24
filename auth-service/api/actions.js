'use strict'

const env = require('../helpers/env')
const schema = require('./model').schema
const Joi = require('joi');
const axios = require("axios");
const jwt = require('jsonwebtoken');

const factory = () => ({
  signin: async (request, response, next) => {

    const data = { username: request.body.username, password: request.body.password }

    const validator = Joi.validate(data, schema);

    if (validator.error) {
      next(validator.error);
    } else {
      const result = await axios.get(`${env.app.userService}?username=${data.username}&password=${data.password}`);

      if (result.success) {
        response.status(200).json(jwt.sign({
          email: result.data.email,
          username: result.data.username,
          id: result.data._id
        }, env.app.secret));
      } else {
        response.status(400).json(result.message)
      }
    }
  }
})

exports.factory = factory
exports.actions = factory()