var mongoose = require('mongoose')
url = 'mongodb://localhost:27017/shopping'

mongoose.connect(url).then(()=>{
    console.log('db connected')
}).catch((err)=>{
    console.log(err)
})

module.exports = mongoose