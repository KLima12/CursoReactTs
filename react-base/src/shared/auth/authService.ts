export const authService = { 
    setTokens: (access: string, refresh: string) => {
        localStorage.setItem("access_token", access);
        console.log("Access setado: ", access); 
        localStorage.setItem("refresh_token", refresh);
        console.log("Refresh setado: ", refresh);
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