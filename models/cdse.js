const mongoose = require("mongoose");

const cdseSchema = new mongoose.Schema({
  id: {
    type: Number
  },
  title: {
    type: String
  },
  body: {
    type: String
  },
  notes: {
    type: String
  },
  language: {
    type: String
  },
  tags: [{
    type: String,
    trim: true
  }]
});

const Cdse = mongoose.model('Cdse', cdseSchema);


module.exports = Cdse;
