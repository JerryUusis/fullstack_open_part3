import axios from "axios";
const baseUrl = '/api/persons';

const getAll = () => {
    return axios.get(baseUrl)
}

const create = (newPersonObject) => {
    return axios.post(baseUrl, newPersonObject)
}

const remove = (personObject) => {
    return axios.delete(`${baseUrl}/${personObject.id}`)
}

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
}

export default { getAll, create, remove, update }