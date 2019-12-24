const { model, Schema } = require('mongoose');

module.exports = model('testi', new Schema({
  testi_image: String
}, { versionKey: false }))