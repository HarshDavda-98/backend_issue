const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  id:{
    type:Number
  },
  username: {
    type:String,
  },
  user_type: {
    type:String,
  },
  email: {
    type:String,
  },
  password: String,
  re_password: String,

  createdAt: {
    type: Date,
    default: new Date(),
  },
});
const bugs = ({
  createdAt: {
    type: Date,
    default: new Date(),
  },
  issuetype: {
    type:String,
  },
  title: {
    type:String,
  },
  discrip: {
    type:String,
  },
  name: {
    type:String,
  },
  id:{
    type:Number
  },
  images: {
    required:true,
    type: String,
}
 
})
const Bugs = mongoose.model("Bugs",bugs) 
const Signup = mongoose.model("Signup", postSchema);
module.exports = {Bugs,Signup}