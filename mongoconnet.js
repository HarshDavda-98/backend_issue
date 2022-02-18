const mongoose = require('mongoose');
const dotenv = require("dotenv")  
dotenv.config({path:"./config.env"})
const DB =process.env.DATABASE;
const DataBase = mongoose
   .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
   .then((req,res) =>
    console.log(" mongoose Connection Start")
     )
   .catch((err) => console.log(err.message));

   module.exports = DataBase;