const { model, Schema } = require('mongoose');

module.exports = model('cakes', new Schema({
  description: String,
  Category: { type: Schema.Types.ObjectId, ref: 'categories' },
  CakeImage: [ String ] 
}, { versionKey: false, timestamps: true }))