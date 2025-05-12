import Axios from "axios";

const axiosCustom = Axios.create({
    baseURL: import.meta.env.VITE_API_URI,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

axiosCustom.interceptors.request.use(async (config) => {
    const token = localStorage.getItem('token_access');
    if (token) {
        config.headers.Authorization = 'Bearer ' + token;
    }
    return config;
}, (error) => {
    console.error("Error in request interceptor", error);
    return Promise.reject(error);
}
);

export default axiosCustom;