const express = require('express')
const router = express.Router()
const jwtMiddleware = require('../../../services/user').jwtMiddleware
const { post, login, get } = require('./controller')

router.post('/', post)

router.get('/', jwtMiddleware, get)

router.post('/login', login)

module.exports = router
