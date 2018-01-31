

const { database } = require('../helpers/db');
const env = require('../helpers/env');

const dependencies = {
  db: database,
  collectionName: env.db.collections.stock,
};

const factory = ({ db, collectionName }) => ({
  getById: productId => db.collection(collectionName).findOne({ productId: productId }),

  create: () => {
         return db.collection(collectionName).insert({})
      },
  update: (stock) => {
    return db.collection(collectionName).updateOne(
        {"productId":stock.productId},
        { $set: { "balance" : stock.balance } }
    )
  }
});

exports.factory = factory;
exports.repository = factory(dependencies);
