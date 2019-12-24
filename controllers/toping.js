const { Topping } = require('../models')

module.exports = {
  newTopping ( req, res, next ) {
    const { name } = req.body;
    Topping.create({ name }, (err, topping) => {
      if(err) next(err);
      else res.status(201).json({ topping })
    })
  },
  getAllToping ( req, res, next ) {
    Topping.find({}, (err, topping) => {
      if(err) next(err)
      else res.status(200).json({ topping })
    })
  }
}