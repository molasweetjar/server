const Route = require('express').Router(),
  { auth } = require('../middlewares'),
  { authentication } = auth,
  { UserController } = require('../controllers'),
  { signin, userSignin, signup } = UserController

Route.get('/', authentication, userSignin);
Route.post('/signin', signin);
Route.post('/signup', signup);

module.exports = Route;