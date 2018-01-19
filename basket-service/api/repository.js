'use strict'

const { database } = require('../helpers/db');
const env = require('../helpers/env');

const dependencies = {
    db: database,
    collectionName: env.db.collections.basket,
}

const factory = ({ db, collectionName }) => {
    return {

        getById: (orderId) => {
            return db.collection(collectionName).findOne({ "_id": db.ObjectID(orderId) });
        },

        create: (basket) => {
            return db.collection(collectionName).insert(basket);
        },
    }
}

exports.factory = factory;
exports.repository = factory(dependencies);