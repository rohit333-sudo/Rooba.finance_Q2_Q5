
const model=require('../models/User.js');// Make sure to adjust the path if needed
const express=require('express');
const dataRouter=express.Router();

const  dataAggregate= async (req,res)=>{
    try {
       
        // MongoDB Aggregation Query
       await model.aggregate([
       
              // MongoDB Aggregation Query
          {
            $group: {
              _id: null,
              totalUsers: { $sum: 1 },
              averageAge: { $avg: "$Age" },
              countries: {
                $push: {
                  country: "$Country",
                  userCount: 1
                }
              }
            }
          },
          {
            $unwind: "$countries"
          },
          {
            $group: {
              _id: "$countries.country",
              totalUsers: { $first: "$totalUsers" },
              averageAge: { $first: "$averageAge" },
              userCount: { $sum: "$countries.userCount" }
            }
          },
          {
            $group: {
              _id: null,
              totalUsers: { $first: "$totalUsers" },
              averageAge: { $first: "$averageAge" },
              countries: { $push: { country: "$_id", userCount: "$userCount" } }
            }
          },
          {
            $project: {
              _id: 0,
              totalUsers: 1,
              averageAge: 1,
              countries: 1
            }
          }
        ]).then((result) => {
            // console.log(result);
            res.json(result)
            // mongoose.connection.close();
          });
    
       
      } catch (error) {
        console.error('Error:', error);
      } 
}
dataRouter.route('/').get(dataAggregate)

module.exports=dataRouter;

   
