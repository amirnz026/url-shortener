const mongoose = require('mongoose');

const UrlSchema = mongoose.Schema({
  original_url: {
    type: String,
  },
  short_url: {
    type: Number,
  },
});

module.exports = mongoose.model('Urls', UrlSchema);
