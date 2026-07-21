export const authService = { 
    setTokens: (access: string, refresh: string) => {
        localStorage.setItem("access_token", access);
        localStorage.setItem("refresh_token", refresh);
    }, 
    getAccessToken: () => {
        return localStorage.getItem("access_token");
    }, 

    getRefreshToken: () => { 
        return localStorage.getItem("refresh_token");
    }, 

    logout: () => { 
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
    }



}