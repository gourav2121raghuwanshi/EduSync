const mongoose=require("mongoose")

const resourceSchema =new mongoose.Schema({
   title:{
    type:String,
    trim:true,
    required:true,
   },
   description:{
    type:String,
    required:true,
   },
   name:{
    type:String,
   },
   user:{
    type: mongoose.Schema.Types.ObjectId,
   },
   host:{
    type: String,
   },
   topics:{
    type: String,
   },
   link : {
    type: String,
   },
   time:{
    type:Date,
   }
} , { timestamps: true }
)
module.exports=mongoose.model("Webinar",resourceSchema)


