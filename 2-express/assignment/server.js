'use strict';
const mongoose=require('mongoose');
const assert=require('assert');
const url='mongodb://localhost:27017/conFusion';
const Dishes=require('./models/dishes');

mongoose.connect(url);
const db=mongoose.connection;
db.on('error',console.error.bind(console,'connection error:'));
db.once('open',function(){
	console.log('connection is correctly!');
	
	// Dishes.find({},function(err,dish){
	// 	if(err) throw err;
	// 	console.log(dish);
	// 	db.collection('dishes').drop(function(){
	// 		db.close();
	// 	});
	// })

	Dishes.create({
		"name": "Uthapizza",
      	"image": "images/uthapizza.png",
      	"category": "mains",
      	"label": "",
      	"price": "$4.99",
      	"description": "A unique . . .",
	    "comments": [
	        {
	          "rating": 5,
	          "comment": "Imagine all the eatables, living in conFusion!",
	          "author": "John Lemon"
	        },
	        {
	          "rating": 4,
	          "comment": "Sends anyone to heaven, I wish I could get my mother-in-law to eat it!",
	          "author": "Paul McVites"
	        }
	    ]
	},function(err,dish){
		if(err) throw err;
		console.log('add dish');
		console.log(dish);
		const id=dish._id;
		Dishes.findByIdAndUpdate(id,{
			$set:{
				description: "update this is a unique !"
			}
		},{
			new:true
		})
		.exec(function(err,dish){
			if(err) throw err;
			console.log('update dish');
			console.log(dish);
			dish.comments.push({
	          "rating": 3,
	          "comment": "Imagine all the eatables, living in conFusion!",
	          "author": "iris lian"
			});
			dish.save(function(err,dish){
				if(err) throw err;
				console.log('push comments');
				console.log(dish);
				db.collection('dishes').drop(function(){
					db.close();
				});
			})
		})

	})
})
