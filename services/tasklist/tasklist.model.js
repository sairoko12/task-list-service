const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const schema = new mongoose.Schema({
	user:[
      {
      	type: ObjectId, 
      	ref: 'User'
      }
    ],
    name: {
    	type: String,
    	required: "Name of task is required",
    	minLength: 15,
    	maxLength: 200
    },
    status: {
    	type: String,
    	lowercase: true,
    	required: true,
    	validate: (input) => ["todo", "doing", "closed"].includes(input)
    }
}, {
    timestamps: true,
    toObject: {
        versionKey: false
    }
})

module.exports = mongoose.model('TaskList', schema)
