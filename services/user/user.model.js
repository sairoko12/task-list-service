const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        unique: true,
        required: "Username is required"
    },
    password: {
        type: String,
        required: "Password is required"
    },
    email: {
        type: String,
        unique: true,
        match: [/.+@.+\..+/, "Please enter a valid e-mail address"]
    }
}, {
    timestamps: true,
    toObject: {
        versionKey: false
    }
})

module.exports = mongoose.model('User', schema)
