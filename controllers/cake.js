const { Cake, Category } = require('../models')

module.exports = {
  newCake ( req, res, next ) {
    const { description, category } = req.body;
    Category.findOne({ name: category }, (err, category) => {
      if(err) next(err);
      else {
        Cake.create({ description, Category: category._id }, (err, cake) => {
          if(err) next(err);
          else res.status(201).json({ cake })
        })
      }
    })
  },
  updateDescription (req, res, next) {
    const { description } = req.body;
    Cake.findByIdAndUpdate(req.params.id, { description }, { new: true }, (err, cake) => {
      if(err) next(err);
      else res.status(200).json({ cake })
    })
  },
  updatePicture ( req, res, next ) {
    const CakeImage =  req.file.cloudStoragePublicUrl;
    Cake.findByIdAndUpdate(req.params.id, { $push: { CakeImage } }, { new: true }, (err, cake) => {
      if(err) next(err);
      else res.status(200).json({ cake })
    })
  },
  getOneCakeByCategory ( req, res, next ) {
    Cake.findOne({ Category: req.params.id }, (err, cake) => {
      if(err) next(err);
      else res.status(200).json({ cake })
    }).populate('Category')
  }
}