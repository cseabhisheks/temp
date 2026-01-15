const mongoose = require('mongoose')
const dbConnection = async() => {
   await mongoose.connect(process.env.DB).catch((err) => {
        console.log(err)
    }).then(() => {
        console.log('db is connected')

    })
}
module.exports = dbConnection 