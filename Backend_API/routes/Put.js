const express=require('express');
const putRouter=express.Router();
const model=require('../models/User.js');
const  putData= async (req,res)=>{
    try {
       
        const updatedUser = await model.findOneAndUpdate({Email:req.params.email}, req.body, {
            new: true,
          });
    
        if (updatedUser) {
          updatedUser.Password = undefined;
          res.json(updatedUser);
        } else {
          res.status(404).json({ error: 'User not found' });
        }
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
}
putRouter.route('/:email').put(putData)

module.exports=putRouter;