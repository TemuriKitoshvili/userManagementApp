import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://13.51.98.179:8888/',
});

export default instance;
