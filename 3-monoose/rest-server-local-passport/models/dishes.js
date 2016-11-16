'use strict';
const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const commentSchema=new Schema({
    rating:  {
    type: Number,
    min: 1,
    max: 5,
    required: true
    },
    comment:  {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const DishSchema=new Schema({
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
		type:String,
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

const Dishes=mongoose.model('Dishes',DishSchema);
module.exports= Dishes;