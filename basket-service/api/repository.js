'use strict'

const { database } = require('../helpers/db');
const env = require('../helpers/env');

const dependencies = {
    db: database,
    collectionName: env.db.collections.basket,
}

const factory = ({ db, collectionName }) => {
    return {

        getById: (basketId) => {
            return db.collection(collectionName).findOne({ "_id": db.ObjectID(basketId) });
        },

        create: () => {
            return db.collection(collectionName).insert({});
        },

        update: (basket) => {
            return db.collection(collectionName).replaceOne({ "_id": db.ObjectID(basket._id) }, basket);
        },
        remove: (id) => {
            return db.collection(collectionName).remove({ "_id": db.ObjectID(basket._id) });
        }
    }
}

exports.factory = factory;
exports.repository = factory(dependencies);