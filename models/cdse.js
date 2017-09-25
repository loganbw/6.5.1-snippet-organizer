const mongoose = require("mongoose");

const cdseSchema = new mongoose.Schema({
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
  }],
  userId: String
});

const Cdse = mongoose.model('Cdse', cdseSchema);


module.exports = Cdse;
