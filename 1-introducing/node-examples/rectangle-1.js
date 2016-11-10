// exports.premeters = function (x,y) {
//
// };
// exports.area=function(x,y){
//   return (x*y);
// }
/*node module examples*/
module.exports = function (x,y,callback) {
  try {
    if(x<0||y<0){
      throw new Error('dimension should be greater than zero');
    }else{
      callback(null,{
        premeters:function(){
          return(2*(x+y));
        },
        area:function(){
          return (x*y);
        }
      })
    }
  } catch (error) {
    callback(error,null)
  }
};
