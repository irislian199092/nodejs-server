
'use strict';
const express=require('express');
const dishRouter=express.Router();

//连接数据库 
const mongoose=require('mongoose');
const Dishes=require('../models/dishes');

//配置路由

// .all((req,res,next)=>{
// 	res.writeHead(200, { 'Content-Type': 'text/plain' });
// 	next();
// })
dishRouter.route('/')
.get((req,res,next)=>{
	//res.end('will send all dishes to you!');
	Dishes.find({},function(err,dish){
		if(err) throw err;
		console.log('get dish!');
		res.json(dish);
	});

})
.post((req,res,next)=>{ 
	//res.end(`will add the dish:${req.body.name}<br>with description:${req.body.description}`);
	Dishes.create(req.body,function(err,dish){
		if(err) throw err;
		console.log('add dish!');
		var id=dish._id;
		res.writeHead(200, { 'Content-Type': 'text/plain' });
		res.end(`add the dish with id:${id}`);
	})
})
.delete((req,res,next)=>{
	//res.end('delete all dishes!');
	Dishes.remove({},function(err,resp){
		if(err) throw err;
		console.log('remove dish!');
		console.log(resp);
		res.json(resp);
	})
});
//dishId
dishRouter.route('/:dishId')
.get((req,res,next)=>{
	//res.end(`Will send dishes :${req.params.dishId} to you !`);
	Dishes.findById(req.params.dishId,function(err,dish){
		if(err) throw err;
		console.log(`get dish! of${req.params.dishId}`);
		res.json(dish);
	});
})
.put((req,res,next)=>{
	//res.write(`update the dish${req.params.dishId}<br>`);
	//res.end(`will update the dish:${req.body.name}<br>with description:${req.body.description}`);
	Dishes.findByIdAndUpdate(req.params.dishId,{
		$set:req.body
	},{
		new:true
	},function(err,dish){
		if(err) throw err;
		console.log(`update dish! of${req.params.dishId}`);
		res.json(dish);
	});
})
.delete((req,res,next)=>{
	//res.end(`Will delete dishes :${req.params.dishId}`);
	Dishes.findByIdAndRemove(req.params.dishId,function(err,resp){
		if(err) throw err;
		console.log(`remove dish! of${req.params.dishId}`);
		res.json(resp);
	});
});
//comments
dishRouter.route('/:dishId/comments')
.get((req,res,next)=>{
	//res.end(`Will send dishes :${req.params.dishId} to you !`);
	Dishes.findById(req.params.dishId,function(err,dish){
		if(err) throw err;
		console.log(`get dish of ${req.params.dishId} of coomments`);
		res.json(dish.comments);
	});
})

.post((req,res,next)=>{
	//res.write(`update the dish${req.params.dishId}<br>`);
	//res.end(`will update the dish:${req.body.name}<br>with description:${req.body.description}`);
	Dishes.findById(req.params.dishId,function(err,dish){
		if(err) throw err;
		dish.comments.push(req.body);
		dish.save(function(err,dish){
			if(err) throw err;
			console.log(`update dish! of ${req.params.dishId} of coomments`);
			res.json(dish);
		})
	});
})
.delete((req,res,next)=>{
	Dishes.findById(req.params.dishId,function(err,dish){
		if(err) throw err;
		for(var i=dish.comments.length-1;i>=0;i--){
			dish.comments.id(dish.comments[i]._id).remove();
		};
		dish.save(function(err,result){
			if(err) throw err;
			console.log(`remove dish! of ${req.params.dishId} of coomments`);
			res.writeHead(200, { 'Content-Type': 'text/plain' });
			res.end(`remove the dish with id: ${req.params.dishId} of coomments`);
		});
	});
});

//comments
dishRouter.route('/:dishId/comments/:commentId')
.get((req,res,next)=>{
	Dishes.findById(req.params.dishId,function(err,dish){
		if(err) throw err;
		console.log(`get dish of ${req.params.dishId} of coomments`);
		res.json(dish.comments.id(req.params.commentId));
	});
})

.put((req,res,next)=>{
	Dishes.findById(req.params.dishId,function(err,dish){
		if(err) throw err;
		dish.comments.id(req.params.commentId).remove();
		dish.comments.push(req.body);
		dish.save(function(err,dish){
			if(err) throw err;
			console.log(`update dish! of ${req.params.dishId} of coomments :${req.params.commentId}`);
			console.log(dish);
			res.json(dish);
		})
	});
})
.delete((req,res,next)=>{
	Dishes.findById(req.params.dishId,function(err,dish){
		if(err) throw err;
		dish.comments.id(req.params.commentId).remove();
		dish.save(function(err,result){
			if(err) throw err;
			console.log(`remove dish! of${req.params.dishId} of coomments:${req.params.commentId}`);
			res.writeHead(200, { 'Content-Type': 'text/plain' });
			res.end(`remove the dish with id: ${req.params.dishId} of coomments:${req.params.commentId}`);
		})
	});
});


module.exports=dishRouter;

