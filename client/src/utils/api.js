import axios from "axios";

const api = axios.create({
    baseURL: `http://ec2-13-233-36-233.ap-south-1.compute.amazonaws.com/api/api`,
    timeout: 1000 * 60 * 3, //in ms
    headers: {
        "Content-Type": "application/json",
    }
});
api.defaults.headers.common['token'] = localStorage.getItem("token");

export default api;