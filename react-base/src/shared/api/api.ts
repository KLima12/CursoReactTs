import axios from "axios";
import { authService } from "../auth/authService";


export const api = axios.create({ 
    baseURL: "http://127.0.0.1:8000",
})

// Aqui serve para que toda vez que eu fizer talvez um api.get("alguma-coisa/") vire automaticamente um bearer Seu token
api.interceptors.request.use((config) => { 
    const token = authService.getAccessToken();
    if (token) { 
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config
});