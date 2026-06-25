const express = require('express');
const { registerUser, registerAdmin,loginUser,logoutUser, getUserprofile, loginStatus } = require('../controller/userController');
const { protect } = require('../middleware/authMiddleware');


const router=express.Router()
router.post('/registerUser',registerUser)
router.post('/registerAdmin',registerAdmin)
router.post('/loginUser',loginUser)
router.post('/logoutUser',logoutUser)
router.get('/getUserprofile', protect,getUserprofile)
router.get('/loginStatus',loginStatus)




module.exports=router                         