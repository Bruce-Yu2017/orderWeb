var mainroutes = require('../controllers/mainControl.js');
var foods = require('../controllers/foods.js');
var path = require('path');


module.exports = function(app){ 
  //register
  app.post("/register", function(req, res) {
    mainroutes.register(req, res);
  })
  
  //login
  app.post("/login", function(req, res) {
    mainroutes.login(req, res);
  })

  app.post('/foods', function(req, res){
    foods.create(req, res);
  })

  app.get('/foods', function(req, res){
    foods.get_foods(req, res);
  })

  app.post("/social", function(req, res) {
    mainroutes.social_login(req, res);
  })

    app.all("*",function(req,res){
        res.sendFile('index.html', { root: './client/dist' });
    })
}
