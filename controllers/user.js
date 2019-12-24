const { User } = require('../models'),
  { jwt, hash } = require('../helpers'),
  { signToken } = jwt,
  { comparePassword } = hash

module.exports = {
  signin ( req, res, next ) {
    const { request, password } = req.body;
    User.findOne({ $or: [{ username: request }, { email: request }] }, (err, user) => {
      if(err) next(err);
      else {
        if(user && comparePassword(password, user.password)) res.status(200).json({ user, token: signToken({ id: user._id, email: user.email, username: user.username }) });
        else next({ status: 400, msg: 'request/password wrong' })
      }
    })
  },
  signup ( req, res, next ) {
    const { username, password, email } = req.body;
    User.create({ username, password, email }, (err, user) => {
      if(err) next(err);
      else res.status(201).json({ user })
    })
  },
  userSignin ( req, res, next ) {
    User.findById(req.loggedUser.id, (err, user) => {
      if(err) next(err);
      else res.status(200).json({ user })
    })
  }
}