var express = require('express');
var router = express.Router();

/* POST new URL. */
router.get('/', function(req, res, next) {
  res.send('New URL');
});

module.exports = router;