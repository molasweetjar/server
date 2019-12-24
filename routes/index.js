const Route = require('express').Router(),
  UserRoute = require('./user'),
  ToppingRoute = require('./topping'),
  TestiRoute = require('./testi'),
  CategoryRoute = require('./category'),
  CakeRoute = require('./cake')

Route.use('/', UserRoute);
Route.use('/topping', ToppingRoute);
Route.use('/testi', TestiRoute);
Route.use('/category', CategoryRoute);
Route.use('/cake', CakeRoute);

module.exports = Route;