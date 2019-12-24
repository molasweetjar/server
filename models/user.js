const { model, Schema } = require('mongoose'),
  { hash } = require('../helpers'),
  { hashPassword } = hash,


  UserSchema = new Schema({
    username: { type: String, required: [true, 'username is required'] },
    password: { type: String, required: [true, 'password is required'] },
    email: { type: String, required: [true, 'email is required'], unique: true },
    role: String,
  }, { versionKey: false })

UserSchema.path('username').validate(function(val) {
  return User.findOne({ username: val })
    .then(user => { if(user) return false })
}, 'Username allready used!')

UserSchema.path('email').validate(function(val) {
  return User.findOne({ email: val })
    .then(user => { if(user) return false })
}, 'Email allready used!')

UserSchema.pre('save', function(next) {
  this.password = hashPassword(this.password);
  this.role = 'customer';
  next()
})

const User = model('users', UserSchema);

module.exports = User