// single 组件
import btn from './single/btn'
import ico from './single/ico'

import modal from './dialogue/modal'
import imager from './single/imager/index'
// set 集合组件
import pagination from './set/pagination'
import apiTable from './set/apiTable'
import cellset from './set/cellset'
import formset from './set/formset'

// 小工具组件
import divider from './utils/divider'
import tip from './utils/tip'

// dialogue
// form 组件
import picker from './form/picker'
import selector from './form/selector'

export default {
    install: function (Vue) {
        Vue.component('btn',btn)
        Vue.component('ico',ico)
        Vue.component('tip',tip)
        Vue.component('modal',modal)
        Vue.component('imager',imager)
        Vue.component('picker',picker)
        Vue.component('divider',divider)
        Vue.component('selector',selector)
        
        // set 集合组件
        Vue.component('cellset',cellset)
        Vue.component('formset',formset)
        Vue.component('apiTable',apiTable)
        Vue.component('pagination',pagination)
    }
}