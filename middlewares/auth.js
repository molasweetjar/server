const { jwt } = require('../helpers'),
  { decodeToken } = jwt,
  { User } = require('../models')

module.exports = {
  authentication (req, res, next) {
    try{
      if(req.headers.token) {
        req.loggedUser = decodeToken(req.headers.token);
        next()
      } else next({ status: 403, msg: 'Authentication Error' })
    } catch(err) { next(err) }
  },
  authorAdmin (req, res, next) {
    User.findById(req.loggedUser.id, (err, user) => {
      if(err) next(err);
      else {
        if(user.role === 'admin') next();
        else next({ status: 403, msg: 'Do not have access' })
      }
    })
  }
}