var express = require('express');
var router = express.Router();
var passport=require('passport');
var User=require('../models/user');
var Verify=require('./verify');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
  User.find({})
  .exec(function(err,user){
  	if(err) throw err;
    console.log('get user!');
    res.json(user);
  });
  
});

router.post('/register',function(req,res,next){
	User.register(new User({username:req.body.username}),req.body.passport,function(err,user){
		if(err){
			return res.status(500).json({err:err});
		}
		user.save(function(err,user){
          passport.authenticate('local')(req, res, function () {
              return res.status(200).json({status: 'Registration Successful!'});
          });
        });
	})
});

router.post('/login',function(req,res,next){

	passport.authenticate('local',function(err,user,info){
		if(err){
			return next(err);
		}
		if(!user){
			return res.status(401).json({err:info});
		}

		req.loginIn(user,function(err){
			if(err){
				return res.status(500).json({
					err:'could not log in user'
				})
			}

			var token=Verify.getToken(user);
			res.status(200).json({
				status:'Login sucessfully!',
				success:true,
				token:token
			});

		})

	})(req,res,next);

});

router.get('/logout',function(req,res,next){
	req.logout();
	res.status(200).json({
		status:'Bye!'
	})
})



module.exports = router;
