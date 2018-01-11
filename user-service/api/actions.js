'use strict'

const { repository } = require('./repository')

const factory = ({ repository }) => ({
  create: (request, response, next) =>
    repository.create(request.body)
      .then(user => response.status(201).json(user))
      .catch(next),

  signin: (request, response, next) => 
      repository.getByCredentials(request.body)
      .then(user => response.status(200).json(user))
      .catch(next)
})

exports.factory = factory
exports.actions = factory({ repository })