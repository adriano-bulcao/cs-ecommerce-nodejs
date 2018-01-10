'use strict'

const { repository } = require('./repository')

const factory = ({ repository }) => ({
  create: (request, response, next) =>
    repository.create(request.body)
      .then(user => response.status(201).json(user))
      .catch(next),

  retrieve: (request, response, next) =>
    repository.retrieve()
      .then(users => response.status(200).json(users))
      .catch(next),

  getById: (request, response, next) =>
    repository.getById(request.params.id)
      .then(user => response.status(200).json(user))
      .catch(next),
})

exports.factory = factory
exports.actions = factory({ repository })