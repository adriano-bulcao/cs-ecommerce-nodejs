var MongoClient = require('mongodb').MongoClient

var state = {
    db: null,
}

exports.connect = function (url) {
    MongoClient.connect(url, function (err, client) {
        state.db = client.db("shippingDb");
    });
}

exports.get = function () {
    return state.db;
}

exports.ObjectId = require('mongodb').ObjectID