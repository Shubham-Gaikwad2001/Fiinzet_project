const mongoo=require("mongoose")
mongoo.connect("mongodb://localhost:27017/project1").then(()=>{
  console.log(" database  connected")
}).catch((err)=>{
    throw err
})

const schema=new mongoo.Schema({
    name:{
        type:String,
        
    },
    phone:{
        type:Number,
        
    },
    email:{
        type:String,
        
    }
    ,
    status:{
        type:String,
        
    },
    pincode:{
        type:Number,
        
    }
})
const modulee=new mongoo.model("user",schema)

module.exports=modulee