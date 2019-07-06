import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://35.224.144.107/'
});

export default instance;