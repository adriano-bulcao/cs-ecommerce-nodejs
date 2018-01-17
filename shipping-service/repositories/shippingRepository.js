"use strict";

const db = require('./../helpers/db');

module.exports = {
    insert: function (product) {
        db.get().collection("shipping").insertOne(product);
        //.then(result => format(result.ops[0]))
    },

    find: function () {
        return db.get().collection("shipping").find().toArray().then(records => { return records });
    },

    findOne: function (id) {
        return db.get().collection("shipping").findOne(db.ObjectId(id)).then(records => { return records });
    }
};