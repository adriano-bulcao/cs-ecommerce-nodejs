var express = require('express');
var router = express.Router();
var ShippingController = require("./../controllers/shippingController");

router.get('/:id', ShippingController.getById);
router.get('/', ShippingController.getAll);
router.post('/', ShippingController.insert);

module.exports = router;