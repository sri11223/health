// using express
const express=require("express")
const app=express()
const cors = require("cors");

// using cross platform for better communication between frontend and backend





// connting to data base and activating local host 
const connectDb=require('./utility/db')
port=5000
connectDb().then(()=>{
    app.listen(port,()=>{console.log("server startted")});

})

// middlewares
const errorMiddleware = require("./middleware/error-middleware")
app.use(express.json())
app.use(errorMiddleware);
app.use(cors())


// using routers for different paths
const authrouter = require('./router/auth-router');
app.use('/api/auth',authrouter);


