
const app = require("./index")
const connect = require("./src/configs/db")
const cloudinary = require("cloudinary")
const dotenv = require("dotenv")
dotenv.config()

const port = process.env.PORT || 3333


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})

app.listen(port,async() => {
    await connect().then(()=> {
        console.log("db is connected")

    })
    console.log("listening on port 3333")
})
