const { model, Schema } = require('mongoose')

module.exports = model('categories', new Schema({
    name: { type: String, required: [true, 'name category is required'] }
  }, { timestamps: true, versionKey: false } ))