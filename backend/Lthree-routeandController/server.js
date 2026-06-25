const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const userRoutes=require("./routes/userRoutes")
const ebookRoute=require("./routes/ebookRoute")
const cartRoute=require("./routes/cartRoute")
const orderRoute=require("./routes/orderRoute")

dotenv.config();

//setting port 
const PORT =process.env.PORT || 3000

const app=express();

app.use(express.json())
app.use(express.urlencoded({extended:true})) 
app.use(cookieParser()) 

//login middleware -log all incoming request 

app.use((req,res,next)=>{
     console.log(`${new Date().toISOString()}-${req.method} ${req.path}`)
     next()
})


//welcome message
app.get("/",(req,res)=>{
     res.send("hello welcome to code book!!!")
})

//Health check end point 
app.get("/health",(req,res)=>{
     res.json({status:"ok",messages:"server is running" })
})
app.use("/api/users",userRoutes)
app.use("/api/ebook",ebookRoute)
app.use("/api/Cart",cartRoute)
app.use("/api/order",orderRoute)


//start server and connect to database 
try{
     const server =app.listen(PORT,() =>{
          const address = server.address()
          console.log(`you,we are live on ${PORT}`)
          console.log('server address:',address)
          console.log(`server running on http://localhost:${PORT}`)

          console.log("MONGO_URI:", process.env.MONGO_URI);


          //connection to database 
          mongoose.connect(process.env.MONGO_URI)
          .then(()=> console.log("connected to database"))
          .catch((error)=>{
               console.log("Message  connection error:",error.message);
               console.log("server will continue running without database connection ");
          })

     }) 

     //Handle servers errors 
     server.on('error',(error)=>{
          if(error.code ==='EADDRINUSE'){
               console.error(`port ${PORT} is already in use.please stop the process or use a different port`)
          }else{
               console.error('server error:',error)
          }
     })

     //log when server is ready 
     server.on('listening',()=> {
          const address=server.address();
          console.log(` server is now listening and ready to accepts connections on port ${address.port}`)
     })
} catch(error){
     console.error('failed to start server:',error)
     process.exit(1)
} 