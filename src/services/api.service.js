import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api.supermetrics.com'
})

export default api;