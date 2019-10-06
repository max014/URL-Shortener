const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const ShortURL = require('../models/ShortURL');

router.get('/:id', (req, res, next) => {
	const id = req.params.id;
	ShortURL.findById(id)
		.exec()
		.then(item => res.redirect(item.original))
		.catch(err => res.status(500).json(err));
});

router.get('/', (req, res, next) => {
	ShortURL.find()
		.exec()
		.then(urls => res.redirect(urls))
		.catch(err => res.status(500).json(err));
});

router.post("/", (req, res, next) => {
  const id = new mongoose.Types.ObjectId();
  const url = new ShortURL({
    _id: id,
    original: req.body.original,
    shortened: 'localhost/url/' + id
  });
  url
    .save()
    .then(result => {
      res.status(201).json({
        shortened: result.shortened
      });
    })
    .catch(err => res.status(500).json(err));
});

router.delete('/:id', (req, res, next) => {
	const id = req.params.id;
	ShortURL.remove({_id: id})
		.exec()
		.then(result => res.status(200).json(result))
		.catch(err => res.status(500).json(err));
});

module.exports = router;