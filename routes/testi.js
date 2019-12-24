const Route = require('express').Router(),
  { TestiController } = require('../controllers'),
  { auth } = require('../middlewares'),
  { authentication, authorAdmin } = auth,
  { newTesti, getAllTesti, deleteTesti } = TestiController,
  images = require('../helpers/images')

Route.get('/', getAllTesti);
Route.post('/', authentication, authorAdmin, images.multer.single('image'), images.sendUploadToGCS, newTesti);
Route.delete('/:id', authentication, authorAdmin, images.multer.single('image'), deleteTesti);

module.exports = Route;