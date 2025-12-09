const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const port = 3636;

app.use(express.json());
app.use(cors());

const mongoURL = "mongodb://localhost:27017/E-commerce";

mongoose
  .connect(mongoURL)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));


  const userRoutes=require("./router/userRoute");
  app.use("/user",userRoutes);


  const getData=require("./router/mixedRouter");
    app.use("/get",getData);
  

// const ecommerceSchema = new mongoose.Schema({
//   type: mongoose.Schema.Types.Mixed
// });

// const product = mongoose.model("ecommerce", ecommerceSchema, "ecommerce");

// app.get("/productGet", async (req, res) => {
//     const data = await product.find();
//     console.log(">>> Products:", data);
//     return res.status(200).send(data);
// });

// const newSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   email: {
//     type: String,
//     required: true,
//   },
//   password: {
//     type: String,
//     required: true,
//   },
// });

// const user = mongoose.model("exommerce", newSchema);

// app.post("/signup", async (req, res) => {
//   const { name, email, password } = req.body;

//   if (!(name && email && password)) {
//     return res.status(400).send({ message: "All inputs required" });
//   }

//   const signupUser = await user.create({ name, email, password });

//   return res.status(201).send({ message: "Signup Successful!" });
// });

// app.post("/login", async (req, res) => {
//   const { email, password } = req.body;

//   if (!(email && password)) {
//     return res.status(400).send({ message: "All inputs required" });
//   }

//   const exists = await user.findOne({ email });

//   if (!exists) {
//     return res.status(400).send({ message: "Invalid user! Signup first." });
//   }

//   if (password === exists.password) {
//     return res.status(200).send({ message: "Login Successful!" });
//   }

//   return res.status(401).send({ message: "Incorrect password!" });
// });

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
