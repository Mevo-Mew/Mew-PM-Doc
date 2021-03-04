import http from './headers'
import store from '@/store'
// 请求拦截
http.interceptors.request.use(function (config) {
        // 在发送请求之前的统一处理
        // console.log(config)
        // if (localStorage.token) {
        //     config.headers['token'] = localStorage.token
        //     // config.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
        //     // store.dispatch('logined', localStorage.token)
        // }
        // else{
        //     // 跳转到登录页
        //     config.headers['token'] = store.user.token
        // }
    // if(store.state.user.token){
    //     config.headers['token'] = store.state.user.token
    // }
        return config
    },
    function (err) {
        // 对请求错误的统一处理
        // console.log('----  api/interceptors  ----')
        // console.log(err)
        // return Promise.reject(err)
    })


// 响应拦截
http.interceptors.response.use(function (response) {
        // 对响应数据的统一处理
        // 判断一下响应中是否有 token，如果有就直接使用此 token 替换掉本地的 token。你可以根据你的业务需求自己编写更新 token 的逻辑
        // const token = response.headers.token;
        // if (token)
        //     http.defaults.headers.common['token'] = token;
        

    
        return {
            code:response.status,
            message:response.statusText,
            data:response.data
        }
    },
    
    function (err) {
        // 对响应错误的统一处理
        // if(error.message.includes('timeout'))
        
        return Promise.reject(err)
    })

export default http