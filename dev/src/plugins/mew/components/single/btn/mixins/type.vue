<script>
    // 当前 mixin 控制按钮风格 flat outlined text bump
    export default {
        data(){
            return {
                anime:''
            }
        },
        props:{
            // 扁平按钮
            flat:{
                type:Boolean,
                default:false
            },
            // 线框按钮
            outlined:{
                type:Boolean,
                default:false
            },
            // 纯文本按钮
            text:{
                type:Boolean,
                default:false
            },
            // 凹凸按钮
            bump:{
                type:Boolean,
                default:false
            },
            // 默认按钮(经典)
            legendary:{
                type:Boolean,
                default:true
            }
        },
        computed:{
            type(){
                return this.design + this.anime
            },
            // 按钮的设计风格
            design(){
                const props = {
                    flat:this.flat,
                    outlined:this.outlined,
                    text:this.text,
                    bump:this.bump,
                    legendary:this.legendary
                }
                for(let design in props)
                    if(props[design])
                        return design
            },
            // 边框、文本 按钮开启波纹动效
            ripply(){
                return this.state === 'valid' && (this.outlined || this.text)
            },
            // 边框、扁平 按钮开启扩展动效
            spread(){
                return this.outlined || this.flat
            }
        },
        methods:{
            mouseup(){
                if(this.state === 'valid'){
                    this.$emit('mouseup')
                    // 给线框和扁平按钮添加波纹扩散动效
                    this.anime = ''
                    // 按钮组时，需要处理按钮 Z 轴权重
                    this.$refs.mewBtn.style.zIndex = '1'
                    setTimeout(()=>{
                        this.anime = this.spread ? ' spread' : ''
                        this.$emit('mouseup')
                    },100)
                    setTimeout(()=>{
                        this.$refs.mewBtn.style.zIndex = '0'
                    },600)
                }

            }
        }
    }
</script>