"use strict";

const db = require('./../helpers/db');
//const shippings = db.get().collection("shipping");

module.exports = {
    insert: function (shipping) {
        return db.get().collection("shipping").insertOne(shipping);
    },

    find: function () {
        return db.get().collection("shipping").find().toArray().then(records => { return records });
    },

    findOne: function (id) {
        return db.get().collection("shipping").findOne(db.ObjectId(id)).then(records => { return records });
    }
};