var express = require('express');
var router = express.Router();
const ShortURL = require('../models/ShortURL');

router.get('/:shortened', (req, res, next) => {
	const shortened = req.params.shortened;
	ShortURL.findOne({shortened: shortened})
		.exec()
		.then(item => res.redirect(item.original))
		.catch(err => res.status(500).json(err));
});

router.get('/', (req, res, next) => {
	res.send('home');
});

module.exports = router;