import router  from './router'

import progress from '../plugins/mew/progressbar'
import '../plugins/mew/progressbar/progressbar.css'

// 路由守卫
router.beforeEach((to, from, next) => {
    // next 必须执行，否则 Vue 就会在这里终止
    progress.start()
    next()
})
router.afterEach((to, from) => {
    progress.done()
})

export default router