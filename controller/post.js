const  {Bugs,Signup} = require("./Modals/postmessage")
// const Bugs = require("./Modals/postmessage")z

const getpost = async(req, res) => {
    try {
        const postMessage = await Signup.find();
      return  res.status(200).json(postMessage);
    } catch (error) {
            res.status(404).json({message:error.message});         
    }
};
// poster.get("/dl", getpost);
// poster.get("/dl", getmessage);

// poster.get("/bugs", getBugs);
// poster.get("/bugss", getbugbody);
  
const getmessage = async(req, res) => {
    const post = req.body;
    const newPost = new PostMessage(post) 
    try {
        await newPost.save();
     return   res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({message:error.message}); 
    }
  };


  const getBugs = async(req, res) => {
    try {
        const postBugs = await Bugs.find();
      return  res.status(200).json(postBugs);
    } catch (error) {
            res.status(404).json({message:error.message});         
    }
};

// poster.get("/bugs", getBugs);
// poster.get("/bugss", getbugbody);

const getbugbody = async(req, res) => {
    const postbugs = req.body;
    const newPostbugs = new Bugs(postbugs) 
    try {
        await newPostbugs.save();
     return   res.status(200).json(newPostbugs);
    } catch (error) {
        res.status(409).json({message:error.message}); 
    }
  };
  
  module.exports = {getpost,getmessage,getBugs,getbugbody};
  