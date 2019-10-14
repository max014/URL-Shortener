const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const ShortURL = require('../models/ShortURL');
const makeid = require('../makeid');

const hostname = 'localhost';

router.get('/', (req, res, next) => {
	ShortURL.find({})
		.exec()
		.then(urls => res.json(urls))
		.catch(err => res.status(500).json(err));
});

router.post("/", (req, res, next) => {
  const shortened = makeid();
  const url = new ShortURL({
    _id: new mongoose.Types.ObjectId(),
    original: req.body.original,
    shortened: shortened
  });
  url
    .save()
    .then(result => {
      res.status(201).json({
        shortened: hostname + '/' + result.shortened
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