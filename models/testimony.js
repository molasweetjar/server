const { model, Schema } = require('mongoose');

module.exports = model('testimony', new Schema({
  testi_image: String
}, { versionKey: false }))