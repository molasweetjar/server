const { Category } = require('../models')

module.exports = {
  createCategory ( req, res, next ) {
    const { name } = req.body;
    Category.create({ name }, (err, category) => {
      if(err) next(err);
      else res.status(201).json({ category })
    })
  },
  getAllCategory ( req, res, next ) {
    Category.find({}, (err, category) => {
      if(err) next(err);
      else res.status(200).json({ category })
    })
  }
}