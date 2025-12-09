const mongoose=require("mongoose");

const ecommerceSchema = new mongoose.Schema({
  type: mongoose.Schema.Types.Mixed
});

module.exports=mongoose.model("ecommerce", ecommerceSchema, "ecommerce");