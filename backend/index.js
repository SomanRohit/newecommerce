var express = require('express');
var http = require('http')
var bodyParser = require('body-parser')
var mongoose = require('./config/Developmant')
var router = express.Router();
const cors = require("cors");
var product = require("./controller/productController")
var user = require('./controller/userController')
var cart = require('./controller/cartController')
var corsOptions = {
    origin: "http://localhost:3000"
  };

var app = express()
app.use(bodyParser.json())
app.use(express.static("images"));
app.use(cors(corsOptions));
app.use('/api',product)
app.use('/api',user)
app.use('/api',cart)

app.listen(8000,()=>{
    console.log('server started')
})