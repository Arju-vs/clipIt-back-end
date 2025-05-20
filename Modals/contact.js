const mongoose = require('mongoose')

const contactSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    subject:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    },
    status: { 
        type: String,
        default: "Not Replied" 
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
})

const Contact = mongoose.model('contact',contactSchema)
module.exports = Contact