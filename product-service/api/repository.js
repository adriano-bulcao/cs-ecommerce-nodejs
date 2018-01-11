'use strict'

const { mongo } = require('../helpers/db')
const env = require('../helpers/env')
const schema = require('./model').schema
const Joi = require('joi');

const dependencies = {
  db: mongo,
  collectionName: env.db.collenctions.products,
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
    
    getAll: data => {
      return new Promise((resolve, reject) => {
        if (result.error) {
          reject(result.error)
        }
        else {
          resolve(db.collection(collectionName)
            .find()
            .toArray()
            .then(records => records))
        }
      });
    },

    getById: (id) =>
      db.collection(collectionName)
        .findOne({ _id: mongo.ObjectID(id) })
        .then(record => record)
  }
}
exports.factory = factory
exports.repository = factory(dependencies)