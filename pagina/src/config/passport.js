const passport = require('passport');
require('dotenv').config();
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');

passport.use(new LocalStrategy({
usernameField: 'email'

},  async (email, password, done) =>{
const user = await User.findOne({email: email});
if(!user) {
    return done(null, false, {message: 'No se encontró el usuario'})
} else {
    const match= await user.matchPwd(password);
    if (match){
        return done(null, user);
    } else {
        return done(null, false, {message: 'password incorrecto'});
    }
}
} ));


passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: "/"
  },
  async(accessToken, refreshToken,profile,done)=>{
    console.log(profile);
    const newUser = {
      _id  : profile.id,
      nombre    : profile.displayName,
      email     : profile.email
      
    }
    try{
      let user = await User.findOne({_id : profile.id});

      if(user) {
        done(null,user)
      }
      else {
        
        user= await User.save();
        done(null,user); 
      }
    }catch(err) {
      console.log(err);
    }
}));
  


passport.serializeUser((user, done) => {
done(null, user.id);
});

passport.deserializeUser((id, done)=>{
User.findById(id,(err, user)=>{
done(err, user);
});
});