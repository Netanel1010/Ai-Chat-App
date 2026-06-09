const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
//const bodyParser = require('body-parser');
require('dotenv').config();


const app = express();
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type"]
}));
app.use(express.json());

const PORT = process.env.PORT || 3000;


mongoose
.connect(process.env.MONGO_URI)
.then(() => { console.log("MongoDB Connected");})
.catch((err) => {console.error(err);});

//openai || gemini
const chatRoute = require('./routes/chat.js');
app.use('/api' , chatRoute);

//chack models from gimini
const modelsRoute = require("./routes/models");
app.use("/api", modelsRoute);

app.get('/', (req,res)=>{
    res.send("<h1>server is running!</h1>");
})

app.listen(PORT , ()=>{
    console.log(`server is running on http://localhost:${PORT}`);
})