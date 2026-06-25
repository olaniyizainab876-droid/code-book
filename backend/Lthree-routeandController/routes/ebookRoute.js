const express = require('express');
const {adminProtect}=require("../middleware/authMiddleware");
const { createEbook,getAnEbook,getAllEbook, updateEbook} = require('../controller/ebookController');
const router=express.Router()


router.post("/createEbook",adminProtect,createEbook)
router.get("/singleEbook",getAnEbook)
router.get("/getAllEbook",getAllEbook)
router.get("/updateEbook",updateEbook)

module.exports=router 