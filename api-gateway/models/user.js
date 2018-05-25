var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;

//user.save to add new database user
module.exports.add = (user, callback) => {
  user.save(callback);
};

module.exports.getById = (id, callback) => {
  var query = {_id: id};
  User.findById(query, callback);
};