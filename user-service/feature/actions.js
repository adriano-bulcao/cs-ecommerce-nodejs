'use strict'

const { repository } = require('./repository')

const factory = ({ repository }) => ({
  create: (request, response, next) =>
    repository.create(request.body)
      .then(message => response.status(201).json(message))
      .catch(next),

  retrieve: (request, response, next) =>
    repository.retrieve()
      .then(messages => response.status(200).json(messages))
      .catch(next),

  getById: (request, response, next) =>
    repository.getById(request.params.id)
      .then(message => response.status(200).json(message))
      .catch(next),
})

exports.factory = factory
exports.actions = factory({ repository })