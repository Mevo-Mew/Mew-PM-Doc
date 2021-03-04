<template>
    <!--pattern 是按钮风格，legendary bump outlined flat text-->
    <!--size 是按钮大小，xs sm lg xl md-->
    <!--theme 是主题 light dark-->
    <!--theme 是形状等样式细节 包括 compact rounded block 等-->
    <div class="mew-btn" :class="[ type, size, theme, shape, state ]"
         ref="mewBtn" :style="style"
         @mousedown="mousedown" @mouseup="mouseup" @click="click"
         @mouseenter="mouseenter" @mouseover="mouseover" @mouseleave="mouseleave"
    >
        <div class="plate">
            <div class="mask flex justify-center align-center" ref="mask" :ripple="ripply">
                <div class="rotateBox" v-if="loading">
                    <svg viewBox="25 25 50 50"><circle cx="50" cy="50" r=".9em" fill="none"></circle></svg>
                </div>
                <div class="ellipsis" v-if="pending">
                    <i/><i/><i/><i/>
                </div>
                <slot>
                    MEW
                </slot>
            </div>
        </div>
    </div>
</template>

<script>
    import shape from "./mixins/shape"
    import type from "./mixins/type"
    import size from "./mixins/size"

    export default {
        name: "mew-btn",
        mixins:[ type, size, shape ],
        props:{
            color:{
                type:String,
                default: ""
            },
            invalid:{
                type:Boolean,
                default: false
            },
            pending:{
                type:Boolean,
                default: false
            },
            loading:{
                type:Boolean,
                default: false
            }
        },
        computed:{
            theme(){
                this.$nextTick(()=>{
                    // 处理按钮颜色
                    if(this.color){
                        let color = this.$color(this.color)
                        switch(this.type){
                            case 'legendary':
                                this.$refs.mewBtn.style.setProperty('--CLR-Background',color)
                                break
                            case 'bump':
                                this.$refs.mewBtn.style.setProperty('--CLR-Background',color)
                                this.$refs.mewBtn.style.setProperty('--CLR-Outline',color.lighten(5))
                                this.$refs.mewBtn.style.setProperty('--CLR-Gap',color.darken(35))
                                break
                            case 'outlined':
                                this.$refs.mewBtn.style.setProperty('--CLR-Text',color)
                                this.$refs.mewBtn.style.setProperty('--CLR-Border',color.lighten(10))
                                this.$refs.mewBtn.style.setProperty('--CLR-Spread',color.darken(10))
                                this.$refs.mewBtn.style.setProperty('--CLR-Ripple',color.setAlpha(.1))
                                this.$refs.mewBtn.style.setProperty('--CLR-Hover',color)
                                break
                            case 'flat':
                                this.$refs.mewBtn.style.setProperty('--CLR-Btn',color.darken(2))
                                this.$refs.mewBtn.style.setProperty('--CLR-Active',color.darken(6))
                                this.$refs.mewBtn.style.setProperty('--CLR-Spread',color.setAlpha(.8))
                                break
                            case 'text':
                                this.$refs.mewBtn.style.setProperty('--CLR-Text',color.darken(2))
                                this.$refs.mewBtn.style.setProperty('--CLR-Background',color.setAlpha(.08))
                                this.$refs.mewBtn.style.setProperty('--CLR-Ripple',color)
                                break
                        }
                    }

                })
                return this.$color(this.color ? this.color : 'white').darken(10).isLight() ? 'light' : 'dark'
            },
            style(){
                let style = ''
                style += 'width:' + this.width + ';height:' + this.height
                return style
            },
            // 按钮的状态 pending loading invalid valid
            state(){
               this.$nextTick(()=>{
                   let color = this.theme === 'light' ? 'rgba(0,0,0,.7)' : 'rgba(250,250,250,.8)'
                   this.$refs.mewBtn.style.setProperty('--CLR-State',color)
               })
                return this.pending ? 'pending' :
                       this.loading ? 'loading' :
                       this.invalid ? 'invalid' : 'valid'
            }
        },
        methods:{
            click(){
                if(this.state === 'valid') this.$emit('click')
            },
            mousedown(){
                if(this.state === 'valid') this.$emit('mousedown')
            },
            mouseenter(){
                if(this.state === 'valid') this.$emit('mouseenter')
            },
            mouseover(){
                if(this.state === 'valid') this.$emit('mouseover')
            },
            mouseleave(){
                if(this.state === 'valid') this.$emit('mouseleave')
            }
        }

    }
</script>

<style scoped lang="scss">
@import "btn.scss";
</style>