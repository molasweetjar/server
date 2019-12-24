const { Testi } = require('../models'),
  { deleteFileFromGCS } = require('../helpers/images')

module.exports = {
  newTesti ( req, res, next ) {
    const testi_image =  req.file.cloudStoragePublicUrl;
    console.log(testi_image)
    Testi.create({ testi_image }, (err, testi) => {
      if(err) next(err);
      else res.status(201).json({ testi })
    })
  },
  getAllTesti (req, res, next) {
    Testi.find({}, (err, testi) => {
      if(err) next(err);
      else res.status(200).json({ testi })
    })
  },
  deleteTesti (req, res, next) {
    Testi.findById(req.params.id, (err, testi) => {
      if(err) next(err)
      else{
        deleteFileFromGCS(testi.testi_image)
        Testi.findByIdAndDelete(req.params.id, (err) => {
          if(err) next(err)
          else res.status(200).json({ msg: 'testi success deleted!' })
        })
      }
    })
  }
}