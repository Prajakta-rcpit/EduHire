const express = require("express")
const mongoose = require("mongoose")
require("dotenv").config()
const app = express();
const router = require('../route')
const PORT = process.env.PORT || 4000;
const MONGODB_URL = process.env.MONGODB_URL
const cookieParser = require('cookie-parser')
const cors = require("cors")

app.use(
    cors({
      origin: [
        "http://localhost:3000",
      ],
      credentials: true,
    })
  );
app.use(express.json())
app.use(cookieParser())
app.use('/api/v1',router)

const dbConnect = mongoose.connect(MONGODB_URL).then(()=>{
    console.log("DB CONNECTED");
}).catch(()=>{
    console.log("Something went wrong file DB CONNECTION");
    
})


app.get("/",(req,res)=>{
    res.send("HOME API")
})



app.listen(PORT,()=>{
    console.log(`Server Running on PORT ${PORT}`);    
})