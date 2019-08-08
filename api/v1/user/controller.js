const service = require('../../../services/user')

const send = (response, data) => {
	if (data.success)
		return response.json(data.result)
	else
		return response.status(data.code).json({
			error: data.error
		})
}

const get = async (request, response) => {
	const jwt = request.user
	const data = await service.getByEmail(jwt.email)

	send(response, data)
}

const post = async (request, response) => {
    const body = request.body
    const data = await service.create(body)
    
    send(response, data)
}

const login = async (request, response) => {
	const body = request.body
	const data = await service.login(body)

	console.log(data)

	send(response, data)
}

module.exports = {
    post: post,
    login: login,
    get: get
}