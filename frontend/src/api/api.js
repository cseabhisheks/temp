import axios from 'axios'
const BACKEND = import.meta.env.VITE_BACKEND

const fetchAll = async (modelName) => {
  try {
    const res = await axios.get(`${BACKEND}/${modelName}/all-${modelName}`)
    return res.data
  } catch (err) {
    return err
  }
}
const find = async (modelName, query={}) => {
  try {
    const res = await axios.get(`${BACKEND}/${modelName}/find`, { params: query })
    return res.data
  } catch (err) {
    return err
  }
}
const aggregate=async(modelName,pipeline)=>{
    try {
    const res = await axios.post(`${BACKEND}/${modelName}/aggregate`, { pipeline })
    console.log(res.data)
    return res.data
  } catch (err) {
    return err
  }
}
export { fetchAll, find,aggregate }



// router.get(`/:_id/${name}/one`, crud.fetchOne)
// router.post('/add', crud.add)
// router.patch('/:_id/update', crud.update)
// router.delete('/:_id/delete', crud.remove)