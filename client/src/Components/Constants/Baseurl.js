import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:4000/e-learning',

    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosInstance
