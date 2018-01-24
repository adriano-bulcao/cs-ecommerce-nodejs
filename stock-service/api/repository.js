

const { database } = require('../helpers/db');
const env = require('../helpers/env');

const dependencies = {
  db: database,
  collectionName: env.db.collections.stock,
};

const factory = ({ db, collectionName }) => ({
  getById: productId => db.collection(collectionName).findOne({ productId: productId }),

  create: stock => db.collection(collectionName).insert(stock),
});

exports.factory = factory;
exports.repository = factory(dependencies);
