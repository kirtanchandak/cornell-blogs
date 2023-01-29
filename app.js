const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
require("dotenv").config();
const blogRoutes = require("./routes/blogRoutes");

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
app.use(express.urlencoded({ extended: true }));

//basic routes -
app.get("/", (req, res) => {
  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

//blog routes -
app.use(blogRoutes);

app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
