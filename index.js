 const express = require("express")

 const app = express()
 const bodyParser = require("body-parser")
 const fileUpload = require("express-fileupload")
 const cookieParser = require("cookie-parser")

 const dotenv = require("dotenv")
 const errorMiddleware = require("./src/middleware/error")
 const path = require("path")
 const cors = require('cors')

 if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
  }
 app.use(cors()) 
 app.use(express.json())
 app.use(cookieParser())
 app.use(bodyParser.urlencoded({extended:true}))
 app.use(fileUpload())
 
 app.get("/", async(req,res) => {
   
  res.send("Hello")
 })

 const productRoute = require("./src/routes/productRoute")
 const userRoute = require("./src/routes/userRoute")
 const orderRoute = require("./src/routes/orderRoute")
 const paymentRoute = require("./src/routes/paymentRoute")
 app.use(errorMiddleware)

 app.use("/irshath-e-commerce-store", productRoute)
 app.use("/irshath-e-commerce-store", userRoute)
 app.use("/irshath-e-commerce-store", orderRoute)
 app.use("/irshath-e-commerce-store", paymentRoute)


 module.exports = app