const mongoose = require('mongoose')

const workSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    }
})

const works = mongoose.model('works',workSchema)
module.exports = works