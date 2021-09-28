var express = require('express')
var app = express()
var http = require('http').createServer(app)
var io = require("socket.io")(http)

app.set("view engine", "ejs")

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

io.on("connection",(client) => {
  client.on("disconnect", () => {
    console.log("X desconectou: " + client.id)
  })

  client.on("palavra", (data) => {
    console.log(data)
    client.emit("resultado", data + " " + "Grenner App" )
  })

  client.on('msg', (data) => {
    client.emit("showmsg", data)
    console.log(data)
  })
})

http.listen(3000, () => {
  console.log('APP RODANDO!')
})

