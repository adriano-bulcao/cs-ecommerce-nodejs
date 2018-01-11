'use strict'

const { repository } = require('./repository')

const factory = ({ repository }) => ({
  create: (request, response, next) =>
    repository.create(request.body)
      .then(user => response.status(201).json(user))
      .catch(next),

  getByCredentials: (request, response, next) => {
    repository.getByCredentials({ username: request.query.username, password: request.query.password })
      .then(user => response.status(200).json(user))
      .catch(next)
  }

})

exports.factory = factory
exports.actions = factory({ repository })