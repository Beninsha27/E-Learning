import axios from "axios";

const axiosMultipartInstance = axios.create({

  baseURL:  'http://localhost:4000/e-learning',

  headers: {
    "Content-Type": "multipart/form-data", 
  },
});

export default axiosMultipartInstance;