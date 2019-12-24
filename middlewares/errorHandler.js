module.exports = (err, req, res, next) => {
  console.log(err)
  const status = err.status || 500
  const msg = err.msg || 'Internal Server Error'
  if(err.name === 'ValidationError') {
    const error = []
    for(key in err.errors) {
      error.push(err.errors[key].message)
    }
    res.status(400).json({
      msg: 'validation error',
      error
    })
  } else if(err.name == 'JsonWebTokenError') {
    res.status(403).json({msg: err.message})
  }
  else {
    res.status(status).json({ msg })
  }
}
