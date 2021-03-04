import Vue from 'vue'
import App from './App.vue'

import router from './router'
import store from './store'

// 引入全局样式
import "./style/main.scss"

// mew 插件
import './plugins/mew'

let _ = require('lodash')

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
