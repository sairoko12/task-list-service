const User = require('mongoose').model('User')
const Bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')
const config = require('../../config')

module.exports =  {
    async create(data) {
    	// Hashing password
    	data.password = Bcrypt.hashSync(data.password, 10)

        try {
        	let user = new User(data)
	        let created = await user.save()
	        let userCreated = created.toObject()

	        return {
	        	success: true,
	        	result: {
	        		id: userCreated._id,
	        		username: userCreated.username,
	        		created_at: userCreated.createdAt
	        	}
	        }
        } catch (err) {
        	return {
        		success: false,
        		error: err,
        		code: 500
        	}
        }
    },

    async login(data) {
    	let user = await User.findOne({ username: data.username }).exec()

    	try {
    		if (!user)
	            return {
	            	success: false,
	            	code: 400,
	            	error: { message: "The username does not exist." }
	            }

	        if (!Bcrypt.compareSync(data.password, user.password))
	        	return {
	            	success: false,
	            	code: 400,
	            	error: { message: "The password is invalid." }
	            }

	        let token = jwt.sign({
	        	id: user._id,
	        	email: user.email
	        }, config.jwt.secret, 
	        { 
	        	expiresIn: '24h'
	        })

	        return {
	        	success: true,
	        	result: {
	        		login: true,
	        		token: token
	        	}
	        }
    	} catch (err) {
    		return {
        		success: false,
        		error: err.toString(),
        		code: 500
        	}
    	}
    },

    async getByEmail(email) {
    	let user = await User.findOne({ email: email }).exec()

    	try {
    		if (!user)
	            return {
	            	success: false,
	            	code: 400,
	            	error: { message: "The username does not exist." }
	            }


	        return {
	        	success: true,
	        	result: {
	        		id: user._id,
	        		username: user.username,
	        		email: user.email,
	        		created_at: user.createdAt
	        	}
	        }
    	} catch (err) {
    		return {
        		success: false,
        		code: 500,
        		error: err.toString()
        	}
    	}
    }
}
