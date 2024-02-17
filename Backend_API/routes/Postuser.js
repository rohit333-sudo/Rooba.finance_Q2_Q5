const express=require("express");
const bcrypt=require('bcrypt')
const postRoute=express.Router();
const model=require('../models/User.js');
const jwt=require("jsonwebtoken") 
const jwt_key="2132456!@#345465" 
express().use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin,X-Requested-With,Content-Type,Accept");
    next();
   });

   
const  saveUser= async (req,resp)=>{
    // console.log('working')
    // console.log(req.body)
 let salt = await bcrypt.genSalt(10);
 let pass = await bcrypt.hash(req.body.Password,salt)
//  console.log(pass)

const newUser = new model({
    ...req.body,    Password: pass,

  });

  // Save the user to the database 
 await newUser.save()
    .then((savedUser) => {
      console.log('User saved:');
      let token =jwt.sign({payload:savedUser._id},jwt_key)
      // console.log(token)
      resp.cookie('auth',token);
    }) 
    .catch((error) => {
      console.error('Error saving user:', error);
    });
resp.json({
    msg:" post user data recieved and saved to db ",
 
})
}


  
   
postRoute.route('/') 
.post(saveUser)


module.exports=postRoute;

 