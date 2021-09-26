import axios from "axios";
// const axios = require("axios");
const personUrl = "http://localhost:3002/api/phonebook";
let token = null;
const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};
const getPersons = () => {
  return axios.get(personUrl);
};
const create = async (newContact) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(personUrl, newContact, config);
  return response.data;
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
  setToken: setToken,
};
