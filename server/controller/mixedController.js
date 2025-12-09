const mixedUser=require("../model/MixedModel");

exports.productGet=async(req,res)=>{
  const getData=await mixedUser.find();
  console.log(`>>>>getData>>>`,getData);
  if(getData){
    return res.status(202).send(getData);
  }
}