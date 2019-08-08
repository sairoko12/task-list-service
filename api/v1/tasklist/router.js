const express = require('express')
const router = express.Router()
const jwtMiddleware = require('../../../services/user').jwtMiddleware

// Add jswt middleware
router.use(jwtMiddleware)

const { get, post, all } = require('./controller')

router.get('/', all)

router.get('/:id', get)

router.post('/', post)

module.exports = router
