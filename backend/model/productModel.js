var mongoose = require('mongoose')
var Schema = mongoose.Schema

var Product = new Schema({
    name: {type : String, require: true},
    image: {type : String, require: true},
    price: {type : String, require: true},
    description: {type : String, require: true}
})

mongoose.model('product', Product)