import express from "express";
import bodyParser from"body-parser";
 
// import fs from 'node:fs';

const app = express();
const port = 3000;

app.use(express.static('public'));


app.use(bodyParser.urlencoded({ extended: true }))

 let posts = [{
  id:1,
  title: "Exploring the Power of Meditation",
  content: "In today's fast-paced world, taking a moment to pause and meditate can have profound effects on our well-being. Discover the benefits of mindfulness and how incorporating meditation into your daily routine can lead to greater clarity, focus, and inner peace.",
 },];


app.get("/", (req, res) => {
    res.render("index.ejs", { posts: posts });
});

app.get('/post/:id', (req, res) => {
  const postId = parseInt(req.params.id);
  const post = posts.find(post => post.id === postId);
  res.render("post.ejs", { post: post });
});

// app.get("/post", (req ,res)=>{
  
//   res.render("post.ejs")
  
// });

app.get("/create", (req, res) => {
   res.render("create.ejs");
});

app.post("/submit", (req, res) => {
    const {title,content} = req.body;
  // const title = req.body;
  // const content = req.body;
  const newPost={
    id : posts.length + 1,
    title :title,
    content:content
  };
  posts.push(newPost);
  res.redirect("/");

  });
  app.post('/post/:id/delete', (req, res) => {
    const postId = parseInt(req.params.id);
    
    const post = posts.findIndex(post => post.id === postId);
    if(post > -1){
    posts.splice(post,1)
    res.redirect('/');
    }
    else {
      res.status(400);
    }
  });

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});