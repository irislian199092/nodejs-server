var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var GithubStrategy=require('passport-github').Strategy;
var User=require('./models/user');
var config = require('./config');

exports.local=passport.use(new LocalStrategy(User.authenticate()));

exports.github=passport.use(new GithubStrategy({

	clientID:config.github.clientID,
	clientSecret:config.github.clientSecret,
	callbackURL:config.github.callbackURL
	},
	function(accessToken,refreshToken,profile,done){
		User.findOne({OauthId:profile.id},function(err,user){
			if(err){
				console.log(err);
			}
			if(!err&&user!==null){
				done(null,user);
			}
			else{
				var user=new User({
					username:profile.displayName
				});
				user.OauthId=profile.id;
				user.OauthToken=accessToken;
				user.save(function(err){
					if(err){
						console.log(err);
					}else{
						console.log('save user from github');
						done(null,user);
					}
				})
			}
		})
	}
));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());