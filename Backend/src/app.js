const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')
const cors = require('cors')
const swaggerDocs = require('../swagger')
const {NotFoundError} = require('./core/error.response')
require('./db/init.mongo')

const app = express() 

//app middlewares
app.use(cors({
    origin: '*'
}))
// app.use(helmet())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended:false}))

// app routers
app.use(require('./routers'))

// 404 error handler

swaggerDocs(app)


app.use((req, res, next) => {
    const err = new NotFoundError('Page Not Found')
    next(err)
})

//app error handler
app.use((err, req, res, next) => {
    const status = err.status || 500
    return res.status(status).json({
        message: err.message || 'Internal server error',
        reason: err.reason,
        path: req.url,
        stack: status === 500 ? err.stack : undefined
    })
})

module.exports = app