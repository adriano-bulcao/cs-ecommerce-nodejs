var express = require('express');
var router = express.Router();
var ProductsController = require("./../controllers/productsController");

router.get('/:id', ProductsController.getById);

module.exports = router;