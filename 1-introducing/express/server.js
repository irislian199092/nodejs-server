/*————————用法一——————————*/
// 'use strict';
// const http=require('http');
// const express=require('express');
// const hostname='localhost';
// const port='9000';

// const app=express();
// app.use(function(req,res,next){
// 	res.writeHeader(200,{'Content-Type':'text/html'});
// 	res.end('<h2>hello Wolrs!hahahha!</h2>');
// });
// const server=http.createServer(app);
// server.listen(port,hostname,function(){
// 	console.log(`server running at http://${hostname}:${port}`);
// });

/*————————用法二——————————*/
// 'use strict';
// const express=require('express');
// const morgan=require('morgan');
// const hostname='localhost';
// const port='9000';
// const app=express();
// app.use(morgan('dev'));
// app.use(express.static(__dirname+'/public'));
// app.listen(port,hostname,function(){
// 	console.log(`server running at http://${hostname}:${port}`);

// });

/*————————用法三——————————*/
// 'use strict';
// const express=require('express');
// const morgan=require('morgan');
// const bodyParser=require('body-parser');
// const hostname='localhost';
// const port='9000';
// const app=express();

// app.use(morgan('dev'));
// app.use(bodyParser.json());

// app.all('/dishes',(req,res,next)=>{
// 	res.writeHead(200, { 'Content-Type': 'text/plain' });
// 	next();
// });
// app.get('/dishes',(req,res,next)=>{
// 	res.end('will send all dishes to you!');
// });
// app.post('/dishes',(req,res,next)=>{
// 	res.end(`will add the dish:${req.body.name}<br>with description:${req.body.description}`);
// });
// app.delete('/dishes',(req,res,next)=>{
// 	res.end('delete all dishes!');
// });

// app.get('/dishes/:dishId',(req,res,next)=>{
// 	res.end(`Will send dishes :${req.params.dishId} to you !`);
// });
// app.put('/dishes/:dishId',(req,res,next)=>{
// 	res.write(`update the dish${req.params.dishId}<br>`);
// 	res.end(`will update the dish:${req.body.name}<br>with description:${req.body.description}`);
// });
// app.delete('/dishes/:dishId',(req,res,next)=>{
// 	res.end(`Will delete dishes :${req.params.dishId}`);
// });

// app.use(express.static(__dirname+'/public'));
// app.listen(port,hostname,function(){
// 	console.log(`server running at http://${hostname}:${port}`);
// });

/*————————用法四——————————*/
'use strict';
const express=require('express');
const morgan=require('morgan');
const bodyParser=require('body-parser');
const hostname='localhost';
const port='9000';
const app=express();

app.use(morgan('dev'));
app.use(bodyParser.json());

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

app.use('/dishes',dishRouter);

app.use(express.static(__dirname+'/public'));
app.listen(port,hostname,function(){
	console.log(`server running at http://${hostname}:${port}`);
});