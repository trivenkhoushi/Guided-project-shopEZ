const mongoose = require("mongoose")
const mongoDbUrl='mongodb://127.0.0.1:27017/Gift?retryWrites=true&w=majority'

const connectDb=()=>{
    return mongoose.connect(mongoDbUrl)
}

module.exports={connectDb}