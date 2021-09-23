const { Socket } = require('dgram');
const express = require('express');
const path = require('path');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.use(express.static(path.koin(__dirname,'public')));
app.set('views', path.join(__dirname,'public'));
app.engine('html',require('ejs').renderFile);
app.set('view engine', 'html');

app.get('/chat', function(req, res){
    res.render('chat');
})

app.get('/home', function(req, res){
    res.render('home')
})
  
app.get('/login', function(req, res){
  res.render('login')
})
  
app.get('/cadastro', function(req, res){
  res.render('cadastro')
})

let messages = [];

io.on('connection', Socket =>{
    console.log(`Socket conectado: ${socket.id}`);

    socket.on('sendMessage', data => {
        messages.push(data);
        socket.broadcast.emit('receivedMessage',data);
    });
});

server.listen(3000);