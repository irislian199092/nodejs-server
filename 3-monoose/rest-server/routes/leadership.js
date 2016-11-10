'use strict';
const express=require('express');
const leadershipRouter=express.Router();

leadershipRouter.route('/')
.all((req,res,next)=>{
	res.writeHead(200, { 'Content-Type': 'text/plain' });
	next();
})
.get((req,res,next)=>{
	res.end('will send all leadership to you!');
})
.post((req,res,next)=>{
	res.end(`will add the leadership:${req.body.name}<br>with description:${req.body.description}`);
})
.delete((req,res,next)=>{
	res.end('delete all leadership!');
});

leadershipRouter.route('/:dishId')
.get((req,res,next)=>{
	res.end(`Will send leadership :${req.params.dishId} to you !`);
})
.put((req,res,next)=>{
	res.write(`update the leadership${req.params.dishId}<br>`);
	res.end(`will update the leadership:${req.body.name}<br>with description:${req.body.description}`);
})
.delete((req,res,next)=>{
	res.end(`Will delete leadership :${req.params.dishId}`);
});
module.exports=leadershipRouter;
