<template>
    <transition name="vertiacleSlideIn">
        <div class="mew-modal" ref="modal" v-if="value">
            <div class="closeBox" @click="close">
                <ico large>ui-close</ico>
            </div>
            <header>
                <slot name="header"></slot>
            </header>
            <main class="scrollBox classicScrollbar" ref="scrollBox">
                <div class="contentWrapper" :class="{ headerShadow: headerShadow,scrollbar:scrollbar}">
                    <slot>
                        modal default slot
                    </slot>
                </div>
            </main>
            <footer>

            </footer>
        </div>
    </transition>
</template>
<script>
    export default {
        name: "modal",
        data(){
            return {
                headerShadow:false,
                scrollbar:false,
                timer:null
            }
        },
        props:{
            localized:{
                type:Boolean,
                default:true
            },
            value:{
                type:Boolean,
                default:true
            }
        },
        model:{
            prop: 'value',
            event:'close'
        },
        methods:{
            close(){
                setTimeout(()=>{
                    this.$emit('close')
                },200)
            },
        },
        updated(){
            if(this.$refs.scrollBox){
                this.$refs.scrollBox.addEventListener('scroll',()=>{
                    this.headerShadow = this.$refs.scrollBox.scrollTop > 10
                },true)

                this.scrollbar = this.$refs.scrollBox.scrollHeight > this.$refs.scrollBox.clientHeight
            }

        },
        mounted() {
            if(this.$refs.scrollBox){
                this.$refs.scrollBox.addEventListener('scroll',()=>{
                    this.headerShadow = this.$refs.scrollBox.scrollTop > 10
                },true)

            }

            if(this.localized){
                // console.log(this.$refs.modal.parentNode.style.position)
                // if(this.$refs.modal.parentNode.style.position !== 'absolute')
                //     this.$refs.modal.parentNode.style.position = 'relative'
            }
        }

    }
</script>

<style scoped lang="scss">
@import "modal.scss";
</style>