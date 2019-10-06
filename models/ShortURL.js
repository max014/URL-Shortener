const mongoose = require('mongoose');

const urlSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    original: {type: String, required: true},
    shortened: {type: String, required: true},
    creationDate: { type: Date, default: Date.now },
    expirationDate: { type: Date, default: new Date(+new Date() + 7*24*60*60*1000) }, // 7 days
});

module.exports = mongoose.model('UrlScore', urlSchema);