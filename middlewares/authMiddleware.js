const JWT=require('jsonwebtoken')

module.exports=async(req,res,next)=>{
  try{
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).send({
        success: false,
        message: 'Authorization header missing or invalid',
      });
    }
    const token=req.headers['authorization'].split(" ")[1]
    JWT.verify(token,process.env.JWT_SECRET,(err,decode)=>{
      if(err){return res.status(401).send({
        success:false,
        message:'Auth Failed'
      })
    }else{
      req.userId=decode.userId;
      next();
      }
    })

  }
  catch(error){
    console.log(error)
    return res.status(401).send({
      success:true,
      error,
      message:'Auth Failed'
    })
  }
}
