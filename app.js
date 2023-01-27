const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.set("view engine", "ejs");

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

app.get("/", (req, res) => {
  const blogs = [
    { title: "Yoshi finds eggs", snippet: "Lorem ipsum dolor sit amet" },
    { title: "Mario finds stars", snippet: "Lorem ipsum dolor sit amet" },
    { title: "How to defeat bowser", snippet: "Lorem ipsum dolor sit amet" },
  ];
  res.render("index", { title: "Home", blogs });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "Create" });
});

app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});

// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

// const blogSchema = new Schema(
//   {
//     title: {
//       type: String,
//       required: true,
//     },
//     snippet: {
//       type: String,
//       required: true,
//     },
//     body: {
//       type: String,
//       required: true,
//     },
//   },
//   { timestamps: true }
// );

// const Blog = mongoose.model("Blog", blogSchema);
// module.exports = Blog;
