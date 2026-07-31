import axios from "axios"
const server_base = "http://localhost:3001/persons"

const createNew = (data) => {
  const request = axios.post(server_base, data)
  return request.then(response => response.data)
}

const getAll = () => {
  const request = axios.get(server_base)
  return request.then(response => response.data)
}

const removeAction = async (id) => {
  const request = await axios.delete(`http://localhost:3001/persons/${id}`)
  .catch((error) => {
    if (error.status === 404) {
        status = "mess"
    }else{
        status = "Error"
    }
    return status
  })
if (request.status == 200){
    status = "message"
}else if (request.status == 204){
    //pass
}else if (request.status == "(pending)"){
    //pass
}
  return status
}

const updateAction = async (person) => {
  const request = axios.put(`http://localhost:3001/persons/${person.id}`, person)
  return await window.location.replace('http://localhost:5173/')
}

export default{
    getAll: getAll,
    createNew: createNew,
    removeAction: removeAction,
    updateAction: updateAction
}
