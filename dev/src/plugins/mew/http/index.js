import http from './interceptors'

http.login = function(queryModel,headers){
    return this({
        url: '/sys/login',
        method: 'post',
        data: queryModel,
        // 该头会覆盖其他同名头
        headers:headers
    })
}

http.get = function(url,params){
    // axios 默认就是 get 方法
    // 后端通过 request.query 拿到参数
    return this(url,{ params })
}

export default {
    install: function (Vue) {
        Vue.prototype.$http = http
    }
}