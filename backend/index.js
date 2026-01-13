const express=require('express')
const app=express()
app.get('/',(req,res)=>{
    res.json({success:true})
})
app.listen(2030,()=>{
    console.log('server is running')
})