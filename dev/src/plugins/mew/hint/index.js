import hint from './hint'

export default {
    install:function(Vue){
        window.addEventListener('load',()=>{
            // 创建挂载元素
            let vm_hint
            vm_hint = document.createElement('div')
            vm_hint.setAttribute('id','mew-hint')
            document.body.appendChild(vm_hint)
            // 用 message 组件替换(渲染)挂载元素
            vm_hint = new Vue({ render: h => h(hint) }).$mount('#mew-hint')
            // 储存 message 组件，然后就可以在 Vue.prototype.$message 中通过 this.$mew_msg 获取 message 组件了
            Vue.prototype.$mew_hint = vm_hint.$children[0]
        })
        
        Vue.prototype.$hint= function(cfg){
            this.$mew_hint.init()
            if(typeof cfg === 'string')
                this.$mew_hint.innerHTML = cfg
            else{
                if(cfg.color) this.$mew_hint.color = cfg.color
                if(cfg.left) this.$mew_hint.left = cfg.left
                if(cfg.top) this.$mew_hint.top = cfg.top
                if(cfg.cd) this.$mew_hint.cd = cfg.cd
                this.$mew_hint.innerHTML = cfg.innerHTML
            }
            
            if(this.$mew_hint.valid) this.$mew_hint.valid = false
            this.$mew_hint.$nextTick(()=>{
                this.$mew_hint.valid = true
            })
        }
        
    }
}