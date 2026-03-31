import express from "express";
import path from "path";
import { fileURLToPath } from "url";
const app = express();
import { v4 as uuidv4 } from 'uuid';
import methodOverride from'method-override'
// fix __dirname for ES Module
app.use(methodOverride('_method'))
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
// static files
app.use(express.static(path.join(__dirname, "public")));
// body parsers
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let port = 8080;

let posts=[{
    id:uuidv4(),
    username:"apnacollege",
    content:"I love coding"
},{
    id:uuidv4(),
    username:"Shradha Khapra",
    content:"Hardwork is Important for Success"
},{
    id:uuidv4(),
    username:"Ishtiaque Ali",
    content:"I got Selected at Google!"
}]
app.get("/posts", (req, res) => {
    res.render("index.ejs",{posts});
});

app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
});
app.post("/posts",(req,res)=>{
    console.log(req.body);
    let {username,content}=req.body;
    let id=uuidv4();
    posts.push({id,username,content});
    //res.send("Posted Successfully....");
    res.redirect("/posts");
})

 app.patch("/posts/:id",(req,res)=>{
     let {id}=req.params;
     let {content}=req.body;
     let post1=posts.find((p)=>id===p.id);
     post1.content=content;
    /// res.send("Patch Request Sennded....."); 
    res.redirect("/posts");
});

app.delete("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=>id===p.id);
    let index=posts.indexOf(post);
      if (index !== -1) {
        posts.splice(index, 1);
    }
    res.redirect("/posts");
})

app.get("/posts/:id/edit",(req,res)=>{
    let id=req.params.id;
    console.log(id);
    let post=posts.find((p)=>id==p.id);
    console.log(post);
    res.render("edit.ejs",{post});
});
// app.post("/posts/:id/edit",(req,res)=>{
//     let {content}=req.body;
//     console.log(content);
// });

app.get("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=>id===p.id);
    res.render("show.ejs",{post});
})

app.listen(port, () => {
    console.log("Server Started Working....");
});