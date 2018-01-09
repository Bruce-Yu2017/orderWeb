var mongoose = require('mongoose');
var path = require("path");
var User = mongoose.model("User");
var Food = mongoose.model("Food");


module.exports = { 
    create:function(req, res){
        var new_food = new Food({
            food_name: req.body.food_name,
            price: req.body.price,
            description:req.body.description,
            image: req.body.image
        })
        new_food.save(function(err){
            if(err){

            }else{
                res.redirect('/foods');
            }
        })
    },

    get_foods:function(req, res){
        Food.find({}, function(err, foods){
            if (err){
                console.log("err")
            }else{
                res.json(foods);
            }
        })
    },

}