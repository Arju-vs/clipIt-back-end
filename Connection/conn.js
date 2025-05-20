const mongoose = require('mongoose')

const connectionString = process.env.connection_string

mongoose.connect(connectionString).then(()=>{
    console.log("MONGO ATLAS CONNECTED SUCCESSFULLY");
}).catch(err=>{
    console.log(err);
})