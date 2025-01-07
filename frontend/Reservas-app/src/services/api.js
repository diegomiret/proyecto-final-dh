import axios from "axios";

export default class Api {
    constructor() {
        this.client = null;
        this.api_url = import.meta.env.VITE_BACKEND_URL_API || "http://localhost:8080";
    }
    init = () => {
        const headers = {
            Accept: "application/json",
        };
        this.client = axios.create({baseURL:this.api_url,timeout:40000,headers:headers});

        return this.client;
    };

    getProductosAleatorios = () => {
        return this.init().get("/productos/aleatorios").then(r => r.data);
    }
    

    getCategorias = () => {
        return this.init().get("/categorias").then(r => r.data);
    }
}
