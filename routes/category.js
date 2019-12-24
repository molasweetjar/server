const Route = require('express').Router(),
  { CategoryController } = require('../controllers'),
  { createCategory, getAllCategory } = CategoryController,
  { auth } = require('../middlewares'),
  { authentication, authorAdmin } = auth

Route.get('/', getAllCategory);
Route.post('/', authentication, authorAdmin, createCategory);

module.exports = Route;