<template>
    <div class="mew-tip px-lg py-xs"><slot/></div>
</template>

<script>
    export default {
        name: "mew-tip",
        mounted(){
            document.body.appendChild(this.$el)
            if(this.maxWidth)
                this.$el.style.setProperty('--DIM-Width',this.maxWidth + 'px')

            this.target = document.getElementById(this.el)
            this.watch(this.target)
        },
        beforeDestroy(){
            this.release(this.target)
            document.body.removeChild(this.$el)
        },
        data(){
            return {
                target:null,
                timer:null,
                valid:false,
            }
        },
        computed:{
            // tip 的方向，如果没有指定方向，则默认向下
            direction(){
                return this.top ? 'top'
                    : this.right ? 'right'
                        : this.left ? 'left' : 'bottom'
            },
            offset(){
                const size = {
                    bottom:{
                        X: (this.target.offsetWidth - this.$el.offsetWidth) / 2 ,
                        Y: this.target.offsetHeight + 5
                    },
                    right:{
                        X: this.target.offsetWidth + 5,
                        Y: (this.target.offsetHeight - this.$el.offsetHeight) / 2
                    },
                    top:{
                        X: (this.target.offsetWidth - this.$el.offsetWidth) / 2 ,
                        Y: -(this.target.offsetHeight + 5)
                    },
                    left:{
                        X: -(this.$el.offsetWidth + 5),
                        Y: (this.target.offsetHeight - this.$el.offsetHeight) / 2
                    }

                }
                return size[this.direction]
            },
            nudgeX(){
                return this.offset.X
            },
            nudgeY(){
                return this.offset.Y
            },
            width(){

            }
        },
        props:{
            el:{
                type:String,
                default:'',
            },
            left:{
                type:Boolean,
                default: false
            },
            top:{
                type:Boolean,
                default: false
            },
            right:{
                type:Boolean,
                default: false
            },
            // 提示出现的延迟
            delay:{
                type:String,
                default:'1000'
            },
            // 提示框的最大宽度
            maxWidth:{
                type:String,
                default:''
            },
        },
        watch:{
            valid(val){
                if(val){
                    // 每次打开提示前，都检查目标元素是否更新，如果目标元素已更新，则使用新的目标元素
                    const el = document.getElementById(this.el)
                    if( el && el !== this.target ) this.target = el
                    // 因为目标元素可能已移动，所以每次打开前，都要重新获取目标元素位置

                    const rect = this.target.getBoundingClientRect()
                    this.$el.style.left = rect.left + this.nudgeX + 'px'
                    this.$el.style.top = rect.top + this.nudgeY + 'px'
                    this.$el.style.setProperty('--NUM-Opacity',1)
                }
                else
                    this.$el.style.setProperty('--NUM-Opacity',0)
            }
        },
        methods:{
            watch(target){
                if(target){
                    target.addEventListener('mouseenter',this.hover)
                    target.addEventListener('mouseleave',this.leave)
                }
            },
            release(target){
                target.removeEventListener('mouseenter',this.hover)
                target.removeEventListener('mouseleave',this.leave)
            },
            hover(){
                this.timer = setTimeout(()=>{
                    this.valid = true
                },this.delay)
            },
            leave(){
                clearTimeout(this.timer)
                this.timer = null
                this.valid = false
            }
        }
    }
</script>

<style scoped lang="scss">
    div.mew-tip{
        --NUM-Opacity:0;
        --DIM-Width:100%;
        max-width: var(--DIM-Width);
        color: #3d3d3d;
        font-family: "PingFang SC";
        font-size: 13px;
        letter-spacing: .5px;
        position: absolute;
        z-index: 900;
        border: .5px solid rgba(0,0,0,.32);
        background-color: #f5f9ff;
        border-radius: 2px;
        pointer-events: none;
        opacity: var(--NUM-Opacity);
    }
</style>