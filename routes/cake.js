const Route = require('express').Router(),
  { CakeController } = require('../controllers'),
  { newCake, updatePicture, getOneCakeByCategory, updateDescription } = CakeController,
  { auth } = require('../middlewares'),
  { authentication, authorAdmin } = auth,
  images = require('../helpers/images')

Route.get('/:id', getOneCakeByCategory);
Route.post('/', authentication, authorAdmin, newCake);
Route.patch('/:id', authentication, authorAdmin, images.multer.single('image'), images.sendUploadToGCS, updatePicture);
Route.patch('/description/:id', authentication, authorAdmin, updateDescription);

module.exports = Route;