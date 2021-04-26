import axios from 'axios'
import store from '../store';
import { authConstants } from '../actions/constants';


const api = "http://localhost:3000/api"
const token = window.localStorage.getItem('token')

const axiosInstance = axios.create({
    baseURL: api,

});

axiosInstance.interceptors.request.use((req) => {
    const { auth } = store.getState();
    if(auth.token){
        req.headers.Authorization = `Bearer ${auth.token}`;
    }
    return req;
})

axiosInstance.interceptors.response.use((res) => {
    return res;
}, (error) => {
    console.log(error);
    const status = error.response ? error.response.status : 500;
    if(status && status === 500){
        localStorage.clear();
        // store.dispatch({ type: authConstants.LOGOUT_SUCCESS });
    }
    
    return Promise.resolve(error.response);
})

export default axiosInstance;