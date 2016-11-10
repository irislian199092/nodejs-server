'use strcit';

const mongoose=require('mongoose');
const assert=require('assert');
const url='mongodb://localhost:27017/conFusion';
const Dishes=require('./models/dishes-1');
//链接数据库
mongoose.connect(url);
const db=mongoose.connection;
//检测错误
db.on('error',console.error.bind(console,'connection error:'));
//开始创建数据
db.once('open', function() {
  // 检测是否连接成功
  console.log('connection is correctly server');
  const newDish=Dishes({
  	 name: 'Uthapizza',
    	description: 'Test'
  });
  //创建新对象
  newDish.save(function(err){
  	if(err) throw err;
  	console.log('newDish is create!');
    //查找所有对象
  	Dishes.find({},function(err,dishes){
  		if(err) throw err;
  		console.log(dishes);
        //删除所有对象
  		db.collection('dishes').drop(function(){
  			db.close();
  		})
  	})

  })

});

