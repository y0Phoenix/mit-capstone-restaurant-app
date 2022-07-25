import axios from "axios";

const setAuthToken = (token: string | null) => {
    if (token) {
        localStorage.setItem('token', token);
        return axios.defaults.headers.common['x-auth-token'] = token;
    }
    delete axios.defaults.headers.common['x-auth-token'];
}

export default setAuthToken;