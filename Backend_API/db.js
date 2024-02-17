const mongoose = require("mongoose");
// password   =   RzZnJrzcs4c0HZTY
const url =
  "mongodb+srv://rohitjakhmola666:RzZnJrzcs4c0HZTY@cluster0.kfpjhtu.mongodb.net/?retryWrites=true&w=majority";
const db = () => {
  mongoose
    .connect(url)

    .then(async () => {
      console.log("Connected to MongoDB using Mongoose");
    })
    .catch((error) => {
      console.error("Mongoose connection error:", error);
    });
};

module.exports = db;
