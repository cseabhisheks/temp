//env
require('dotenv').config({ path: './config/.env' })
const PORT = process.env.PORT
const FRONTEND=process.env.FRONTEND
// db conncection
const dbConnection = require('./config/db')
dbConnection()
//model
const { Property, room, tenant, rentBill, electricityBill, payment }=require('./model/models')

//app
const express = require('express')
const app = express()
//parse data
const cors=require('cors')
app.use(cors({origin:FRONTEND}))
app.use(express.json())

//routelayer
const routerLayer=require('./mvc/route')
app.use('/property',routerLayer('property',Property))
app.use('/room',routerLayer('room',room))
app.use('/tenant',routerLayer('tenant',tenant))
app.use('/rentBill',routerLayer('rentBill',rentBill))
app.use('/electrictyBill',routerLayer('electricityBill',electricityBill))
app.use('/payment',routerLayer('payment',payment))





//listens
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT} ${FRONTEND}`)
})