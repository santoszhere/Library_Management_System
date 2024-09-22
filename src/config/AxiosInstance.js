import axios from "axios";
const AxiosInstance = axios.create({
    // baseURL: import.meta.env.VITE_BASE_URL,
    baseURL: "http://localhost:5000/api/v1",
    // "https://library-management-system-backend-myhn.onrender.com/api/v1/",
    withCredentials: true,
});
export default AxiosInstance;