<template>
    <div class="mew-divider" :class="{vertical:vertical}"/>
</template>

<script>
    export default {
        name: "mew-divider",
        props:{
            vertical:{
                type:Boolean,
                default:false
            },
            horizontal:{
                type:Boolean,
                default:true
            },
            color:{
                type:String,
                default:''
            }
        },
        mounted(){
            if(this.color){
                this.$el.style.setProperty('--CLR-Default',this.color)
            }
        }
    }
</script>
<style scoped lang="scss">
    div.mew-divider{
        --CLR-Default:rgba(0,0,0,.4);
        background-color: var(--CLR-Default);
        height:1px;
        &.vertical{
            display:inline-block;
            height:100%;width:1px;
        }
    }
</style>
