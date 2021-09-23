const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/home', function(req, res){
  res.render('home')
})

app.get('/login', function(req, res){
  res.render('login')
})

app.get('/cadastro', function(req, res){
  res.render('cadastro')
})

app.listen(4040, () => {
  console.log("app rodando...");
}); // inicializando a minha aplicação http://localhost:4040
