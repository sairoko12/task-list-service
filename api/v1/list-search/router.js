const express = require('express')
const router = express.Router()

const { resolve } = require('./controller')

router.post('/', resolve)

module.exports = router