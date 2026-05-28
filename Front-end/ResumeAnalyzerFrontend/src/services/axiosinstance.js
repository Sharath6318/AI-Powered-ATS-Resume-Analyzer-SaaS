import axios from "axios";

const BASE_URL = 'http://127.0.0.1:8000'

const axiosInstance = axios.create({

    baseURL:BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    }

})

axiosInstance.interceptors.request.use((config) => {

    let token = localStorage.getItem('token')

    if (token){

        config.headers.Authorization = token

    }

    return config

} ,(error) => {

    return Promise.reject(error)
})


export default axiosInstance