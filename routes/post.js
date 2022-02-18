const { sign } = require("crypto");
const express = require("express");
const fs = require('fs');
// const path = require('path')
const { Signup } = require("../controller/Modals/postmessage");
const { Bugs } = require("../controller/Modals/postmessage");
const {getpost,getBugs} = require("../controller/post");
const poster = express.Router();

poster.get("/dl", getpost);

poster.get("/bugs", getBugs);
  
poster.post("/dl", async(req, res) => {
  const {id,username,user_type,email,password,re_password } = req.body;
  const emailreadyin = await Signup.findOne({email:email}).catch((err)=>{console.log(err)});
  const userNamein = await Signup.findOne({username:username}).catch((err)=>{console.log(err)});
  if(emailreadyin){
    return res.status(409).json({msg:"Emails is already registered"});
  }if(userNamein){
    return res.status(409).json({msg:"UserName is already registered"});
  }
  const posters = new Signup({id: id, username: username,user_type: user_type,email: email, password: password,re_password:re_password,});

  try {
    res.status(200).send("success");
    const a1 = posters.save();
    res.json(a1);
    res.send(a1);
  } catch (err) {
    res.status(503).send("Error");
  }
});
poster.post("/bugs", (req, res) => {
    const bugers = new Bugs({
    issuetype: req.body.issuetype,
    title: req.body.title,
    discrip: req.body.discrip,
    name: req.body.names,
    id: req.body.id,
    images: req.body.images,
  });
  try {
    res.status(200).send("success");
    const a11 = bugers.save();
    res.json(a11);
  } catch (err) {
    res.status(503).send("Error");
  }
});

poster.put("/bugs/:id", async (req, res) => {
  if (Bugs) {
    let bugss = await Bugs.findOneAndUpdate(
      { id: req.params.id },
      {
        $set: {
          issuetype: req.body.issuetype,
          title: req.body.title,
          discrip: req.body.discrip,
          name: req.body.names,
          id: req.body.id,
          images: req.body.images,
        },
      },
      { new: true }
      );
      res.status(200).send(bugss)
    } else {
      res.status(503).send("Not albe to edit");
    }
  });

    poster.delete("/bugs/:id", async (req, res) => {
      if (Bugs) {
        let bugss = await Bugs.findOneAndDelete({ id: req.params.id});
          // const path = `public/uploads/1644909242926-1.jpeg`
          //  fs.unlinkSync(path)
          res.status(200).send("delete")
        } else {
          res.status(503).send("Not deleted");
        }
      });
  module.exports = poster;
  