import message from './message'

export default {
    install:function(Vue){
        
        window.addEventListener('load',()=>{
            // 创建挂载元素
            let msg
            msg = document.createElement('div')
            msg.setAttribute('id','mew-message')
            document.body.appendChild(msg)
            // 用 message 组件替换(渲染)挂载元素
            msg = new Vue({ render: h => h(message) }).$mount('#mew-message')
            // 储存 message 组件，然后就可以在 Vue.prototype.$message 中通过 this.$mew_msg 获取 message 组件了
            Vue.prototype.$mew_msg = msg.$children[0]
        })
       
        Vue.prototype.$message = function(opt){
            this.$mew_msg.init()
            if(typeof opt === 'string')
                this.$mew_msg.innerHTML = opt
            else{
                this.$mew_msg.innerHTML = opt.innerHTML
                if(opt.cd || parseInt(opt.cd) === 0)
                    this.$mew_msg.cd = opt.cd
                if(opt.color)
                    this.$mew_msg.color = opt.color
                // 图标设置
                if(opt.icon){
                    for(let key in opt.icon)
                        this.$mew_msg.icon[key] = opt.icon[key]
                    this.$mew_msg.icon.valid = true
                }
                // 关闭按钮
                if(opt.closeBtn){
                    for(let key in opt.closeBtn)
                        this.$mew_msg.closeBtn[key] = opt.closeBtn[key]
                    this.$mew_msg.closeBtn.valid = true
                }
            }
            
            if(this.$mew_msg.valid) this.$mew_msg.valid = false
            this.$mew_msg.$nextTick(()=>{
                this.$mew_msg.valid = true
            })
        }
       
    }
}