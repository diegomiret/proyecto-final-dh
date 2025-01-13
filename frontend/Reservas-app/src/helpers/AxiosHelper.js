import axios from 'axios'

export const AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL_API || "http://localhost:8080",
    headers: {
        Accept: "application/json"
    },
    timeout: 40000,
});
