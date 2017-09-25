var index = require('./routes/index');
var users = require('./routes/users');


require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const passport = require('passport');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
const {router: usersRouter} = require('./users');
const {router: authRouter, basicStrategy, jwtStrategy} = require('./auth');
const {router: simpleRouter} = require('./simple');
const {router: canvasRouter} = require('./canvas');
const {router: singleRouter} = require('./single');

//const {router: allRouter} = require('./all');

const {Canvas} = require('./canvas/models');

const router = express.Router();

mongoose.Promise = global.Promise;

const {PORT, DATABASE_URL} = require('./config');
console.log('unicorn', PORT, DATABASE_URL)
const app = express();

// Logging
app.use(morgan('common'));

// CORS
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
  if (req.method === 'OPTIONS') {
    return res.send(204);
  }
  next();
});

app.use(passport.initialize());
passport.use(basicStrategy);
passport.use(jwtStrategy);

app.use('/api/users/', usersRouter);
app.use('/api/auth/', authRouter);
app.use('/api/simple/', simpleRouter);
app.use('/projects', canvasRouter);

app.use('/new', singleRouter);


//app.use('/', simpleRouter);

// A protected endpoint which needs a valid JWT to access it
app.get('/api/protected',
    passport.authenticate('jwt', {session: false}),
    (req, res) => {
        return res.json({
            data: 'rosebud'
        });
    }
);

router.get('/all', function(req, res, next) {
  	res.render('index', { title: 'hi' });
});


//app.use('*', (req, res) => {
  //return res.status(404).json({message: 'Not Found'});
//});
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');



(function() {
  console.log('adf')
  var io;
  var timer = null;
  var data = null; 
  var id = null;	 

  io = require('socket.io').listen(4000);
  io.sockets.on('connection', function(socket) {
    socket.on('drawClick', function(data) {
	console.log('dataid')

	console.log(data.canvasId)
      data = data;
      
      id=data.canvasId; 	 
	 

      clearTimeout(timer);
      timer = setTimeout(function() { console.log('in fun ' +id); doStuff(data, id)} , 1000)

      socket.broadcast.emit('draw', {
        x: data.x,
        y: data.y,
        type: data.type
      });
    });
  });






}).call(this);


function doStuff(data, id) {

    	console.log('save stuff', id);
	

	//Ok so here I'm going to have to find the existing canvas and update it. 
	//I'm also going to need a new create canvas button
	//
	//
	Canvas.updateOne(
			{ _id:  id},
			{ $set: {canvas: data} },
			{ $upsert: true }		
			)
		.then(canvas => {
			console.log('hi')
			console.log(canvas)
			//return res.status(201).json(user.apiRepr());
		})	
		.catch(err => {
		})	

}
	

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
console.log(path.join(__dirname, 'public'));
app.use('/', index);
app.use('/users', users);
// Referenced by both runServer and closeServer. closeServer
// assumes runServer has run and set `server` to a server object
let server;

function runServer() {
  return new Promise((resolve, reject) => {
    mongoose.connect(DATABASE_URL, err => {
      if (err) {
        return reject(err);
      }
      server = app.listen(PORT, () => {
        console.log(`Your app is listening on port ${PORT}`);
        resolve();
      })
      .on('error', err => {
        mongoose.disconnect();
        reject(err);
      });
    });
  });
}

function closeServer() {
  return mongoose.disconnect().then(() => {
     return new Promise((resolve, reject) => {
       console.log('Closing server');
       server.close(err => {
           if (err) {
               return reject(err);
           }
           resolve();
       });
     });
  });
}

if (require.main === module) {
  runServer().catch(err => console.error(err));
};

module.exports = {app, runServer, closeServer};
