'use strict';
const mongoose=require('mongoose');
const Schema=mongoose.Schema;
//加载currency
require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;

//添加commentSchema
const commentSchema=new Schema({
	rating:{
		type:Number,
		min:1,
		max:5,
		required:true
	},
	comment:{
		type:String,
		required:true
	},
	author:{
		type:String,
		required:true
	}
},{
	timestamps:true
})
//添加dishSchema
const dishSchema=new Schema({
	name:{
		type:String,
		unique:true,
		required:true
	},
	image:{
		type:String,
		required:true
	},
	category:{
		type:String,
		required:true
	},
	label:{
		type:String
	},
	price:{
		type:Currency,
		required:true
	},
	description:{
		type:String,
		required:true
	},
	comments:[commentSchema]

},{
	timestamps:true
});

const Dishes=mongoose.model('Dish',dishSchema);
module.exports=Dishes;