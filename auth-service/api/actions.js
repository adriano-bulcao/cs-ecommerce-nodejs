'use strict'

const env = require('../helpers/env')
const schema = require('./model').schema
const Joi = require('joi');
const axios = require("axios");
const jwt = require('jsonwebtoken');

const factory = () => ({
  signin: (request, response, next) => {

    new Promise((resolve, reject) => {

      const data = { username: request.body.username, password: request.body.password }

      const result = Joi.validate(data, schema);

      if (result.error) {
        reject(result.error);
      } else {
        resolve(data);
      }
      
    }).then(result => axios.get(`${env.app.userService}?username=${result.username}&password=${result.password}`))
      .then(result => {
        if (result.data) {
          response.status(200).json(jwt.sign({ email: result.data.email, username: result.data.username, id: result.data._id }, 'RESTFULAPIs'));
        } else {
          response.status(400).json("Invalid Login or Password.")
        }
      })
      .catch(next)
  }
})

exports.factory = factory
exports.actions = factory()