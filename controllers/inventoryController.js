const userModel = require("../models/userModel")

const inventoryModel = require("../models/inventoryModel");
const  mongoose = require("mongoose");


const createInventoryController=async (req,res)=>{
  try{
    const {email}=req.body
    const user =await userModel.findOne({email})
    if(!user){
      throw new Error('user not found')
    }
    // if(inventoryType==='in'&&user.role!=='organisation') throw new Error('not a donar account')

    // if(inventoryType==='out'&&user.role!=='hospital') throw new   Error('Not a hospital'
    // )
    console.log(req.body);

    if(req.body.inventoryType=='out'){
      const requestedBloodGroup=req.body.bloodGroup
      const requestedQuantityOfBlood=req.body.quantity

      const organisation=new mongoose.Types.ObjectId(req.body.organisation)


      //calculate
      const totalInOfRequestedBlood=await inventoryModel.aggregate([
        {$match:{
          organisation,
          inventoryType:'in',
          bloodGroup:requestedBloodGroup
        }},{
          $group:{
            _id:'$bloodGroup',
            total:{$sum:'$quantity'}
          }
        }
      ])
      // console.log('total=>',totalInOfRequestedBlood);
      const totalIn=totalInOfRequestedBlood[0]?.total||0
      //calculate out blood

      const totalOutOfRequestedBloodGroup=await inventoryModel.aggregate([
        {$match:{
          organisation,
          inventoryType:'out',
          bloodGroup:requestedBloodGroup
        }},{
          $group:{
            _id:'bloodGroup',
            total:{$sum:'$quantity'}
          }
        }
      ])
       const totalOut=totalOutOfRequestedBloodGroup[0]?.total||0

       //in &out Calc
       const availableQuantity=totalIn-totalOut
       //quantity validation
       if(availableQuantity<requestedQuantityOfBlood){
        return res.status(500).send({
          success:false,
          message:`Only ${availableQuantity}ML of ${requestedBloodGroup.toUpperCase()} is available`
        })
       }
       req.body.hospital=user?._id
    }else{
      req.body.donar=user?._id
    }
    const inventory=new inventoryModel(req.body)
    await inventory.save()
    return res.status(201).send({
      success:true,
      message:"new Blood Record Added"
    })
    
  }
  catch(error){
    console.log(error)
    return res.status(500).send({
      success:false,
      message:'Error in create Inventory API',
      error
    })
  }
}

const getInventoryController=async(req,res)=>{
  try{
    const inventory=await inventoryModel.find({organisation:req.userId}).populate('donar').populate('hospital').sort({createdAt:-1})

    return res.status(200).send({
      success:true,
      message:'get all record successfully',
      inventory
    })
  }
  catch(error){
    console.log(error)
    return res.status(500).send({
      success:false,
      message:'error in get all inventory',
      error
    })
  }
}


const getDonarsController=async(req,res)=>{
  try{
    const organisation=req.userId
    const donarId=await inventoryModel.distinct("donar",{
      organisation
    });
    // console.log(donarId)
    const donars=await userModel.find({_id:{$in:donarId}})

    return res.status(200).send({
      success:true,
      message:'Donar Record Fetched Successfully',
      donars,
    })
  }
  catch(error){
    console.log(error);
    return res.status(500).send({
      success:false,
      message:'Error in Donar records',
      error
    })
  }
}

const getHospitalController=async(req,res)=>{
try{
  const organisation=req.userId
  const hospitalId=await inventoryModel.distinct('hospital',{organisation})
  const hospitals=await userModel.find(
    {
     _id:{$in:hospitalId} 
    }
  )
  return res.status(200).send({
    success:true,
    message:'Hospitals Data Fetched Successfully',
    hospitals
  })
}
catch(error){
  console.log(error)
  return res.status(500).send({
    success:false,
    message:'Error In get Hospital API',
    error
  })
}
}

const getOrganisationController=async(req,res)=>{
  try{
    console.log("req.userId (donar):", req.userId);

    const donar=req.userId
    const orgId = await inventoryModel.distinct('organisation', {donar})

    const organisations=await userModel.find({
      _id:{$in:orgId},
      role:'organisation'
    })
    // console.log(orgId);
    return res.status(200).send({
      success:true,
      message:'Org Data Fetched Successfully',
      organisations,
    });
  }
  catch(error){
    console.log(error)
    return res.status(500).send({
      success:false,
      message:'Error i ORG API',
      error
    })
  }
}

const getOrganisationForHospitalController=async(req,res)=>{
  try{
    // console.log("req.userId (donar):", req.userId);

    const hospital=req.userId
    const orgId = await inventoryModel.distinct('organisation', {hospital})

    const organisations=await userModel.find({
      _id:{$in:orgId},
      role:'organisation'
    })
    // console.log(orgId);
    return res.status(200).send({
      success:true,
      message:'Hospitals Data Fetched Successfully',
      organisations,
    });
  }
  catch(error){
    console.log(error)
    return res.status(500).send({
      success:false,
      message:'Error in Hospital API',
      error
    })
  }
}

const getRecentInventoryController=async(req,res)=>{
  try{
    const inventory=await inventoryModel.find({
      organisation:req.userId
    }).limit(3).sort({createdAt:-1})

    return res.status(200).send({
      success:true,
      messagae:'recent Inventory Data',
      inventory
    })
  }catch(error){
   console.log(error)
    return res.status(500).send({
      success:false,
      message:'error in REcent inventory',
      error
    }) 
  }
}

const getInventoryHospitalController=async(req,res)=>{
  try{
    const inventory=await inventoryModel.find(req.body.filters).populate('donar').populate('hospital').populate('organisation').sort({createdAt:-1})

    return res.status(200).send({
      success:true,
      message:'get all record successfully',
      inventory
    })
  }
  catch(error){
    console.log(error)
    return res.status(500).send({
      success:false,
      message:'error in connsumer inventory',
      error
    })
  }
}


module.exports={createInventoryController,getInventoryController,getDonarsController,getHospitalController,getOrganisationController,
getOrganisationForHospitalController,getInventoryHospitalController,getRecentInventoryController
}