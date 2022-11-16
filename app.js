const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const app = express();
const mongoose = require('mongoose');


const homeStartingContent = "This is the home pages of this awesome Blogging website. Now, without any delay welcome guys and go Explore!";
const aboutContent = "Hi! I am prajwal singh, Btech ECE (2022) graduate from USICT and loves to design and to code in multilingual like C++, HTML, CSS, Javascript, Nodejs,Reactjs ,Angular. I am looking for fresher position as a software developer role.";
const contactContent = "Let's communicate";

mongoose.connect("mongodb+srv://Prajwal226:Lpassword8226@cluster0.qmk0dry.mongodb.net/?retryWrites=true&w=majority")
const postsSchema=new mongoose.Schema({
  title:String,
  content:String
});

const profilesSchema= new mongoose.Schema({
  name:String,
  username:String,
  password:String
});

const Profile=mongoose.model("Profile",profilesSchema);
const Post= mongoose.model("Post",postsSchema);

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static("public"));

app.listen(3000, function() {
  console.log("server started at port :3000");
})


app.get("/", function(req, res) {
  Post.find(function(err,result){
    res.render("home", {
      text1: homeStartingContent,
      Post:result
    });
  })

})

app.get("/about", function(req, res) {
  res.render("about", {
    text2: aboutContent
  });
})

app.get("/posts/:postId",function(req,res){

  const requiredPostId=req.params.postId; 
  Post.findOne({id:requiredPostId},function(err,post){
    if(err){
      throw err;
      res.redirect("/");
    }
    res.render("post",{
      title:post.title,
      content:post.content
    });

  });
});


let searchedValue = "";
app.get("/search", function(req, res) {
  Post.find(function(err,post){
    if(err) throw err;
    if(post.title===searchedValue){
      res.render('search',{
        title:post.title,
        content:post.content,
        postId:post._id
      });
    }
  });

  res.render('search',{
    title:"",
    content:""
  })
});



app.post("/search", function(req, res) {
  searchedValue = req.body.searchbar;
  res.redirect("/search");
})


app.get("/contact", function(req, res) {
  res.render("contact", {
    contactContent: contactContent
  });
})


app.get("/compose", function(req, res) {
  Post.find(function(err,posts){
    if(err) throw err;
    else{
      res.render("compose", {
        Post:posts
      });
    }
  })
});


let posts = [];


app.post("/compose", function(req, res) {
  const post={
    title:req.body.postTitle,
    content:req.body.postText
  }
  posts.push(post);
  const postdb=new Post({
    title:req.body.postTitle,
    content:req.body.postText
  });
  postdb.save();

  res.redirect("/compose");
});


app.get("/login", function(req, res) {
  res.render("login");
})


app.get("/sucess", function(req, res) {
  res.render("sucess",{
    name: profile.name
  });
})




let profile = {
  name: [],
  username: [],
  password: []
};



app.post("/login", function(req, res) {
  profile.name = req.body.name;
  profile.username = req.body.useremail;
  profile.password = req.body.userpassword;
  let profiledb =new Profile({
    name: req.body.name,
    username: req.body.useremail,
    password: req.body.userpassword
  });
  profiledb.save();

  res.redirect("/sucess");
});
