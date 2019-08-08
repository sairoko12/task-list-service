const service = require('../../../services/tasklist')

const send = (response, data) => {
	if (data.success)
		return response.json(data.result)
	else
		return response.status(data.code).json({
			error: data.error
		})
}

const all = async (request, response) => {
	const user_id = request.user.id
	const data = await service.all(user_id)

	send(response, data)
}

const get = async (request, response) => {
	const task_id = request.params.id
	const data = await service.get(task_id)

	send(response, data)
}

const post = async (request, response) => {
	const body = request.body
	const user_id = request.user.id
	body.user_id = user_id
	const data = await service.create(body)

	send(response, data)
}

module.exports = {
    get: get,
    post: post,
    all: all
}