const mongoose = require('mongoose');

const thingSchema = mongoose.Schema({
  nom: { type: String, required: true },
  imageUrl: { type: String, required: true },
});

module.exports = mongoose.model('Thing', thingSchema);