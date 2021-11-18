var express = require('express')
var app = express()
const bodyParser = require("body-parser");
var http = require('http').createServer(app)
var io = require("socket.io")(http)
const connection = require("./database/database")
const cadastroModel = require("./database/cadastro")

connection.authenticate().then(()=>{
  console.log("Conexão feita com o banco de dados :)")
}).catch((msgErro)=>{
  console.log("falha: " + msgErro)
})

app.set("view engine", "ejs")
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.render('chat')
})

app.get('/home', function(req, res){
  res.render('home')
})

app.get('/cadastro', function(req, res){
  res.render('cadastro')
})

app.get('/login', function(req, res){
  res.render('login')
})

io.on("connection",(socket) => {
  socket.on("disconnect", () => {
    console.log("X desconectou: " + socket.id)
  })

  // socket.on("palavra", (data) => {
  //   console.log(data)
  //   socket.emit("resultado", data + " " + "Grenner App" )
  // })

  socket.on('msg', (data) => {
    socket.broadcast.emit('showmsg', data)
    io.emit('showmsg', data)
    // socket.emit("showmsg", data)
    console.log(data)
  })
})

http.listen(4000, () => {
  console.log('APP RODANDO!')
  //http://localhost:4000
})

