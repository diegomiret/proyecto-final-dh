import axios from 'axios'

export const AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL_API || "http://localhost:8080",
    headers: {
        Accept: "application/json"
    },
    timeout: 40000,
});


export const setAuthHeader = (token) => {
    if (token) {
      AxiosInstance.defaults.headers['Authorization'] = `Bearer ${token}`;
    } else {
      delete AxiosInstance.defaults.headers['Authorization']; // Si no hay token, eliminar el header
    }
  };

  // Si necesitas quitar el header en algún momento
export const clearAuthHeader = () => {
    delete AxiosInstance.defaults.headers['Authorization'];
  };
  