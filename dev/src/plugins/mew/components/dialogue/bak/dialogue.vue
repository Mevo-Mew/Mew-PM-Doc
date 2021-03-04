<template>
    <div class="mew-Dialog" v-if="visible" >
         <div class="mask"/>

         <div class="card" :class="{modal:modal}" v-draggable="drag">
             <header>
                 <div class="moveBar" draggable="false" v-if="modal" @mouseenter="drag=true" @mouseout="drag=false">
                     <ico x-large >mover</ico>
                 </div>
                 <slot name="header">
                     <div class="defaultHeader" style="color:white;letter-spacing: 1px">
                         <h4>对话标题</h4>
                     </div>
                 </slot>
                 <!--关闭按钮-->
                 <div class="close" v-if="modal">
                     <ico x-large style="font-weight: bold">close</ico>
                 </div>
             </header>

             <main>
                 <slot/>
             </main>

         </div>
    </div>
</template>

<script>
    import draggable from '@directives/draggable'
    import { hotkeys_Dialog }  from "@/preferences/hotkeys"

    export default {
        name: "dialogue",
        directives: {
            draggable,
        },
        mixins:[ hotkeys_Dialog ],
        mounted(){
            document.addEventListener('scroll',this.aaa)
        },
        data(){
            return {
                visible:true,
                drag:false
            }
        },
        props:{
            modal:{
                type:Boolean,
                default:false
            }
        },
        methods:{
            fn_Enter(e){
                this.$emit('submit')
            },
            fn_Escape(){
                this.visible = false
                this.$emit('close')
            }
        },

    }
</script>

<style scoped lang="scss">
@import 'dialogue.scss';
</style>