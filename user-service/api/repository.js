'use strict'

const { mongo } = require('../helpers/db')
const env = require('../helpers/env')
const schema = require('./model').schema
const Joi = require('joi');

const dependencies = {
  db: mongo,
  collectionName: env.db.collenctions.users,
}

const factory = ({ db, collectionName }) => {
  return {
    create: data => {
      return new Promise(function (resolve, reject) {
        const result = Joi.validate(data, schema)

        if (result.error) {
          reject(result.error)
        } else {
          resolve(db.collection(collectionName)
            .insertOne(data)
            .then(result => result.ops[0]))
        }
      });
    },
    
    getByCredentials: data => {
      return new Promise((resolve, reject) => {
        const result = Joi.validate(data, schema);

        if (result.error) {
          reject(result.error)
        }
        else {
          resolve(db.collection(collectionName)
            .findOne({ username: data.username, password: data.password })
            .then(record => record))
        }

      });
    }
  }
}
exports.factory = factory
exports.repository = factory(dependencies)