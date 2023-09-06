
const nodemailer=require("nodemailer")
const express=require("express")
const app=express()
app.use(express.json())
const cors=require("cors")

const mongo2=require("../mongo-connection/mongo2")
app.use(cors())


const mongo1=require("../mongo-connection/mongo1")
app.get("/",(req,res)=>{
    res.send("hyyy")
})

app.post("/contact",async(req,res)=>{
    let result=new mongo1({
        name:req.body.name,
        phone:req.body.phone,
        email:req.body.email,
        message:req.body.message,
        
    })
 let result1=await result.save()
    //console.log(req.body)
   //console.log(result)
 res.send(result1)

 if(result1){
    const transporter = nodemailer.createTransport({
        service:'gmail',
        auth: {
          // TODO: replace `user` and `pass` values from <https://forwardemail.net>
          user: 'rohansakhare130@gmail.com',
          pass: 'eiofbhlkiyvycece'
        }
      });
    
    
      const mailoption={
      from:'rohansakhare130@gmail.com',
      to:"taigorad5@gmail.com,gaikwadshubham948@gmail.com",
      subject:" hi i am from nodemailer",
      text:JSON.stringify(result1)
      }
      transporter.sendMail(mailoption,function (err,info){
        if(err){
            console.log(err)
        }
        else{
             console.log("email sent "+ info.response)
        }
      })
  }
})

app.post("/senduserinput",async(req,res)=>{
  let result=new mongo2({
      name:req.body.name,
      phone:req.body.phone,
      email:req.body.email,
      status:req.body.status,
      pincode:req.body.pincode
  })
let result1=await result.save()
  
 if(result1){
  const transporter = nodemailer.createTransport({
      service:'gmail',
      auth: {
        // TODO: replace `user` and `pass` values from <https://forwardemail.net>
        user: 'taigorad10@gmail.com',
        pass: 'ldewcthpgxcdxoen'
      }
    });
  
  
    const mailoption={
    from:'taigorad10@gmail.com',
    to:"taigorad5@gmail.com",
    subject:" hi i am from nodemailer",
    text:JSON.stringify(result1)
    }
    transporter.sendMail(mailoption,function (err,info){
      if(err){
          console.log(err)
      }
      else{
           console.log("email sent "+ info.response)
      }
    })
 }
res.send(result1)
})


app.listen(8000,()=>{
    console.log("server start")
})
