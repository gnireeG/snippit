import axios from 'axios'
import store from './store'
const http = axios.create()

http.interceptors.response.use(
    response => {
        return response
    },
    error => {
        const errorMessage = error.response?.data?.message || 'An error occurred';
        store.commit('addAlert', {type: 'error', message: errorMessage}); // Adjust the action name as per your store setup

        // Optionally, you can also return a rejected promise to continue the chain
        return Promise.reject(error);
    }
)

export default http