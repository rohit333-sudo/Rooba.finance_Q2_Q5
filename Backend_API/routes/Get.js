const express=require('express');
const getRouter=express.Router();
const model=require('../models/User.js');
const  getData= async (req,resp)=>{
    try
    {

        const users = await model.find({});
        // Do not return the password in the response
        users.forEach((user) => (user.Password = undefined));
        resp.json(users);
    }
    catch(err)
    {
        console.log(err)
        resp.json({
            msg:"server error"
        })
    }
}
getRouter.route('/') 
.get(getData)

module.exports=getRouter;