//reuable model
const mongoose = require('mongoose')
const model=(name,field)=>{
    const schema = new mongoose.Schema(field, { timestamps: true })
    return mongoose.model(name, schema)
}
module.exports = model