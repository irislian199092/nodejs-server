'use strict';
const http=require('http');
const fs=require('fs');
const path=require('path');
const hostname='localhost';
const port='9000';

const server=http.createServer(function(req,res){
	const reqUrl=req.url;
  if(req.method==='GET'){
  	var fileUrl;
  	if(reqUrl==='/'){
  		fileUrl='/index.html';
  	}else{
  		fileUrl=reqUrl;
  	}
  	var filePath=path.resolve('./public'+fileUrl);
  	var fileExt=path.extname(filePath);
  	if(fileExt=='.html'){
  		fs.exists(filePath, function(exists){
  			if(!exists){
  				res.writeHead(404, { 'Content-Type': 'text/html' });
        		res.end('<html><body><h1>Error 404: ' + fileUrl + 
                		' not exsists</h1></body></html>');
  			}else{
  				res.writeHead(200, { 'Content-Type': 'text/html' });
        		fs.createReadStream(filePath).pipe(res);
  			}

  		});

  	}else{
  		res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<html><body><h1>Error 404: ' + fileUrl + 
                ' not a HTML file</h1></body></html>');
  	}
  }else{
  	res.writeHeader('404',{'content-type':'text/html'});
  	res.end('<h3>request for'+fileUrl+'is method is wrong!</h3>');
  }
});

server.listen(port,hostname,function(){
	console.log(`server running at http://${hostname}:${port}`);
})
