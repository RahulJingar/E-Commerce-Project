const user = require("../model/userModel");
const bcrypt = require("bcrypt");

exports.signup = async (req, res) => {
  const { name, email, password } = req.body;

  if (!(name && email && password)) {
    return res.status(400).send({ message: "All inputs required" });
  }

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  console.log(`>>>>hash>>>`, hash);

  const data = {
    name,
    email,
    password: hash,
  };

  const signupUser = await user.create(data);
  console.log(`>>>signup>>`, signupUser);

  return res
    .status(201)
    .send({ message: "Signup Successful!", data: signupUser });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!(email && password)) {
    return res.status(400).send({ message: "all input field are required" });
  }
  const existUser = await user.findOne({ email });
  if (!existUser) {
    return res
      .status(400)
      .send({ message: "user is invalid please signup first" });
  }else{
     return res.status(202).send({ message: "user login successfully" });
  }
};


exports.reset=async(req,res)=>{
  const {email,oldPassword,newPassword}=req.body;
  if(!(email&&oldPassword&&newPassword)){
    return res.status(400).send({message: "all input field are required"})
}

const existUser=await user.findOne({email});
if(!existUser){
  return res.status(400).send({message: "invalid user"})
}

const dbPassword=existUser.password;

const userNewPassword=await bcrypt.compare(oldPassword,dbPassword);

if(!userNewPassword){
  return res.status(400).send({message: "invalid password"})
}
  const salt=bcrypt.genSaltSync(10);
  const hash=bcrypt.hashSync(newPassword,salt);

const data={
  password: hash
}


const id=existUser._id;
const result=await user.findOneAndUpdate(id,data);

if(result){
  return res.status(200).send({message: "reset successfully",
    data: result
  })
}

}



exports.forget=async(req,res)=>{
  const {email,newPassword}=req.body;
  if(!(email&&newPassword)){
    return res.status(400).send({message: "all input field are required"});
  }

  const existUser=await user.findOne({email});
  if(!existUser){
    return res.status(400).send({message: "invalid user"});
  }

  const salt=bcrypt.genSaltSync(10);
  const hash=bcrypt.hashSync(newPassword,salt);

  const data={
    password: hash
  }

  const id=existUser._id;

  const result=await user.findOneAndUpdate(id,data);

  if(result){
    return res.status(200).send({message: "forget successfully",
      data: result
    })
  }

}
