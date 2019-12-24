const { model, Schema } = require('mongoose')

module.exports = model('toping', new Schema({ name: String }, { versionKey: false }))