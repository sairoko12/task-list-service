const service = require('../../../services/listsearch')

const resolve = async (request, response) => {
	const body = request.body

	if (!Object.keys(body).includes('list'))
		response.status(400).json({
			error: "Missing list param"
		})

	if (!Object.keys(body).includes('target'))
		response.status(400).json({
			error: "Missing target param"
		})

	const list   = body.list
	const target = body.target
	const sortedList = list.sort((a, b) => a - b)
	const result = `:${service.listsearch(list, target)}:`

	response.json({
		success: true,
		sorted_list: sortedList,
		index: result,
		value: sortedList.includes(result) ? sortedList[result] : `The new value has key: ${result}`
	})
}

module.exports = {
    resolve: resolve
}