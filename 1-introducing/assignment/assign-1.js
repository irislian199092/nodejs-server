'use strict';
const express=require('express');
const morgan=require('morgan');
const bodyParser=require('body-parser');
const hostname='localhost';
const port='9000';
const app=express();

app.use(morgan('dev'));
app.use(bodyParser.json());

const dishRouter=require('./dishRouter');
const promotionsRouter=require('./promotions');
const leadershipRouter=require('./leadership');

app.use('/dishes',dishRouter);
app.use('/promotions',promotionsRouter);
app.use('/leadership',leadershipRouter);

app.use(express.static(__dirname+'/public'));
app.listen(port,hostname,function(){
	console.log(`server running at http://${hostname}:${port}`);
});
