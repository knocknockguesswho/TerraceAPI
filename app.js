const express = require('express');
require('dotenv').config();
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const cors = require('cors');
const corsHelper = require('./src/helpers/cors')
const xssFilter = require('x-xss-protection')
const connection = require('./src/helpers/mysql');
const bodyParser = require('body-parser');
const morgan = require('morgan');


const routes = require('./src/routes/index');

io.on('connection', socket =>{
  console.log('user connected');
  socket.on('chat-message', msg=>{
      consolelog(msg)
  })
  socket.on('disconnect', ()=>{
    console.log('user disconnected')
  })
})


//connect to database
connection.connect(function(error){
  if(error)throw error;
  console.log(`Database has connected!`);
});

//CORS Security Mechanism
app.use(cors());
app.options('*', cors(corsHelper.corsOptions));
app.use(xssFilter());
    
// app.use('/', cors(corsOptionsDelegate), routes)
app.use('/',express.static(__dirname));
//using morgan for error and success logging
app.use(morgan('dev'));
//use body-parser to send json data to node api project.
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use((req, res, next)=>{
  req.io = io;
  next();
})


app.use('/', routes)

server.listen(3000, function(){
  console.log(`terrace-api running at port 3000...`)
});