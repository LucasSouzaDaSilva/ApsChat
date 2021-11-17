const express = require("express");
const session = require("express-session");
const BodyParser = require("body-parser");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
var path = require('path');

var login = "admin";
var password = "1234";

app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");
app.use(session({ secret: "sadfsdfsdfsd74328r73489" }));
app.use(express.urlencoded({ extended: true }));

app.post("/", (req, res) => {
  if (req.body.password == password && req.body.login == login) {
    //Logado!
    req.session.login = login;

    res.render("home.ejs");

  } else {
    res.render("login.ejs");
  }

});
app.get("/", function (req, res) {
  if(req.session.login){
    res.render('home.ejs')
    
  }else{
    res.render("login.ejs");
  }

  
});

app.get("/home", function (req, res) {
  res.render("home.ejs");
});

app.get("/cadastro", function (req, res) {
  res.render("cadastro.ejs");
});

app.get("/login", function (req, res) {
  res.render("login.ejs");
});

io.on("connection", (client) => {
  client.on("disconnect", () => {
    console.log("X desconectou: " + client.id);
  });

  client.on("palavra", (data) => {
    console.log(data);
    client.emit("resultado", data + " " + "Grenner App");
  });

  client.on("msg", (data) => {
    client.emit("showmsg", data);
    console.log(data);
  });
});

http.listen(3000, () => {
  console.log("APP RODANDO!");
});

