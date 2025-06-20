const mongoose =require('mongoose')


const connectDB=async()=>{
  try{
    await mongoose.connect(process.env.MONGO_URL)
    console.log(`connection done ${mongoose.connection.host}`)
  }
  catch(error){
    console.log(`Mongoose Database Error ${error}`)
  }
}
module.exports=connectDB
