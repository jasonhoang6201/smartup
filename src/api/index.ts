import axios, { AxiosRequestHeaders } from "axios";
import { deleteCookie } from "src/helpers/cookie";

const instance = axios.create();

class Api {
    defaults;
    interceptors;
    constructor() {
        this.defaults = instance.defaults;
        this.interceptors = instance.interceptors;
    }
    get(url: string, params: object, headers?: AxiosRequestHeaders) {
        return new Promise((resolve, reject) => {
            instance
                .get(url, { params, headers })
                .then((data: object) => resolve(data))
                .catch(reject);
        });
    }
    post(url: string, data: any, params: object, headers?: AxiosRequestHeaders) {
        return new Promise((resolve, reject) => {
            instance
                .post(url, data, { params, headers })
                .then((data: object) => resolve(data))
                .catch(reject);
        });
    }
    put(url: string, data: any, params: object, headers?: AxiosRequestHeaders) {
        return new Promise((resolve, reject) => {
            instance
                .put(url, data, { params, headers })
                .then((data: object) => resolve(data))
                .catch(reject);
        });
    }
    delete(url: string, params: object, headers?: AxiosRequestHeaders) {
        return new Promise((resolve, reject) => {
            instance
                .delete(url, { params, headers })
                .then((data: object) => resolve(data))
                .catch(reject);
        });
    }
    patch(url: string, data: any, params: object, headers?: AxiosRequestHeaders) {
        return new Promise((resolve, reject) => {
            instance
                .patch(url, data, { params, headers })
                .then((data: object) => resolve(data))
                .catch(reject);
        });
    }
}

const api = new Api();
api.defaults.baseURL = "htpp://localhost:3001/api"
api.interceptors.response.use(
    (response) => response.data,
    (error) => {
        if (error?.response?.status === 401) {
            localStorage.removeItem("token");
            deleteCookie("token");
        }
    }
);

export default api;
