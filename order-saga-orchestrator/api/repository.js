const { database } = require('../helpers/db');
const env = require('../helpers/env');

const dependencies = {
  db: database,
  collectionName: env.db.collections.orchestrator,
};

const factory = ({ db, collectionName }) => ({
  getAll: () =>
    db
      .collection(collectionName)
      .find()
      .toArray(),
  getById: transactionId =>
    db.collection(collectionName).findOne({ _id: db.ObjectID(transactionId) }),
  create: () => {
    console.log(collectionName);
    return db.collection(collectionName).insert({});
  },
  remove: () => db.collection(collectionName).remove({}),
});

exports.factory = factory;
exports.repository = factory(dependencies);
