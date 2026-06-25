const mongoose = require('mongoose');
const userModel = require('./userModel');

const  cartSchema =new mongoose.Schema({
     userId:{
          type: mongoose.Schema.Types.ObjectId,
          ref:"user",
          required:true,
          unique:true,
     },
     cartList:{
          type:Array,
          default:[]
     }
})
module.exports=mongoose.model("cart",cartSchema)