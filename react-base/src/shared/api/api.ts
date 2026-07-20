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

// Interceptador de response
api.interceptors.response.use(
    (response) => { 
        return response;
    }, 
    async (error) => { 
        const originalRequest = error.config;
        
        if (originalRequest.url === '/api/login/') { 
            return Promise.reject(error);
        }
        // Se for erro 401 e NÃO for uma tentativa de refresh
        if (error.response?.status === 401 && !originalRequest._retry) { 
            originalRequest._retry = true;

            try { 
                const refreshToken = authService.getRefreshToken();

                if (!refreshToken) { 
                    authService.logout(); 
                    window.location.href = '/login';
                    return Promise.reject(error);
                }

                const response = await axios.post("http://127.0.0.1:8000/api/token/refresh/", { 
                    refresh: refreshToken
                });

                const newAccessToken = response.data.access; 
                authService.setTokens(newAccessToken, refreshToken); 
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

                // 🔹 Refaz a requisição original com o novo token
                return api(originalRequest);

            } catch (refreshError) { 
                // 🔹 Se falhou ao renovar, faz logout
                authService.logout(); 
                return Promise.reject(refreshError);
            }
        }

        // Se não for erro 401 ou já tentou renovar, só retorna o erro
        return Promise.reject(error);
    }
);