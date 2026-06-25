const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { addTocart,
     removeFromCart,
     getUserCart,
     clearCart
}=require("../controller/cartController")

const router=express.Router()

router.post("/addToCart",protect,addTocart)
router.delete("/removeFromCart",protect,removeFromCart)
router.delete("/clearCart",protect,clearCart)
router.post("/getUserCart",protect,getUserCart)

module.exports=router