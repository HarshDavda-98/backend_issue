const express = require("express");
const fs = require('fs');
// const path = require('path')
const { Signup } = require("../controller/Modals/postmessage");
const { Bugs } = require("../controller/Modals/postmessage");
const {
  getpost,
  getmessage,
  getBugs,
  getbugbody,
} = require("../controller/post");
const poster = express.Router();

poster.get("/dl", getpost);
poster.get("/dl", getmessage);

poster.get("/bugs", getBugs);
poster.get("/bugs", getbugbody);
  
poster.post("/dl", (req, res) => {
  const posters = new Signup({
    id: req.body.id,
    username: req.body.username,
    user_type: req.body.user_type,
    email: req.body.email,
    password: req.body.password,
    re_password: req.body.re_password,
  });
  
  try {
    res.send("success");
    const a1 = posters.save();
    res.json(a1);
  } catch (err) {
    res.send("Error");
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
    res.send("success");
    const a11 = bugers.save();
    res.json(a11);
  } catch (err) {
    res.send("Error");
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
      res.send(bugss)
    } else {
      res.send("Not albe to edit");
    }
  });

    poster.delete("/bugs/:id", async (req, res) => {
      if (Bugs) {
        let bugss = await Bugs.findOneAndDelete({ id: req.params.id});
          // const path = `public/uploads/1644909242926-1.jpeg`
          //  fs.unlinkSync(path)
          res.send("delete")
        } else {
          res.send("Not deleted");
        }
      });
  poster.get("/dl");
  poster.get("/bugs");
  module.exports = poster;
  