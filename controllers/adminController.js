const userModel = require("../models/userModel")

const getDonarListController=async(req,res)=>{
  try{
    const donarData=await userModel.find({role:'donar'}).sort({createdAt:-1});


    return res.status(200).send({
      success:true,
      TotalCount:donarData.length,
      message:'Donar List fetched',
      donarData
    })
  }catch(error){
    console.log(error)
    return res.status(500).send({
      success:false,
      message:'Error in Donor List',
      error
    })
  }
}


const getHospitalListController=async(req,res)=>{
  try{
    const hospitalData=await userModel.find({role:'hospital'}).sort({createdAt:-1});


    return res.status(200).send({
      success:true,
      TotalCount:hospitalData.length,
      message:'Hospital List fetched',
      hospitalData
    })
  }catch(error){
    console.log(error)
    return res.status(500).send({
      success:false,
      message:'Error in Donor List',
      error
    })
  }
}


const getOrgListController=async(req,res)=>{
  try{
    const orgData=await userModel.find({role:'organisation'}).sort({createdAt:-1});


    return res.status(200).send({
      success:true,
      TotalCount:orgData.length,
      message:'Organisation List fetched',
      orgData
    })
  }catch(error){
    console.log(error)
    return res.status(500).send({
      success:false,
      message:'Error in Donor List',
      error
    })
  }
}
const deleteDonarController=async(req,res)=>{
  try{
    await userModel.findByIdAndDelete(req.params.id);
    return res.status(200).send({
      success:true,
      message:"donar record Deleted successfully",
    })

  }catch(error){
    console.log(error)
    return res.status(500).send({
      success:false,
      message:'Error while Deleting Donor List',
      error
    })
  }

}



module.exports={getDonarListController,getHospitalListController,getOrgListController,deleteDonarController}