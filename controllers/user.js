const { User } = require('../models'),
  { jwt, hash } = require('../helpers'),
  { signToken } = jwt,
  { comparePassword } = hash,
  { OAuth2Client } = require('google-auth-library')

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
  },
  userSIgninGoogle (req, res, next) {
    let username,
      email
    const client = new OAuth2Client(process.env.GOOGLE_CLIENTID)
    client.verifyIdToken({
      idToken: req.body.id_token,
      audience: process.env.GOOGLE_CLIENTID
    })
      .then(ticket => {
        const payload = ticket.getPayload();
        username = payload.name;
        email = payload.email;
        return User.findOne({ email })
      })
      .then(user => {
        let temp = ''
        for(let i=0; i<5; i++) {
          let alfa = 'abeuedwkmsapdmarkqorprqwokqwpo'
          let rand = Math.floor(Math.random() * alfa.length)
          temp += alfa[rand]
        }
        if(user) return user;
        else return User.create({ username, password: temp, email })
      })
      .then(user => {
        res.status(200).json({ user, token: signToken({ id: user._id, username: user.username, email: user.email }) })
      })
      .catch(next);
  }
}