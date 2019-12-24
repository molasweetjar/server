module.exports = {
  hashPassword ( password ) { return require('bcryptjs').hashSync( password, require('bcryptjs').genSaltSync(10) ) },
  comparePassword ( password, hashPassword ) { return require('bcryptjs').compareSync( password, hashPassword ) }
}