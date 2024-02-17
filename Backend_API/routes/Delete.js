const express=require('express');
const delRouter=express.Router();
const model=require('../models/User.js');
const  deleteData= async (req,res)=>{
    const emailToDelete = req.params.email;
//     console.log(req.params)
// console.log(emailToDelete)
  try {
    // Find and delete the user with the specified email
    const deletedUser = await model.findOneAndDelete({ Email: emailToDelete });

    if (deletedUser) {
      // Do not return the password in the response
      deletedUser.Password = undefined;
   
      res.json(deletedUser);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
delRouter.route('/:email').delete(deleteData)

module.exports=delRouter;