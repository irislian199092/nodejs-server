/*——————————————————写法二——————————————————*/
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

  Dishes.create({
  	name: 'Uthapizza',
    description: 'Test'
  },function(err,dish){
    if(err) throw err;
    console.log('dish create!');
    console.log(dish);
    var id=dish._id;

    setTimeout(function(){
      Dishes.findByIdAndUpdate(id,{
        $set:{
          description: 'updata Test'
        }
      },{
        new:true
      })
      .exec(function(err,dish){
        if(err) throw err;
        console.log('dish update!');
        console.log(dish);
        db.collection('dishes').drop(function(){
          db.close();
        })
      })

    },3000);

  }); 

});
