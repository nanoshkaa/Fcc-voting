//Creat DB connection
var db  = 'mongodb://localhost:27017/fccVoting';
//Creat a port for server to listen on
var port = process.env.PORT || 8000;

//Load in router
var router = require ('./routes/api');
//Load in node modules
var express = require('express');
var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var dotenv = require('dotenv');

//Creat an express app
var app = express();
//Load in environment variables
dotenv.config({ verbose : true });
//Connect to mongo
mongoose.connect(db, function(err){
    if(err) {
        console.log(err);
    }
});
//Listen to mongoose connection events
mongoose.connection.on('connected', function(){
    console.log('successfully opened connection to ' + db);
});

mongoose.connection.on('disconnected', function(){
    console.log('successfully disconnected from ' + db);
});

mongoose.connection.on('error', function(){
    console.log('An error has occurred connecting to ' + db);
});

//Configure express middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use('/node_modules', express.static(__dirname + '/node_modules'));
app.use(express.static(__dirname + '/public'));
app.use('/api', router);
app.get("*", function(request,response){
    response.sendFile(__dirname + '/public/index.html');
});

// Start up a server
app.listen(port, function(){
    console.log('listening on ' + port);
});
