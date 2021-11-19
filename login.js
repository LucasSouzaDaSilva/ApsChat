const express =require('express')
const bodyParser = require('body-parser')
const session = require('express-session')

const port = 3000
var app = express()

var login = 'admin'
var password = '123456'


app.set("view engine", "ejs")
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({secret: 'senha324sdasdsase23', resave: true, saveUninitialized: true}))

app.post('/', (req, res)=>{
  if(req.body.password == password && req.body.login == login){
    
    req.session.login = login
    res.render('menu', {login: login})
    
    
  }else{
    res.render('login')
  }
})

app.get('/login', (req, res)=>{
  if(req.session.login){
    res.render('home', {login: login})
    console.log("O meu usuário é: " + req.session.login)
  }else{
    res.render('login')
  }
})


app.listen(port,()=>{
  console.log('servidor rodando!')
  //http://localhost:3000
})