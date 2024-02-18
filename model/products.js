const mongoose = require('mongoose')
const { stringify } = require('qs')
const { boolean } = require('webidl-conversions')
const {Schema}= mongoose

const ProductShema = new Schema({
    name:{
        type:String,
        required:[true,'Product name must be provided']
    },
    price:{
        type:Number,
        required:[true,'Product price must be provided']
    },
    featured:{
        type:Boolean,
        default:false
    },
    rating:{
        type:Number,
        default:4.5
    },
    company:{
        type:String,
        enum:{
            values:['ikea', 'liddy', 'caressa', 'marcos'],
            message:'{VALUE} is not supported'
        }
    },
    createdAt:{
        type:Date,
        default:Date.now(),
    },
    


})

module.exports = mongoose.model('Product',ProductShema)