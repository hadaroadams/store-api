const mongoose = require('mongoose')

const connectDB = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_DATABASE_URL)
    }catch(erro){
        console.log(erro)
    }
}

module.exports = connectDB