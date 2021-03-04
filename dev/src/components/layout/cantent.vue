<template>
    <div id="cantent">
        <h2 class="doc-title">{{ $route.name }}</h2>
        <transition name="view">
            <router-view />
        </transition>
    </div>
</template>

<script>
    export default {
        name: "cantent"
    }
</script>

<style scoped lang="scss">
    #cantent{
        h2.doc-title{
            color: rgba(0,0,0,.6);
        }
        font-family: 微软雅黑;
        width: calc(var(--wrapperWidth) - var(--sidebarWidth));
        height: calc(100% - var(--headbarHeight) - var(--cantentGap));
        position: absolute;z-index: 3;
        top:var(--headbarHeight);
        left:calc((100% - var(--wrapperWidth))/2 + var(--sidebarWidth));
        margin-top: var(--cantentGap);
        box-sizing: border-box;
        padding: 0 20px;
        overflow-y: scroll;
        overflow-x: visible;
        border-left:1px solid rgba(0,0,0,.05);
        scrollbar-color: transparent transparent;
        scrollbar-track-color: transparent;
        -ms-scrollbar-track-color: transparent;
    }
    /*滚动条-BEGIN*/
    ::-webkit-scrollbar {
        width: 6px;  /*滚动条宽度*/
    }
    ::-webkit-scrollbar-thumb {
        border-top: 2px solid #F5F5F5;
        border-bottom: 2px solid #F5F5F5;
        background-color: rgba(0,0,0,.06);
        &:hover{
            background-color: rgba(0,0,0,.15);
        }
        &:active{
            background-color: rgba(0,0,0,.4);
        }
    }
    /*滚动条-END*/

</style>