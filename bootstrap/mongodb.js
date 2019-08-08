const mongoose = require('mongoose')    

module.exports =  () => {
    const connection = mongoose.connect(
        "mongodb://mongodb:27017/task-service",
        {
        	useNewUrlParser: true
        }
    )

    mongoose.set('useCreateIndex', true)

    // Load models
    require('../services/tasklist/tasklist.model')
    require('../services/user/user.model')

    return connection
}
