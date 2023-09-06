const mongoo=require("mongoose")
mongoo.connect("mongodb://localhost:27017/project1").then(()=>{
  console.log(" database  connected")
}).catch((err)=>{
    console.log(err)
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
    message:{
        type:String,
        
    },
    
})
const modulee=new mongoo.model("contact",schema)

module.exports=modulee