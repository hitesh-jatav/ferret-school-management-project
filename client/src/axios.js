import axios, { Axios } from 'axios';
axios.defaults.baseURL = 'http://localhost:5000/api'


let obj = {
    token: window.localStorage.getItem('token'),
    id: window.localStorage.getItem('userId')
}

axios.defaults.headers.common = { 'Authorization': JSON.stringify(obj) }
export default axios;