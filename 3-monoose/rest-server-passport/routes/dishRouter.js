
'use strict';
const express=require('express');
const dishRouter=express.Router();

//连接数据库 
const mongoose=require('mongoose');
const Dishes=require('../models/dishes');
const Verify=require('./verify');

//配置路由

dishRouter.route('/')
.get(Verify.verifyOrdinaryUser,(req,res,next)=>{
	 Dishes.find({})
        .populate('comments.postedBy')
        .exec(function (err, dish) {
        if (err) throw err;
        res.json(dish);
    });

})
.post(Verify.verifyOrdinaryUser,(req,res,next)=>{ 
	
	Dishes.create(req.body,function(err,dish){
		if(err) throw err;
		console.log('add dish!');
		var id=dish._id;
		res.writeHead(200, { 'Content-Type': 'text/plain' });
		res.end(`add the dish with id:${id}`);
	})
	
})
.delete(Verify.verifyOrdinaryUser,(req,res,next)=>{	
	Dishes.remove({},function(err,resp){
		if(err) throw err;
		console.log('remove dish!');
		res.json(resp);
	});
});

//dishId
dishRouter.route('/:dishId')
.get(Verify.verifyOrdinaryUser,(req,res,next)=>{	
	Dishes.findById(req.params.dishId)
        .populate('comments.postedBy')
        .exec(function (err, dish) {
        if (err) throw err;
        res.json(dish);
    });

})
.put(Verify.verifyOrdinaryUser,(req,res,next)=>{

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
.delete(Verify.verifyOrdinaryUser,(req,res,next)=>{
	
	Dishes.findByIdAndRemove(req.params.dishId,function(err,resp){
		if(err) throw err;
		console.log(`remove dish! of${req.params.dishId}`);
		res.json(resp);
	});
});


//comments
dishRouter.route('/:dishId/comments')
.all(Verify.verifyOrdinaryUser)
.get((req,res,next)=>{
	 Dishes.findById(req.params.dishId)
        .populate('comments.postedBy')
        .exec(function (err, dish) {
        	if (err) throw err;
        	res.json(dish.comments);
    	});

})
.post((req,res,next)=>{
	Dishes.findById(req.params.dishId, function (err, dish) {
        if (err) throw err;
        req.body.postedBy = req.decoded._doc._id;
        dish.comments.push(req.body);
        dish.save(function (err, dish) {
            if (err) throw err;
            console.log('Updated Comments!');
            res.json(dish);
        });
    });
})
.delete(Verify.verifyAdmin,(req,res,next)=>{
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


//comments/id
dishRouter.route('/:dishId/comments/:commentId')
.all(Verify.verifyOrdinaryUser)
.get((req,res,next)=>{

	Dishes.findById(req.params.dishId)
	.populate('comments.postedBy')
	.exec(function(err,dish){
		if(err) throw err;
		console.log(`get dish of ${req.params.dishId} of coomments`);
		res.json(dish.comments.id(req.params.commentId));
	});

})
.put((req,res,next)=>{
	Dishes.findById(req.params.dishId,function(err,dish){
		if(err) throw err;
		dish.comments.id(req.params.commentId).remove();

		req.body.postedBy=req.decoded._doc._id;

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
		
		if(dish.comments.id(req.params.commentId).postedBy!=req.decoded._doc._id){
			var err=new Error(' you are not permmit!');
			err.status(403);
			next(err);
		}
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

