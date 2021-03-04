export default {
    created(){
        document.addEventListener('keyup',this.keyup)
    },
    beforeDestroy(){
        document.removeEventListener('keyup',this.keyup)
    },
    methods:{
        keyup(event){
            let e = event || window.event
            //使用 ctrl alt 等组合键时会报错，但不影响功能
            try {
                this['hotkey_'+e.key](e)
            }
            catch (err) {
                // err 的内容为
                // TypeError: _this[("hotkey_" + e.key)] is not a function at HTMLDocument.eval (shortcuts.js?a5ae:8)
                // console.log(err)
            }
        },
        
    }
}