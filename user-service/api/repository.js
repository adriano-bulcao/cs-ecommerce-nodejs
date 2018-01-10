'use strict'

const { mongo } = require('../db')
const env = require('../env')
const format = require('./model').format

const dependencies = {
  db: mongo,
  collectionName: env.db.collenctions.users,
}

const factory = ({ db, collectionName }) => {
  return {
    create: data =>
      db.collection(collectionName)
        .insertOne(format(data))
        .then(result => format(result.ops[0])),

    retrieve: () =>
      db.collection(collectionName)
        .find()
        .toArray()
        .then(records => records.map(format)),

    getById: id =>
      db.collection(collectionName)
        .findOne({ _id: mongo.ObjectID(id) })
        .then(format)
  }
}

exports.factory = factory
exports.repository = factory(dependencies)