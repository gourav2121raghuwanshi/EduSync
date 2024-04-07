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
   image:{
      type:String,
   },
   user:{
    type: mongoose.Schema.Types.ObjectId,
   },
   replies: [
    {
     user:{
        type:mongoose.Schema.Types.ObjectId,
     },
     name:{
        type:String,
     },
     text:{
        type:String,
     },
     date:{
        type: Date,
        default : Date.now(),
     }
    }
    ],
} , { timestamps: true }
)
module.exports=mongoose.model("Blog",resourceSchema)


