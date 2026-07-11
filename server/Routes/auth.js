const express = require("express");
const bcrypt = require("bcrypt");
const userModel = require("../models/User");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await userModel.findOne({ username });

    if (user) {
      return res.json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new userModel({
      username,
      password: hashedPassword,
    });

    await newUser.save();

    res.json({ message: "Record saved successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await userModel.findOne({ username });

  if(!user){
    return res.json({message: "Wrong Credintials"});
  }
  const validPassword = await bcrypt.compare(password, user.password);
  if(!validPassword) {
    return res.json({message: "Wrong Credintials"});
  }
  const token = jwt.sign({id: user._id}, "secret");
  res.cookie("token", token)
  return res.json({message: "Login Successful", id: user._id});

});

router.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out successfully" });
});

module.exports = router;