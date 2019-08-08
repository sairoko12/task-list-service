const jwt = require('jsonwebtoken')
const config = require('../../config')

module.exports = (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers['authorization']

  if (!token)
    return res.status(400).json({
      success: false,
      message: "Missing auth header"
    })

   // Express headers are auto converted to lowercase
  if (token.startsWith('Bearer') && token.split(' ').length >= 2)
    token = token.split(' ')[1]

  if (token) {
    jwt.verify(token, config.jwt.secret, (err, decoded) => {
      if (err) {
        return res.status(400).json({
          success: false,
          message: 'Token is not valid'
        })
      } else {
        req.user = decoded

        next()
      }
    })
  } else {
    return res.status(400).json({
      success: false,
      message: 'Auth token is not supplied'
    })
  }
}