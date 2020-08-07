import axios from 'axios'

export const httpClient = axios.create({
    baseURL: 'http://localhost:8080/'
});

httpClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("USER_TOKEN");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default class ApiService {

    constructor(apiurl) {
        this.apiurl = apiurl;
    }

    get(url = '') {
        return httpClient.get(`${this.apiurl}/${url}`);
    }

    post(data, url = '') {
        return httpClient.post(`${this.apiurl}${url}`, data);
    }

    delete(url) {
        return httpClient.delete(`${this.apiurl}/${url}`);
    }

}
