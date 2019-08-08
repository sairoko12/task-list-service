const TaskModel = require('mongoose').model('TaskList'), 
	  User = require('mongoose').model('User')

class TaskList {
	static validateCreateData(data) {
    	let errors = []

    	if (!data.user_id)
    		errors.push({
    			key: 'user_id',
    			error: 'required'
    		})

    	if (!data.name)
    		errors.push({
    			key: 'name',
    			error: 'required'
    		})

    	if (!data.status)
    		errors.push({
    			key: 'status',
    			error: 'required'
    		})

    	if (data.status && !['todo', 'doing', 'closed'].includes(data.status))
    		errors.push({
    			key: 'status',
    			error: 'invalid'
    		})

    	return errors
    }

    async get(id) {
    	let task = await TaskModel.findById(id).select({
    		_id: 0,
    		name: 1,
    		status: 1,
    		updatedAt: 1,
    		createdAt: 1
    	}).exec()

    	if (!task)
    		return {
    			success: false,
    			code: 404,
    			error: "Task not found"
    		}

    	return {
    		success: true,
    		result: task
    	}
    }

    async all(user_id) {
    	let tasks = await TaskModel.find({user: user_id}).exec()

    	if (tasks.length <= 0)
    		return {
    			success: false,
    			code: 404,
    			error: "Tasks not found."
    		}

    	return {
    		success: true,
    		result: tasks.map((value) => {
    			let taskObj = value.toObject()
    			let { user, _id, ...task } = taskObj
    			task.id = taskObj._id

    			return task
    		})
    	}
    }

    async create(data) {
    	let validate =  TaskList.validateCreateData(data)

    	if (validate.length >= 1)
    		return {
    			success: false,
    			error: validate,
    			code: 400
    		}

    	let user = await User.findById(data.user_id).exec()

    	if (!user)
    		return {
    			success: false,
    			code: 400,
    			error: `Not found user with ID ${data.user_id}`
    		}

    	try {
    		let task = new TaskModel({
	    		user: user,
	    		name: data.name,
	    		status: data.status
	    	})

	    	let created = await task.save()
	    	task = created.toObject()

	    	return {
	    		success: true,
	    		result: {
	    			id: task._id,
	    			name: task.name,
	    			status: task.status,
	    			update_at: task.updateAt
	    		}
	    	}
    	} catch (err) {
    		return {
    			code: 500,
    			error: err.toString(),
    			success: false
    		}
    	}
    }

}

module.exports = new TaskList()
