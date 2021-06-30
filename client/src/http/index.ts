import axios from 'axios'

export const API_URL = 'http://localhost:8000/api'

const $api = axios.create({
    withCredentials: true, // куки к каждому запросу
    baseURL: API_URL
})

// на каждый запрос цепляем токен в поле Authorization
$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config
})



