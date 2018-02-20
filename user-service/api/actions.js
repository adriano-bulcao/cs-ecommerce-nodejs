
const factory = ({ repository }) => ({
  create: async (request, response, next) => {
    repository.create(request.body)
      .then(user => response.status(201).json(user))
      .catch(next);
  },
  signin: async (request, response, next) => {
    repository.signin({
      username: request.query.username,
      password: request.query.password,
    })
      .then(user => response.status(200).json(user))
      .catch(next);
  },
  update: async (request, response, next) => {
    repository.update({
      _id: request.params.id,
      username: request.body.username,
      email: request.body.email,
      password: request.body.password,
    })
      .then(user => response.status(200).json(user))
      .catch(next);
  },
  delete: async (request, response, next) => {
    repository.delete({
      username: request.body.username,
      email: request.body.email,
      password: request.body.password,
    })
      .then(user => response.status(200).json(user))
      .catch(next);
  }
});

const { repository } = require('./repository');

exports.factory = factory;
exports.actions = factory({ repository });
