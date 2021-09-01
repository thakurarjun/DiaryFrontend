
const axios = require("axios");
const personUrl = "https://phonebook-deploy.herokuapp.com/api/phonebook";
const getPersons = () => {
  return axios.get(personUrl) 
 };
const create = (newContact) => {
   return axios.post(personUrl, newContact);
  
};
const deletePersons = (id) => {
  return axios.delete(`${personUrl}/${id}`);
};
const updatePersons = (id, newPerson) => {
  return axios.put(`${personUrl}/${id}`, newPerson);
};
export default {
  getPersons: getPersons,
  create: create,
  deletePersons: deletePersons,
  updatePersons: updatePersons,
};
