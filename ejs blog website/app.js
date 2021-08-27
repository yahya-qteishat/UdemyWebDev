//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

let posts = []; // global variable

const app = express();

app.set('view engine', 'ejs'); // set view engine to ejs

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req,res){
  res.render("home", {
    homeStartingContentKey: homeStartingContent,
    posts: posts
  });
  // render home.ej & send JS object with key value pairs to display dynamically in home.ejs
}) // end logic for our server's response to our client's get request

app.get("/about", function(req,res){
  res.render("about", {aboutContentKey: aboutContent});
});

app.get("/contact", function(req,res){
  res.render("contact", {contactContentKey: contactContent});
});

app.get("/compose", function(req,res){
  res.render("compose");
});

app.post("/compose", function(req,res){
  // req.body.postTitle is whatecer the user submitted from the form.
  const post = {
    content: req.body.postBody,
    title: req.body.postTitle
  }
  posts.push(post);
  res.redirect("/");
});

app.get("/posts/:postName", function(req,res){
  //dynamically handles any get request for any post name using express routing parameters
  const requestedTitle = _.lowerCase(req.params.postName); // store the title they wanted in the url
  posts.forEach(function(individualPost){ // loop through all post objects in post array
    // for each post object, stores in var
    const storedTitle = _.lowerCase(individualPost.title);
    const storedContent= individualPost.content;

    // check if a post with a title they want in the url exists in our posts array
    if (storedTitle === requestedTitle) {
      res.render("post", {requestedTitleKey:requestedTitle, storedContentKey: storedContent});
    };// end if statement logic
  }); // end for each logic
}); // end dynamic express routing get request logic

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
