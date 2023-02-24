var GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport=require("passport");
const jwt = require("jsonwebtoken");
const { UserModel } = require('./models/user.model');
require("dotenv").config();


passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://127.0.0.1:3000/auth/google/callback"
  },
  async function(accessToken, refreshToken, profile, cb) {
    let euser=await UserModel.findOne({email:profile.emails[0].value});
    if(euser){
      let token=jwt.sign({"_id":euser._id},process.env.secret);
      profile["t"]=token;
    }else{
      let nuser= new UserModel({email:profile.emails[0].value,name:profile.name.givenName})
      await nuser.save();
      euser=await UserModel.findOne({email:profile.emails[0].value});
      let token=jwt.sign({"_id":euser._id},process.env.secret);
      profile["t"]=token;
    }
    
    module.exports={
      profile
    }
     function User(err, user) {
      return cb(err, user);
    }
    User()
    
  }
));
  

module.exports={passport}