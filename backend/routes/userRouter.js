const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/user.model");
require("dotenv").config();

// Created User Routes Here
const userRouter = express.Router();

// Response and Payload is done in Json Format
userRouter.use(express.json())

// User Register Route
userRouter.post('/register', (ask, give) => {
    let { name, email, password } = ask.body;
    bcrypt.hash(password, 3, async (err, hashed) => {
        if (hashed) {
            let user = new UserModel({ name, email, 'password': hashed });
            await user.save();
            give.send({ "status":true,name })
        }else{
             give.send({ "status":false })
        }
    })
});

// User Login Route
userRouter.post('/login', async (ask, give) => {
    let { email, password } = ask.body;
    let user = await UserModel.findOne({ email });
    if(user){
        let hash = user.password;
    bcrypt.compare(password, hash, async (err, result) => {
        if (result) {
            let token=jwt.sign({"_id":user._id},process.env.secret);
            give.send({ "status":true,"token":token,"name":user.name});
        } else {
            give.send({ "status":false })
        }
    })
    }else{
        give.send({"status":"medium"})
    }
    
});

// Contacts Route - Returns All Contacts
userRouter.get("/",async(ask,give)=>{
    try {
        const names = await UserModel.distinct("name").lean().exec();
        give.json(names);
      } catch (err) {
        give.send({Error:""});
      }
})

// Exported the User Router
module.exports = {
    userRouter
}