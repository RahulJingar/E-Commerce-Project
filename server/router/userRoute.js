const express=require("express");
const router=express.Router();
const userController=require("../controller/userController");

router.post("/signup",userController.signup);
router.post("/login",userController.login);
router.patch("/reset",userController.reset);
router.patch("/forget",userController.forget);


module.exports=router;