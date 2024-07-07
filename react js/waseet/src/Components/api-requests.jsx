import axios from 'axios';

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/',
});

async function refreshToken() {
    try {
    const response = await axios.post(
        'http://127.0.0.1:8000/api/token/refresh/',
        { refresh: localStorage.getItem('refresh_token') }
    );

    if (response.data.accessToken) {
        localStorage.setItem('user_token', response.data.accessToken);
        return response.data.accessToken;
    } else {
        console.error('Refresh token failed:', response.data);
        // Handle case where refresh token response doesn't contain access token
        //window.location.href = '/login'; // Redirect to login on failure
    }
    } catch (error) {
        console.error('Refresh token request failed:', error);
      // Handle other errors during refresh token request (e.g., network errors)
      //window.location.href = '/login'; // Redirect to login on general error
    }
    return null
}

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('user_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
        },
        (error) => {
        return Promise.reject(error);
        }
    );
    
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response.status === 401) {
            const newToken = await refreshToken();
            if (newToken) {
              // Access token refreshed, retry the original request
            error.config.headers.Authorization = `Bearer ${newToken}`;
            return axios(error.config);
            } else {
              // Refresh failed, handle error (e.g., redirect to login)
            console.error('Refresh token failed');
            //window.location.href = '/login';
            }
        }
        return Promise.reject(error);
        }
    );

export default api;