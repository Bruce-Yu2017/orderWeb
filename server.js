var express = require('express');
var scrypt = require("scrypt");

var bodyParser = require('body-parser');

var path = require('path')

var app = express();

app.use(express.static(path.join(__dirname,'./client/dist')));

app.use(bodyParser.urlencoded({extends: true}));

// app.use(bodyParser.json());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

require('./server/config/mongoose.js');

require('./server/config/routes.js')(app);



app.listen(8000,function(){
  console.log("App is running on port 8000!");
})
