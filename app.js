const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const app = express();


const homeStartingContent = "This is the home pages of this awesome Blogging website. Now, without any delay welcome and go Explore!";
const aboutContent = "Hi! I am prajwal singh, Btech ECE (2022) graduate from USICT and loves to design and to code in multilingual like C++, HTML, CSS, Javascript, Nodejs,Reactjs ,Angular. I am looking for fresher position as a software developer role.";
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
    text1: homeStartingContent
  });
})
app.get("/about", function(req, res) {
  res.render("about", {
    text2: aboutContent
  });
})
app.get("/contact", function(req, res) {
  res.render("contact", {
    contactContent: contactContent
  });
})
app.get("/compose", function(req, res) {
  res.render("compose", {
    Post_title: post.title,
    Post_content: post.content
  });
})
let post = {
  title: [],
  content: []
};
let title = "";
let content = "";
app.post("/compose", function(req, res) {
  title = req.body.postTitle;
  post.title.push(title);
  content = req.body.postText;
  post.content.push(content);

  res.redirect("/compose");
});
app.get("/login", function(req, res) {
  res.render("login");
})
app.get("/sucess", function(req, res) {
  res.render("sucess", {
    name: profile.name
  });
})
app.get("/sucess", function(req, res) {
  res.render("partials/header", {
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
