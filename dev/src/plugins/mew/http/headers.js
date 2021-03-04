import axios from 'axios'
import baseURL from './baseURL'
import store from '@/store'
// const baseURL_production  = ''
// const baseURL_development = 'http://localhost:8080'

// 请求头设置可分两处，一处在此直接设置，另一处在拦截器中设置
export default axios.create({
    baseURL,
    timeout: 6000,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
})