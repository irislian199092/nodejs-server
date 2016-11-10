'use strict';
const express=require('express');
const dishRouter=express.Router();

dishRouter.route('/')
.all((req,res,next)=>{
	res.writeHead(200, { 'Content-Type': 'text/plain' });
	next();
})
.get((req,res,next)=>{
	res.end('will send all dishes to you!');
})
.post((req,res,next)=>{
	res.end(`will add the dish:${req.body.name}<br>with description:${req.body.description}`);
})
.delete((req,res,next)=>{
	res.end('delete all dishes!');
});

dishRouter.route('/:dishId')
.get((req,res,next)=>{
	res.end(`Will send dishes :${req.params.dishId} to you !`);
})
.put((req,res,next)=>{
	res.write(`update the dish${req.params.dishId}<br>`);
	res.end(`will update the dish:${req.body.name}<br>with description:${req.body.description}`);
})
.delete((req,res,next)=>{
	res.end(`Will delete dishes :${req.params.dishId}`);
});
module.exports=dishRouter;
