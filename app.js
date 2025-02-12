const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoSanitize = require('express-mongo-sanitize');
const { rateLimit } = require('express-rate-limit');
const helmet = require('helmet');
const hpp = require('hpp');
const path = require('path');



const route = require("./src/Routes/api")


const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 2000, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	
});


//Security Middleware
app.use(limiter)
app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use(mongoSanitize())
app.use(helmet())
app.use(hpp())


app.use(express.static('uploads'));




// Routing Implement
app.use("/api/v1", route )


//Front End Router Define
// app.get('*', function (req, res){
//     res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'))
// })




//Root Rought
app.get("/", (req, res) =>{
    res.send("GYM Server is running")
})


//Undefined Route
// app.use("*", (req, res) =>{
// 	res.status(404).json({status: "fail", data: "Page Not Found"})
// });








module.exports = app