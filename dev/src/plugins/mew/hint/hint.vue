<template>
    <div id="mew-hint" ref="hint" class="flex column align-center">
        <transition name="mew-hint">
            <div v-if="valid" class="snackbar" :class="[ theme, fading ]"
                 @mouseenter="holdOn" @mouseleave="release"
                 v-html="innerHTML"
            />
        </transition>
    </div>
</template>

<script>
    export default {
        name: "mew-hint",
        data(){
            return {
                innerHTML:'',
                color:'#59ab00',
                left:0,
                top:0,
                cd:6,

                countdown:0,
                timeout:null,
                fading:'',
                valid:false,
                timer:null,
                hold:false,
            }
        },
        computed:{
            theme(){
                this.$nextTick(()=>{
                    this.$refs.hint.style.setProperty('--CLR-Background',this.color)
                    this.$refs.hint.style.setProperty('--DIM-Left',(80 + this.left) + 'px')
                    this.$refs.hint.style.setProperty('--DIM-Top',(36 + this.top) + 'px')
                })
                return this.$color(this.color).darken(10).isLight() ? 'light' : 'dark'
            }
        },
        watch:{
            valid(val){
                if(val){
                    this.countdown = parseInt(this.cd)
                    if( this.countdown > 0 ){
                        this.timer = setInterval(()=>{
                            if(!this.hold){
                                this.countdown --
                                if(this.countdown === 0){
                                    this.fading = 'fading'
                                }
                            }
                        },1000)
                    }
                }
                else
                    this.dismiss()
            },
            fading(val){
                if(val){
                    this.timeout = setTimeout(()=>{
                        this.dismiss()
                    },3000)
                }
                else{
                    if(this.timeout){
                        clearTimeout(this.timeout)
                        this.timeout = null
                    }

                }
            }
        },
        methods:{
            init(){
                this.innerHTML = ''
                this.color = '#59ab00'
                this.left = 0
                this.top = 0
                this.cd = 10
            },
            holdOn(){//鼠标移入时，停止倒计时和淡出等效果
                this.hold = true
                if(this.countdown < this.cd - 2)
                    this.countdown += 2
                this.fading = ''
            },
            release(){
                this.hold = false
            },
            dismiss(){
                this.valid = false

                clearInterval(this.timer)
                this.timer = null

                clearTimeout(this.timeout)
                this.timeout = null

                this.fading = ''
            }
        }
    }
</script>

<style scoped lang="scss">
    // 内容区切换时动画
    .mew-hint-enter-active{
        transition: all .1s;
    }
    .mew-hint-enter {
        opacity: 0;
        /*transform: scale(0);*/
    }

    div#mew-hint{
        position: absolute;top:0;z-index: 1001;
        width: 100vw;height: 100vh;
        pointer-events: none;
        --CLR-Background:#4e545b;
        --CLR-Font:white;
        --DIM-Left:80px;
        --DIM-Top:36px;
        div.snackbar{
            position: relative;
            background-color: var(--CLR-Background);
            pointer-events: auto;
            border-radius: 2px;
            height: 24px;line-height: 24px;
            font-size: 13px;
            letter-spacing: 1px;padding: 0 20px;
            transform: translateX(var(--DIM-Left)) translateY(var(--DIM-Top));
            &.light{
                color:black;text-shadow: 0 0 2px rgba(255,255,255,.3)
            }
            &.dark{
                color:white;text-shadow: 0 0 2px rgba(0,0,0,.1)
            }
            &.fading{
                transition: opacity 3s linear;
                opacity: 0;
            }
        }

    }

</style>