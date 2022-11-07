const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const app = express();
const _=require('lodash');


const homeStartingContent = "This is the home pages of this awesome Blogging website. Now, without any delay welcome guys and go Explore!";
const aboutContent = "Hi! I am prajwal singh, Btech ECE (2022) graduate from USICT and loves to design and to code in multilingual like C++, HTML, CSS, Javascript, Nodejs,Reactjs ,Angular.";
const contactContent = "Let's communicate";


app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static("public"));

app.listen(3000, function() {
  console.log("server started at port :3000");
})


app.get("/", function(req, res) {
  res.render("home", {
    text1: homeStartingContent,
    Post:posts
  });
})

app.get("/about", function(req, res) {
  res.render("about", {
    text2: aboutContent
  });
})

app.get("/post/:postName",function(req,res){

  const requiredTitle=_.lowerCase(req.params.postName);
  posts.forEach(function(post) {
    const storedTitle=_.lowerCase(post.title);
    const storedPost=post.content;

        if(storedTitle===requiredTitle){
          res.render('post',{
            title:storedTitle ,
            content:storedPost
          })
        } 
  });
})


let searchedValue = "";
app.get("/search", function(req, res) {
  posts.forEach(function(post) {
    const storedTitle=_.lowerCase(post.title);
    const storedPost=post.content;

        if(storedTitle===searchedValue){
          res.render('search',{
            title:storedTitle ,
            content:storedPost
          })
        }
  });
  res.render('search',{
    title:"",
    content:""
  })
})



app.post("/search", function(req, res) {
  searchedValue = _.lowerCase(req.body.searchbar);
  res.redirect("/search");
})


app.get("/contact", function(req, res) {
  res.render("contact", {
    contactContent: contactContent
  });
})


app.get("/compose", function(req, res) {
  res.render("compose", {
    Post:posts,
  });
})


let posts = [];


app.post("/compose", function(req, res) {
  const post={
    title:req.body.postTitle,
    content:req.body.postText
  }
  posts.push(post);

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
  profile.username = req.body.Username;
  profile.password = req.body.password;

  res.redirect("/sucess");
});
