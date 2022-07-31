var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ressource = new Schema({
  nom: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  }
});

var itemPrix = new Schema({
  prix: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  ressource: {
    type: ressource,
    required: true
  }
});

const r =  mongoose.model('ressource', ressource);
const ir =  mongoose.model('itemPrix', itemPrix);


module.exports = {r, ir};