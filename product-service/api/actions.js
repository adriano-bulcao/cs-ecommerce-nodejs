'use strict'

const { repository } = require('./repository')

const factory = ({ repository }) => ({
  create: (request, response, next) =>
    repository.create(request.body)
      .then(product => response.status(201).json(product))
      .catch(next),

  getAll: (request, response, next) => {
    repository.getAll()
      .then(product => response.status(200).json(product))
      .catch(next)
  },

  getById: (request, response, next) => {
    repository.getById(request.params.id)
      .then(product => response.status(200).json(product))
      .catch(next)
  }

})

exports.factory = factory
exports.actions = factory({ repository })