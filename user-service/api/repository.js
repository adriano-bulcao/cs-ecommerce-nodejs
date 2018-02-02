const { database } = require('../helpers/db');
const { ObjectID } = require('mongodb');
const env = require('../helpers/env');
const schema = require('./model').schema;
const Joi = require('joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const dependencies = { 
  db: database,
  collectionName: env.db.collections.users,
};

const factory = ({ db, collectionName }) => ({
  create: data => new Promise(((resolve, reject) => {
    const result = Joi.validate(data, schema);

    if (result.error) {
      reject(result.error);
    } else {
      resolve(db.collection(collectionName)
        .findOne({
          username: data.username,
        })
        .then((user) => {
          if (user) {
            return {
              success: false,
              message: 'User already exists',
              data: null,
            };
          }
          db.collection(collectionName)
            .insertOne({
              email: data.email,
              username: data.username,
              password: bcrypt.hashSync(data.password, 10),
            })
            .then((user) => {
              if (!user.ops[0]) {
                return {
                  success: false,
                  message: 'User Was Not Created',
                  data: null,
                };
              }

              return {
                success: true,
                message: '',
                data: user.ops[0],
              };
            });
        })
      );
    }
  })),
  update: data => new Promise(((resolve, reject) => {
    const result = Joi.validate(data, schema);

    if (result.error) {
      reject(result.error);
    } else {
      resolve(db.collection(collectionName)
        .update({
          _id: ObjectID(data._id),
        }, {
          $set: {
            email: data.email,
            username: data.username,
            password: bcrypt.hashSync(data.password, 10),
          },
        })
        .then((user) => {
          if (!user) {
            return {
              success: false,
              message: 'User Was Not Updated',
              data: null,
            };
          }

          return {
            success: true,
            message: 'User Was Updated',
            data: null,
          };
        })
      );
    }
  })),
  delete: data => new Promise(((resolve, reject) => {

    resolve(db.collection(collectionName)
      .remove({
        "username": data.username
      }).then((user) => {
        if (!user) {
          return {
            success: false,
            message: 'User Was Not Deleted',
            data: null,
          };
        }

        return {
          success: true,
          message: 'User Was Deleted',
          data: null,
        };
      })
    );
  })),
  signin: data => new Promise((resolve, reject) => {
    const result = Joi.validate(data, schema);

    if (result.error) {
      reject(result.error);
    } else {
      resolve(db.collection(collectionName)
        .findOne({
          username: data.username,
        }).then((user) => {
          if (!user) {
            return {
              success: false,
              message: 'Authentication failed. Wrong User.',
              data: null,
            };
          }
          if (!bcrypt.compareSync(data.password, user.password)) {
            return {
              success: false,
              message: 'Authentication failed. Wrong Password.',
              data: null,
            };
          }
          return {
            success: true,
            message: '',
            data: jwt.sign({
              email: user.email,
              username: user.username,
              id: user._id
            }, env.app.secret),
          };
        })
      );
    }
  }),
});

exports.factory = factory;
exports.repository = factory(dependencies);