import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

export const api = axios.create({
    baseURL,
    headers: { 'Content-Type': 'application/json' },
    timeout: 15000,
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (!error.response) {
            return Promise.reject({
                success: false,
                error: { code: 'NETWORK_ERROR', message: 'Unable to connect to server' },
            });
        }
        const { status, data } = error.response;
        return Promise.reject({
            success: false,
            error: {
                code: data?.error?.code || `HTTP_${status}`,
                message: data?.error?.message || 'Request failed',
                details: data?.error?.details,
                status,
            },
        });
    }
);


