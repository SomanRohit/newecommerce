var mongoose = require('mongoose')
var Schema = mongoose.Schema

var User = new Schema({
    username: {
        type : String, 
        require: true,
        unique: true,
    },
    password: {
        type : String, 
        require: true
    },
    role: {
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: Date.now,
      },
})

mongoose.model('user', User)