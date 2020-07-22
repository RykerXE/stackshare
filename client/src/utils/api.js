import axios from "axios";

const api = axios.create({
    baseURL: `http://localhost:9000/api`,
    timeout: 1000 * 60 * 3, //in ms
    headers: {
        "Content-Type": "application/json",
    }
});
api.defaults.headers.common['token'] = localStorage.getItem("token");

export default api;