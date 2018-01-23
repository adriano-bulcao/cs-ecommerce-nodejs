

const { database } = require('../helpers/db');
const env = require('../helpers/env');

const dependencies = {
  db: database,
  collectionName: env.db.collections.orders,
};

const factory = ({ db, collectionName }) => ({
  getAll: () => db.collection(collectionName).find().toArray(),

  getById: orderId => db.collection(collectionName).findOne({ _id: db.ObjectID(orderId) }),

  create: order => db.collection(collectionName).insert(order),
});

exports.factory = factory;
exports.repository = factory(dependencies);
