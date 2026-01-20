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
const find = async (modelName, query = {}) => {
  try {
    const res = await axios.get(`${BACKEND}/${modelName}/find`, { params: query })
    return res.data
  } catch (err) {
    return err
  }
}

const add = async (modelName, formData) => {
  try {
    const res = await axios.post(`${BACKEND}/${modelName}/add`, formData)
    return res.data
  } catch (err) {
    return err
  }
}
const update = async (modelName, formData, id) => {
  try {
    const res = await axios.patch(`${BACKEND}/${modelName}/${id}/update`, formData)
    return res.data
  } catch (err) {
    return err
  }
}
const remove = async (modelName,  id) => {
  try {
    const res = await axios.delete(`${BACKEND}/${modelName}/${id}/delete`)
    return res.data
  } catch (err) {
    return err
  }
}


const aggregate = async (modelName, pipeline) => {
  try {
    const res = await axios.post(`${BACKEND}/${modelName}/aggregate`, { pipeline })
    return res.data
  } catch (err) {
    return err
  }
}
export { fetchAll, find, aggregate, add, update,remove }



// router.get(`/:_id/${name}/one`, crud.fetchOne)
// router.post('/add', crud.add)
// router.patch('/:_id/update', crud.update)
// router.delete('/:_id/delete', crud.remove)