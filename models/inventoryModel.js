const mongoose=require('mongoose')


const inventorySchema=new mongoose.Schema({
  inventoryType:{
    type:String,
    required:[true,'inventory type require'],
    enum:['in','out']
  },
  bloodGroup:{
    type:String,
    required:[true,'blood froup is required'],
    enum:['O+','O-','AB+','AB-','A+','A-','B+','B-']
  },
  quantity:{
    type:Number,
    require:[true,'blood qunatity is require']
  },
  email:{
    type:String,
    required:[true,'Donae email is required']
  },
  organisation:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"users",
    required:[true,"organisation is require"]
  },
  hospital:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'users',
    required:function(){
      return this.inventoryType==='out'
    }
  },
  donar:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'users',
    required:function(){
      return this.inventoryType==='in';
    }
  }

},{timestamps:true})

module.exports =mongoose.model('Inventory',inventorySchema)