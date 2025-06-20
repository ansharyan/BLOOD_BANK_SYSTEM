
const userModel=require('../models/userModel')
const bcrypt=require("bcryptjs");
const jwt=require('jsonwebtoken');


const registerController=async(req,res)=>{

  try{
    const existingUser=await userModel.findOne({email:req.body.email})
    if(existingUser) {
      return res.status(200).send({
        success:false,
        message:'user already exists'
      })
    }

    const salt=await bcrypt.genSalt(10)
    const hashedPassword=await bcrypt.hash(req.body.password,salt)
    req.body.password=hashedPassword

    const user=new userModel(req.body);
    await user.save()
    return res.status(201).send({
      success:true,
      message:'User Registered successfully',
      user
    });
  }
  catch(error){
    console.log(error)
    res.status(500).send({
      success:false,
      message:'error in register API',
      error
    })
  }
}


const loginController=async(req,res)=>{
  try{
    console.log("Login request body:", req.body);

    console.log("Login email:", req.body.email);

    const existingUser=await userModel.findOne({email:req.body.email})
    if(!existingUser){
      return res.status(404).send({
        success:false,
        message:'user not found'
      })
    }
    if(existingUser.role!==req.body.role){
      return res.status(400).send({
        success:false,
        message:'role not found'
      })
    }
    const comparePassword=await bcrypt.compare(req.body.password,existingUser.password)

    if(!comparePassword){
      return res.status(500).send({
        success:false,
        message:'Invalid Credentials'
      })
    }
    const token=jwt.sign({userId:existingUser._id},process.env.JWT_SECRET,{expiresIn:'1d'})

    return res.status(200).send({
      success:true,
      message:'Login successfully',
      token,
      existingUser
    })
  }catch(error){
    console.log(error)
    res.status(500).send({
      success:false,
      message:'Error In Login API',
      error
    })
  }
}

const currentUserController=async(req,res)=>{
  try{
    const user=await userModel.findOne({_id:req.userId})
    return res.status(200).send({
      success:true,
      message:'user fetched successfully',
      user
    })
  }
  catch(error){
    console.log(error)

    return res.status(500).send({
      success:false,
      message:'unable to get current user',
      error
    })
  }

}
module.exports={registerController,loginController,currentUserController};