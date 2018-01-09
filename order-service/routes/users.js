var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', async function(req, res, next) {
  var result = await someOperationAsync();
  res.send('This is the response: ' + result);
});

var someOperationAsync = async () => {
  var promise = new Promise( (resolve, reject) => {
     setTimeout(() => resolve("result from async operation."), 3500); 
  });
  return promise;
}

module.exports = router;
