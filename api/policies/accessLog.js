module.exports = function(req,res,next){
    console.info(req.method , req.path); // 在服务器控制台打印
   
    console.log(req.method , req.path); // 无法打印
     
     
   // return   res.forbidden(); 
    return next() ;
};