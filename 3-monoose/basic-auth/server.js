var express = require('express');
var morgan = require('morgan');

var hostname = 'localhost';
var port = 9000;

var app = express();

app.use(morgan('dev'));

function auth(req,res,next){
    console.log(req.headers);
    var authHeader=req.headers.authorization;
    if(!authHeader){
        var err=new Error('You are not authenticated!');
        err.status=401;
        next(err);
        return;
    }
    
    var auth=new Buffer(authHeader.split(' ')[1],'base64').toString().split(':');
    console.log(auth);
    var username=auth[0];
    var password=auth[1];
    if(username=='admin'&&password=='password'){
        next();
    }else{
        var err=new Error('You are not authenticated!');
        err.status=401;
        next(err);
    }

}
app.use(auth);
app.use(express.static(__dirname + '/public'));

app.use(function(err,req,res,next){
    res.writeHead(err.status||500,{
        'WWW-Authenticate':'Basic',
        'Content-Type':'text/plain'
    });
    res.end(err.message);
})
app.listen(port, hostname, function(){
  console.log(`Server running at http://${hostname}:${port}/`);
});