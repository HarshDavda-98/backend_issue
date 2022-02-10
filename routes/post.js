const express = require("express");
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
  let pp = req.files.images;
  // {
  //   name: 'index.js',
  //   data: file name,
  //   size: 716,
  //   encoding: '7bit',
  //   tempFilePath: '',
  //   truncated: false,
  //   mimetype: 'text/javascript',
  //   md5: '44bec9cdaf75096b2bee3884cd674475',
  //   mv: [Function: mv]
  // new Date().getTime(),
  // }
  console.log(pp);
  pp.mv('public/uploads/'+ pp.name);
  const bugers = new Bugs({
    issuetype: req.body.issuetype,
    title: req.body.title,
    discrip: req.body.discrip,
    name: req.body.names,
    id: req.body.id,
    images: pp.name,
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
  let pp = req.files.images;
  pp.mv('public/uploads/'+ pp.name);
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
          images: pp.name,
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
      let bugss = await Bugs.findOneAndDelete(
        { id: req.params.id }
        );
        res.send("delete")
      } else {
        res.send("Not deleted");
      }
    });
  poster.get("/dl");
  poster.get("/bugs");
  module.exports = poster;
  