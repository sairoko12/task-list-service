const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const VERSION = 'v1'

if(process.env.NODE_ENV == 'develop')
	app.use(require('morgan')('dev'))

const config = require('./config')

app.use(bodyParser.json())

app.use((request, response, next) => {
  request.header('Content-Type', 'application/json')
  next()
})

require('./bootstrap/mongodb')()

//Load routers
const taskListApp = require(`./api/${VERSION}/tasklist/router`)
app.use(`/${VERSION}/task-list`, taskListApp)

const userApp = require(`./api/${VERSION}/user/router`)
app.use(`/${VERSION}/user`, userApp)

const listSearchApp = require(`./api/${VERSION}/list-search/router`)
app.use(`/${VERSION}/list-search`, listSearchApp)

app.listen(config.server.port)

module.exports = app
