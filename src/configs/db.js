const mongoose = require("mongoose")

const dotenv = require("dotenv")

dotenv.config()

const url = process.env.MONGO_URL

const connect = () => {
    return mongoose.connect(url)
}

module.exports = connect;