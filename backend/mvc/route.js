const express = require('express')
const crudController = require('./controller')
//reusable route
const routerLayout = (name, model) => {
    const router = express.Router() // it must be inside routerlayout because it will create different route for different models
    const crud = crudController(model) 
    router.get(`/all-${name}`, crud.fetchAll)
    router.get(`/find`, crud.find)
    router.post('/aggregate',crud.aggregate)
    router.get(`/:_id/${name}/one`, crud.fetchOne)
    router.post('/add', crud.add)
    router.patch('/:_id/update', crud.update)
    router.delete('/:_id/delete', crud.remove)
    return router
}
module.exports = routerLayout