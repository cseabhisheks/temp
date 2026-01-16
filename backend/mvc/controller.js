//factory function
const crud=(Model)=>{
    
const fetchAll = async (req, res) => {
    await Model.find({}).then((data) => {
        res.json({ success: true, data,message:`all data is fetched successfully : ${Model.modelName}` })
    }).catch((err) => {
        res.json(err.message)
    })

}
const fetchOne = async (req, res) => {
    const _id = req.params._id
    await Model.findById({ _id }).then((data) => {
        res.json({ success: true, data,message:`one data is fetched successfully : ${Model.modelName}`})
    }).catch((err) => {
        res.json(err.message)
    })

}
const add = async (req, res) => {
    console.log(req.body)
    await Model.create(req.body).then((data) => {
        res.json({ success: true, data,message:`data is added successfully : ${Model.modelName}` })
    }).catch((err) => {
        res.json(err.message)
    })
}
const find = async (req, res) => {
    console.log(req.query)
    await Model.find(req.query).then((data) => {
        console.log(req.query)
        res.json({ success: true, data,message:`data is find successfully : ${Model.modelName}` })
    }).catch((err) => {
        res.json(err.message)
    })
}
const aggregate = async (req, res) => {
    await Model.aggregate(req.body.pipeline).then((data) => {
        res.json({ success: true, data,message:`data is find successfully with aggregation : ${Model.modelName}` })//modelName give access to model name
    }).catch((err) => {
        res.json(err.message)
    })
}

const update = async (req, res) => {
    const _id = req.params._id
    await Model.findOneAndUpdate({ _id }, { $set:req.body }, { new: true }).then((data) => {
        res.json({ success: true, data,message:`data is updated successfully : ${Model.modelName}` })
    }).catch((err) => {
        res.json(err.message)
    })
}
const remove = async (req, res) => {
    const _id = req.params._id
    await Model.findByIdAndDelete({ _id }).then((data) => {
        res.json({ success: true, data,message:`data is deleted successfully : ${Model.modelName}` })
    }).catch((err) => {
        res.json(err.message)
    })
}
return { fetchOne, fetchAll,aggregate, add, find,update, remove }
}
module.exports=crud