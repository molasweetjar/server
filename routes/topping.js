const Route = require('express').Router(),
  { auth } = require('../middlewares'),
  { authentication, authorAdmin } = auth,
  { ToppingController } = require('../controllers'),
  { newTopping, getAllToping } = ToppingController;

Route.get('/', getAllToping);
Route.post('/', authentication, authorAdmin, newTopping);

module.exports = Route;