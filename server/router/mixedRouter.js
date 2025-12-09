const express=require("express");
const route=express.Router();
const mixedController=require("../controller/mixedController");

route.get("/productGet",mixedController.productGet);


module.exports=route;