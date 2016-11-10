'use strict';
const express=require('express');
const promotionsRouter=express.Router();

promotionsRouter.route('/')
.all((req,res,next)=>{
	res.writeHead(200, { 'Content-Type': 'text/plain' });
	next();
})
.get((req,res,next)=>{
	res.end('will send all promotions to you!');
})
.post((req,res,next)=>{
	res.end(`will add the promotions:${req.body.name}<br>with description:${req.body.description}`);
})
.delete((req,res,next)=>{
	res.end('delete all promotions!');
});

promotionsRouter.route('/:dishId')
.get((req,res,next)=>{
	res.end(`Will send promotions :${req.params.dishId} to you !`);
})
.put((req,res,next)=>{
	res.write(`update the promotions${req.params.dishId}<br>`);
	res.end(`will update the promotions:${req.body.name}<br>with description:${req.body.description}`);
})
.delete((req,res,next)=>{
	res.end(`Will delete promotions :${req.params.dishId}`);
});
module.exports=promotionsRouter;
