const service =  require('./user')
const jwtMiddleware = require('./jwt.middleware')

module.exports = {
    create: service.create,
    login: service.login,
    getByEmail: service.getByEmail,
    jwtMiddleware: jwtMiddleware
}
