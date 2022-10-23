require('dotenv').config()
const express = require('express')
const http = require("http")
const cors = require('cors')
const mongoose = require("mongoose")
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')

const createMyServer = require('./utils/server')
const app = createMyServer()
module.exports = app

// const app = express()
const server = http.createServer(app)
const PORT = 5000

// app.use(cors())
// app.use(express.json())
// app.use('/', router)
// app.use(errorHandler)

/*app.get('/', (req, res) => {
    res.status(200).json({message: 'WORKING !!!'})
})*/

const start = async () => {
    try {
//        await sequelize.authenticate()
//        await sequelize.sync()

        mongoose.connect(process.env.MONGODB_URI, { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false }, function(err) {
            if (err) return console.log(err);

        server.listen(PORT, () => console.log(`Server started on port ${PORT}`))
        });

    } catch (e) {
        console.log(e)
    }
}

start()



