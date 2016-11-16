'use strict';
const User=require('../models/user');
const jwt=require('jsonwebtoken');
const config=require('../config');


exports.getToken=function(user){
	return jwt.sign(user,config.secretKey,{
		expiresIn:3600
	});
};

exports.verifyOrdinaryUser=function(req,res,next){
	var token=req.body.token||req.query.token||req.headers['x-access-token'];
	if(token){
		jwt.verify(token,config.secretKey,function(err,decoded){
			if(err){
				var err=new Error('you are not authentiate!');
				res.status(401);
				return next(err);
			}else{
				req.decoded=decoded;
				next();
			}

		});
	}else{
		var err=new Error('you token provided');
		res.status(403);
		return next(err);
	}


}