import axios from 'axios'

export const AxiosInstance = axios.create({
    baseURL: "http://localhost:8080",
    headers: {
        Accept: "application/json",
    },
    timeout: 40000,
})