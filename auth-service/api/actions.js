'use strict'

const env = require('../helpers/env')
const schema = require('./model').schema
const Joi = require('joi');
const axios = require("axios");
const jwt = require('jsonwebtoken');

const factory = () => ({
  signin: (request, response, next) => {

    const data = {
      username: request.body.username,
      password: request.body.password
    }

    const result = Joi.validate(data, schema);

    if (result.error) {
      next(result.error);
    } else {

      axios.get(`${env.app.userService}?username=${data.username}&password=${data.password}`)
        .then(result => {

          if (result.data) {
            response.status(200).json(jwt.sign({ email: result.data.email, username: result.data.username, id: result.data._id }, 'RESTFULAPIs'));
          } else {
            response.status(400).json("Invalid Login or Password.")
          }

        })
        .catch(next)
    }
  }
})

exports.factory = factory
exports.actions = factory()