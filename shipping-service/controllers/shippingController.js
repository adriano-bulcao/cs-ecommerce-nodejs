const repository = require("./../repositories/shippingRepository");

exports.getById = function (req, res) {
    repository.findOne(req.params.id).then(message => res.send(message));
};

exports.getAll = function (req, res) {
    repository.find().then(message => res.send(message));
};