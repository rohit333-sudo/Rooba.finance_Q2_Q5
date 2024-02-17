
const express=require("express");
const db=require('./db.js');
const app=express();
app.use(express.json())
const post=require("./routes/Postuser.js");
const get=require("./routes/Get.js");
const del=require("./routes/Delete.js");
const put=require("./routes/Put.js");
const data=require("./routes/DataAggregate.js");
const requestLogger = require('./middleware/logger.js');

const cors = require('cors'); 
// 👇️ configure CORS
app.use(cors());
const PORT=5000;

app.listen(PORT,()=>{console.log('listening')})
app.use(requestLogger);
db(); 
//  data()

app.use('/post/user',post)
app.use('/get/user',get)
app.use('/del/user',del)
app.use('/put/user',put)
app.use('/data/aggregate',data)