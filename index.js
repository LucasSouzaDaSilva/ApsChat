var express = require('express')
var app = express()
const session = require('express-session')
const bodyParser = require("body-parser");
var http = require('http').createServer(app)
var io = require("socket.io")(http)

const connection = require("./database/database")
const cadastro = require("./database/cadastro")
const usersController = require("./users/UsersController")

connection.authenticate().then(()=>{
  console.log("Conexão feita com o banco de dados :)")
}).catch((msgErro)=>{
  console.log("falha: " + msgErro)
})

app.set("view engine", "ejs")
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({secret: 'aumentaAsegurancaDaSessionTokyo', cookie: {maxAge: 30000}}))
app.use("/", usersController)


app.get("/session", (req, res) => {
  req.session.ano = 2022
  req.session.email = "exemplo@email.com"
  req.session.user = {
    name: "José",
    secondName: "Fernandes"
  }
  res.send("Sessão gerada!")
})

app.get("/leitura", (req, res) => {
  res.json({
    ano: req.session.ano,
    email: req.session.email,
    user: req.session.user
  })
})

app.get('/', (req, res) => {
  res.render('home')
})

app.get('/chat', (req, res) => {
  res.render('chat')
})

app.get('/registros', (req, res)=>{
  cadastro.findAll({raw: true, order:[['id','DESC']]}).then((registros)=>{
    console.log(registros)
    res.render('registros', {registros: registros})
  })

  cadastro.findOne({
    where:{user: user } 
  })
  
})

app.post('/registrarUser', (req,res)=>{
  var user = req.body.user
  var pass = req.body.pass
  var dataNasc = req.body.dataNasc
  var address = req.body.address
  var email = req.body.email
  var rg = req.body.rg
  var name = req.body.name

  cadastro.create({
    user:user,
    pass:pass,
    nome:name,
    dataNasc:dataNasc,
    rg:rg,
    endereco:address,
    email:email
  }).then(()=>{
    res.redirect('/login')
  })
})

app.get('/cadastro', (req, res)=>{
  res.render('cadastro')
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