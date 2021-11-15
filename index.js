const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//set up express app
const app = express();

//connect to mongodb
mongoose.connect('mongodb://localhost/ninjago');
mongoose.Promise = global.Promise;

//User requests image ie image.jpg
//Request comes in, hits middleware and express.static sees its a static file
app.use(express.static('public'));

app.use(bodyParser.json());



//Initialize routes
app.use('/api', require('./routes/api'));

//Error handling middleware
app.use(function(err, req, res, next){

  res.status(422).send({error: err.message});

});
//Listen for requests
app.listen(process.env.port || 4000, function(){
  console.log('Now listening for requests!');
});
