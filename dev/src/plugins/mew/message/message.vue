<template>
    <div id="mew-message" ref="message" class="flex column align-center">
<!--        <audio ref="audio" src="./metalClick.ogg"/>-->
        <transition name="mew-message">
            <div class="snackbar" :class="[ theme, fading ]" v-if="valid" @mouseenter="holdOn" @mouseleave="release">
                <div class="icon" v-if="icon.valid">
                    <ico :size="icon.size" :color="icon.color" :style="icon.style">{{ icon.name }}</ico>
                </div>
                <div class="content" v-html="innerHTML"/>
                <btn sm compact v-if="closeBtn.valid" :color="closeBtn.color" :style="closeBtn.style"
                     :width="closeBtn.width" :height="closeBtn.height"
                     :bump="closeBtn.type === 'bump'"
                     :outlined="closeBtn.type === 'outlined'"
                     :flat="closeBtn.type === 'flat'"
                     :text="closeBtn.type === 'text'"
                     @click="dismiss"
                >{{ closeBtn.text }}</btn>
            </div>
        </transition>
    </div>
</template>

<script>
    export default {
        name: "mew-message",
        data(){
            return {
                icon:{},
                closeBtn:{},
                innerHTML:'',
                cd:5,
                color:'#4e545b',

                valid:false,
                countdown:0,
                hold:false,
                fading:'',
                timer:null,
                timeout:null
            }
        },
        computed:{
            theme(){
                this.$nextTick(()=>{
                    this.$refs.message.style.setProperty('--CLR-Background',this.color)
                    this.$refs.message.style.setProperty('--CLR-Border',this.$color(this.color).darken(5))
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
                this.icon = {
                    valid:false,
                    name:'view-ticket',
                    size:'28',
                    color:'#ffd06b',
                    style:'text-shadow: 0 0 2px rgba(255,0,0,.4),0 0 4px rgba(0,0,0,.5);'
                }
                this.closeBtn = {
                    valid:false,
                    type:'text',
                    text:'CLOSE',
                    width:'56px',
                    height:'',
                    color:'#ff0cb6',
                    style:''
                }
                this.innerHTML = ''
                this.cd = 5
                this.color = '#4e545b'
            },
            holdOn(){//鼠标移入时，停止倒计时和淡出等效果
                this.hold = true
                this.countdown = 2
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
        },
        mounted(){

        }
    }
</script>

<style scoped lang="scss">
    // 内容区切换时动画
    .mew-message-enter-active{
        transition: all .2s;
    }
    .mew-message-enter {
        opacity: 0;
        /*transform: scale(0);*/
        filter: blur(50px);

    }

    div#mew-message{
        position: absolute;top:0;z-index: 1000;
        width: 100vw;height: 100vh;
        pointer-events: none;
        padding-top: 6vh;
        --CLR-Background:#4e545b;
        --CLR-Font:white;
        --CLR-Border:black;
        --CLR-Shadow:rgba(0,0,0,.3);
        div.snackbar{
            background-color: var(--CLR-Background);
            pointer-events: auto;
            border-radius: 3px;
            font-size: 20px;
            /*border: 1px solid var(--CLR-Border);*/
            box-shadow:0 0 0 1px var(--CLR-Border), 0 1px 4px var(--CLR-Shadow);
            padding:15px 13px 15px 26px;
            position: relative;
            display: flex;
            /*animation: shake .1s;*/
            /*@keyframes shake{*/
            /*    0%{}*/
            /*}*/
            &.light{
                color:black;text-shadow: 0 0 2px rgba(255,255,255,.5)
            }
            &.dark{
                color:white;text-shadow: 0 0 2px rgba(0,0,0,.6)
            }
            &.fading{
                transition: opacity 3s linear;
                opacity: 0;
            }
            div.icon{
                display: inline-block;
                padding-top: 5px;
                margin-right: 10px;
                margin-left: -8px;
            }
            div.content{
                display: inline-block;
                /*background-color: #00a1ff;*/
                word-break: break-all;
                text-align: justify;
                letter-spacing: .5px;
                font-size: 16px;
                margin: 0 20px 0 0;
                min-height: 28px;line-height: 25px;
                max-width: 350px;
            }
            div.mew-btn{
            }
        }

    }

</style>