'use strict'

const { database } = require('../helpers/db')
const env = require('../helpers/env')

const dependencies = {
    db: database,
    collectionName: env.db.collections.orders
}

const factory = ({ db, collectionName }) => {
    return {
        getAll: () => {
            return new Promise((resolve, reject) => {
                var existingOrders = [];
                db.collection(collectionName)
                    .find()
                    .toArray()
                    .then(orders => existingOrders = orders)
                    .catch(error => reject(error));
                resolve(existingOrders);
            });
        }
    }
}

exports.factory = factory;
exports.repository = factory(dependencies);