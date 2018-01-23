const repository = require("./../repositories/shippingRepository");

exports.getById = function (req, res, next) {
    repository.findOne(req.params.id).then(message => res.send(message));
};

exports.getAll = function (req, res, next) {
    repository.find().then(message => res.send(message));
};

exports.insert = function (req, res, next) {
    repository.insert(req.body).then(res.send(200));
};