import Vue from 'vue'

// 全局注册组件
import components from './components'
Vue.use(components)

// ripple 指令
// 波纹指令体积只 3kb，建议做成全局指令，比将该功能分散到各组件内更节省体积
import ripple from './directive/ripple'
Vue.use(ripple)

// this.$color
// 颜色功能来自 tinycolor2 ，相关接口 NPM 上查看
import color from './color'
Vue.use(color)

import message from './message'
Vue.use(message)

import hint from './hint'
Vue.use(hint)

import coder from './coder'
Vue.use(coder)

import http from './http'
Vue.use(http)


Vue.prototype.$globalClick = function (callback) { //页面全局点击
    document.body.addEventListener('click',callback)
}

import './style'