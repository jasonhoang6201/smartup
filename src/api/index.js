import axios from "axios";
import { deleteCookie } from "src/helpers/cookie";

const instance = axios.create();

class Api {
    defaults;
    interceptors;
    constructor() {
        this.defaults = instance.defaults;
        this.interceptors = instance.interceptors;
    }
    get(url, params, headers) {
        return new Promise((resolve, reject) => {
            instance
                .get(url, { params, headers })
                .then((data) => resolve(data))
                .catch(reject);
        });
    }
    post(url, data, params, headers) {
        return new Promise((resolve, reject) => {
            instance
                .post(url, data, { params, headers })
                .then((data) => resolve(data))
                .catch(reject);
        });
    }
    put(url, data, params, headers) {
        return new Promise((resolve, reject) => {
            instance
                .put(url, data, { params, headers })
                .then((data) => resolve(data))
                .catch(reject);
        });
    }
    delete(url, params, headers) {
        return new Promise((resolve, reject) => {
            instance
                .delete(url, { params, headers })
                .then((data) => resolve(data))
                .catch(reject);
        });
    }
    patch(url, data, params, headers) {
        return new Promise((resolve, reject) => {
            instance
                .patch(url, data, { params, headers })
                .then((data) => resolve(data))
                .catch(reject);
        });
    }
}

const api = new Api();
api.defaults.baseURL = "htpp://test"
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
