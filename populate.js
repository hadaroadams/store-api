require('dotenv').config()
const mongoose = require('mongoose')
const connectDB = require('./config/dbconn')
const Products = require('./model/products')
const AllProduct = require('./products.json')


console.log(AllProduct)


const start = async ()=>{
    try{
        await connectDB()
        await Products.deleteMany()
        await Products.create(AllProduct)
        console.log('Data successfull pasted')
        process.exit()
    }catch(error){
        console.log(error)
        process.exit(1)
    }   
}

start()