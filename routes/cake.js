const Route = require('express').Router(),
  { CakeController } = require('../controllers'),
  { newCake, updatePicture, getOneCakeByCategory, updateDescription, removePicture } = CakeController,
  { auth } = require('../middlewares'),
  { authentication, authorAdmin } = auth,
  images = require('../helpers/images')

Route.get('/:id', getOneCakeByCategory);
Route.post('/', authentication, authorAdmin, newCake);
Route.patch('/:id', authentication, authorAdmin, images.multer.single('image'), images.sendUploadToGCS, updatePicture);
Route.patch('/removepic/:id', authentication, authorAdmin, removePicture);
Route.post('/description/:id', authentication, authorAdmin, updateDescription);

module.exports = Route;