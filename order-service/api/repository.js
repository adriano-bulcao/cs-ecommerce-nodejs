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
                    .then(orders => resolve(orders))
                    .catch(error => reject(error));
            });
        },
        create: order => {
            return new Promise((resolve, reject) => {
                try {
                    const response = db.collection(collectionName).insert(order);
                    resolve(response);
                } catch (error) {
                    reject(error);
                }
            });
        },
    }
}

exports.factory = factory;
exports.repository = factory(dependencies);