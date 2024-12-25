import axios from "axios";

const Api= axios.create({
    baseURL: 'http://localhost:5000',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    }
})

const config2 = {
    headers: {
        'authorization': `Bearer ' ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
    }
}

const config = {
    headers: {
        'authorization': `Bearer ' ${localStorage.getItem('token')}`,
    }
}

// Register Api
export const registerUserApi = (data) => {
    return Api.post('api/user/create', data);
}

export default Api;