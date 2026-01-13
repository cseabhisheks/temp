const express=require('express')
const PORT=process.env.PORT
const app=express()
app.get('/',(req,res)=>{
    res.json({success:true})
})
app.listen(PORT,()=>{
    console.log('server is running')
})