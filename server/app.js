const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());
const cors = require("cors");
app.use(cors());
const bcrypt = require("bcryptjs");
const jwt=require("jsonwebtoken");

const JWT_SECRET =
  "hvdvay6ert72839289()aiyg8t87qt72393293883uhefiuh78ttq3ifi78272jbkj?[]]pou89ywe";


const mongoUrl =
  "mongodb+srv://vidath:vidath99@elephatrack.rr2syjv.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("connected to database");
  })
  .catch((e) => console.log(e));

require("./userDetails");

const User = mongoose.model("UserInfo");
app.post("/register", async (req, res) => {

  const { fname, lname, email, password } = req.body;

  const encryptedPassword = await bcrypt.hash(password, 10);

  try {

    const oldUser = await User.findOne({ email }).collation({});

    if (oldUser) {
      return res.send({ status: "User Exists" });
    }

    User.create({
      fname,
      lname,
      email,
      password: encryptedPassword,
    });
    res.send({ status: "ok" });

  } catch (error) {

    res.send({ status: "error" });
  }
});

app.post("/login-user",async(req,res)=>{
  const { email, password } = req.body;
  const user = await User.findOne({ email }).collation({});
  if (!user) {
    return res.json({ error: "User Not Found" });
  }
  if (await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({email:user.email}, JWT_SECRET);
    if (res.status(201)){
      return res.json({ status: "ok", data: token});
    }else{
      return res.json({ error: "error"});
    }      
    }
    res.json({ status: "error", error: "Invalid Password"});
});

app.post("/userData", async (req, res) => {
  const { token } = req.body;
  try{
    const user=jwt.verify(token,JWT_SECRET);
    console.log(user);
    const usermail = user.email;
    User.findOne({ email: usermail}).collation({})
    .then((data) => {
      res.send({ status: "ok", data: data});
    })
    .catch((error) => {
      res.send({ status: "error", data: error});
    });
  }catch (error){

  }
});

app.listen(5000, () => {
  console.log("server started");
});
