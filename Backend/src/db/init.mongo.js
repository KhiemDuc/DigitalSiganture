const mongoose = require('mongoose')
const config = require('../configs/mongo.config')

const connectionString = `mongodb://${config.host}:${config.port}/${config.dbName}`


mongoose.connect(connectionString)
    .then(() => {
        console.log('Connected to mongodb')
    })
    .catch(err => {
        console.log(err)
    })
