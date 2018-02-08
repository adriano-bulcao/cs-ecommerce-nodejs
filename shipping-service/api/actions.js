'use strict'

const { repository } = require('./repository')

const factory = ({ repository }) => ({
  create: (request, response, next) =>
    repository.create(request.body)
      .then(shipping => response.status(201).json(shipping))
      .catch(next),

  getAll: (request, response, next) => {
    repository.getAll()
      .then(shipping => response.status(200).json(shipping))
      .catch(next)
  },

  getById: (request, response, next) => {
    repository.getById(request.params.id)
      .then(shipping => response.status(200).json(shipping))
      .catch(next)
  }

})

exports.factory = factory
exports.actions = factory({ repository })