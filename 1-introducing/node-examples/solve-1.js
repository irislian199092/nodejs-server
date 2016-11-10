// var rect=require('./rectangle-1');
//
// function solveRect(x,y){
//   if(x<0||y<0){
//     console.log('length or breath could not be less than zero');
//   }else{
//     console.log('premeters is:',rect.premeters(x,y));
//     console.log('area is:',rect.area(x,y));
//
//   }
// }
// solveRect(3,4);
// console.log(rect);


//  var rect=require('./rectangle-1');
//  function solveRect(l,b){
//    console.log('solve for rectangle');
//    rect(l,b,function(err,rectangle){
//      if(err){
//        console.log(err);
//      }else{
//        console.log('premeters is:',rectangle.premeters());
//        console.log('area is:',rectangle.area());
//      }
//    });
//  }
// solveRect(3,4);
// solveRect(-3,4);

var argv=require('yargs')
        .usage('Usage:-l [num] -b [num]')
        .demand(['l','b'])
        .argv;
var rect=require('./rectangle-1');
 function solveRect(l,b){
   console.log('solve for rectangle');
   rect(l,b,function(err,rectangle){
     if(err){
       console.log(err);
     }else{
       console.log('premeters is:',rectangle.premeters());
       console.log('area is:',rectangle.area());
     }
   });
 }
 solveRect(argv.l,argv.b);
