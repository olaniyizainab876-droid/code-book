const express = require('express');

const {protect}=require("../middleware/authMiddleware")
const{placeOrder,getUserOrders,getOrderById} =require("../controller/orderController")
const router=express.Router()

router.post("/placeOrders",protect,placeOrder)
router.get("/getUsersOrders",protect,getUserOrders,)
router.get("/getUsersById/:id",protect,getOrderById)

module.exports=router;