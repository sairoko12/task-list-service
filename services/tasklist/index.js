const service =  require('./tasklist')

module.exports = {
    get: service.get,
    create: service.create,
    all: service.all
}
