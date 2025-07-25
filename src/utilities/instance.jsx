import axios from "axios";
const instance = axios.create({
    baseURL: "http://localhost:4040",
    timeout: 17000,
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        "Access-Control-Allow-Headers": "Content-type, X-Auth-Token, Origin, Authorization"
    }
})
export default instance;