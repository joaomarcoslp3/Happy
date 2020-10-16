import axios from 'axios';

const api = axios.create({
  baseURL: 'http://26.174.50.121:3333',
})

export default api;