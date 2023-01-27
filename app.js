const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
require("dotenv").config();

const Blog = require("./models/blog");

const app = express();
app.set("view engine", "ejs");

//dababase connection -
const dbURI = `mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@cornellblog.4c5hnap.mongodb.net/cornell?retryWrites=true&w=majority`;
mongoose
  .connect(dbURI)
  .then((result) => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });

//middlwares & static files -
app.use(morgan("dev"));
app.use(express.static("public"));

//basic routes -
app.get("/", (req, res) => {
  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

//blog routes -
app.get("/blogs", (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("index", { title: "All Blogs", blogs: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "Create" });
});

app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
